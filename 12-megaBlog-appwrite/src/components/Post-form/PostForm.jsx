/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import fileService from '../../appwrite/fileService';
import postService from '../../appwrite/postService'
import { useCallback, useEffect, useState } from 'react';
import { Input, Button, RTE, Select, Container } from '../index'
import conf from '../../conf/conf';
// import { DevTool } from "@hookform/devtools";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, setError, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "Inactive",
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)
    const [tinyMCEApiKey,] = useState(conf.tinyMCEApiKey || undefined)
    const [slugEdit, setSlugEdit] = useState(false)
    const [previewImage, setPreviewImage] = useState(post && fileService.getFilePreview(post?.featuredImage))
    const [loadingSubmission, setLoadingSubmission] = useState(false)
    const [slugs, setSlugs] = useState([])
    const [slugError, setSlugError] = useState(null);

    const submitFn = async (data) => {
        // console.log("submission clicked")

        if(slugError) return

        setLoadingSubmission(true)

        if (post) {
            const file = data?.image[0] ? await fileService.uploadFile(data?.image[0]) : null;

            if (file) {
                fileService.deleteFile(post.featuredImage)
            }

            const dbPost = await postService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            if (dbPost) {
                alert("Post updated successfully")
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = data?.image[0] ? await fileService.uploadFile(data?.image[0]) : null;

            if (file) {
                const res = await postService.createPost({
                    ...data,
                    featuredImage: file.$id,
                    userId: userData.$id
                })
                
                if (res.$id) {
                    alert("Post created successfully")
                    navigate(`/post/${res.$id}`)
                }

                if (res.status !== 200) {
                    const errMsg = res.errMsg;
                    // console.log(errMsg)
                    setError('root', {
                        message: errMsg,
                        type: 'manual'
                    })
                }
            } else {
                alert("file is required")
            }
        }
        setLoadingSubmission(false)
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            // Create slug by keeping only valid characters (letters, numbers, period, hyphen, underscore)
            let slug = value
                .toLowerCase()
                .replace(/[^a-zA-Z\d._-]+/g, "-") // Remove any invalid characters

            // Ensure the slug is no more than 36 characters
            slug = slug.substring(0, 36);

            // Ensure it doesn’t start with a period, hyphen, or underscore
            if (/^[._-]/.test(slug)) {
                slug = slug.replace(/^[._-]+/, "");
            }

            return slug;
        }
        return "";
    }, []);


    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true
                })
            }

            if (name === 'image') {
                const preview = URL.createObjectURL(value.image[0])
                setPreviewImage(preview)
            }

            if (name === 'slug') {
                const currentSlug = getValues('slug')
                const isExist = slugs.includes(currentSlug)

                if (isExist) {
                    // console.log(`${currentSlug} is already taken`)

                    setSlugError(`${currentSlug} is already taken`)
                } else {
                    setSlugError(null)
                }
            }
        });

        // for better memory management 
        return () => subscription.unsubscribe()
    }, [watch, setValue, slugTransform, slugs, setError, getValues, errors])

    useEffect(() => {
        postService.generateAllSlugs().then((data) => {
            setSlugs(data)
        })
    }, [])


    return (
        <>
            {errors.root?.message && <p className="text-red-600 font-bold text-center text-lg my-1">{errors.root?.message}</p>}
            <form onSubmit={handleSubmit(submitFn)} className="flex flex-wrap p-5">
                <div className="md:w-2/3 px-2 space-y-4">
                    <Container>
                        <Input
                            label='Title: '
                            className='mb-4'
                            placeHolder='Title'
                            errorMsg={errors.title?.message}
                            {...register("title", { required: "Title required" })}
                        />

                        <Input
                            label='Slug: '
                            className={`mb-4 ${!slugEdit && 'bg-slate-100'}`}
                            placeHolder='Slug'
                            errorMsg={errors.slug?.message || slugError}
                            disabled={!slugEdit}
                            {...register("slug", {
                                required: "Slug must be present",
                            })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), {
                                    shouldValidate: true
                                })
                            }}
                        />

                        <div className='my-2 flex items-center'>
                            <label className='mr-2 font-semibold text-' htmlFor='edit'>
                                Wanna to change slug
                            </label>
                            <input type="checkbox" id='edit' checked={slugEdit}
                                onChange={() => setSlugEdit(prev => !prev)} />
                        </div>
                    </Container>

                    <Container>
                        {errors.content?.message && <p className="text-red-600 my-1">{errors.content?.message}</p>}
                        {tinyMCEApiKey ? <RTE
                            apiKey={tinyMCEApiKey}
                            label="Content: "
                            name="content"
                            control={control}
                            defaultValue={getValues("content")}
                        /> : <div>Loading</div>}
                    </Container>

                </div>
                <div className="md:w-1/3 px-2 space-y-4">
                    <Container>
                        <Input
                            label='Featured Image: '
                            className='mb-4'
                            type="file"
                            errorMsg={errors.image?.message}
                            accept="image/png, image/jpeg, image/jpg, image/gif"
                            {...register("image", {
                                required: {
                                    value: !post,
                                    message: "Image is required"
                                }
                            })}
                        />
                        {previewImage && (
                            <div className="w-full mb-4">
                                <img
                                    src={previewImage}
                                    className="rounded-lg"
                                    alt='Featured Image'
                                />
                            </div>
                        )}
                    </Container>
                    <Container>
                        <Select
                            options={["Active", "Inactive",]}
                            label="Status"
                            className="mb-4"
                            {...register("status", { required: true })}
                        />
                        <Button
                            type="submit"
                            bgColor={post ? "bg-green-500" : undefined}
                            className={`w-full bg-green-100 hover:bg-lime-200 transition ${loadingSubmission && 'cursor-progress opacity-[0.7] text-black'}`}
                            disabled={loadingSubmission}
                        >
                            {post ? "Update" : "Submit"}
                        </Button>
                    </Container>
                </div>
                {/* <DevTool control={control} /> set up the dev tool */}
            </form>
        </>
    )
}
