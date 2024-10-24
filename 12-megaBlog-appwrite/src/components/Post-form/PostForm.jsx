/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import fileService from '../../appwrite/fileService';
import postService from '../../appwrite/postService'
import { useCallback, useEffect, useState } from 'react';
import { Input, Button, RTE, Select } from '../index'
import conf from '../../conf/conf';
import { DevTool } from "@hookform/devtools";

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
    const [previewImage, setPreviewImage] = useState('')
    const [loadingSubmission, setLoadingSubmission] = useState(false)
    const [slugs, setSlugs] = useState([])

    const submitFn = async (data) => {
        console.log("submission clicked")
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
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = data?.image[0] ? await fileService.uploadFile(data?.image[0]) : null;

            if (file) {
                const dbPost = await postService.createPost({
                    ...data,
                    featuredImage: file.$id,
                    userId: userData.$id
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            } else {
                console.log("required")
            }
        }
        setLoadingSubmission(false)
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .toLowerCase()
                .replace(/[^a-zA-Z\d]+/g, "-")
        }
        return "";
    }, [])

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
                    console.log(`${currentSlug} is already taken`)
                    
                    setError('slug', {
                        type: 'manual',
                        message: `${currentSlug} is already taken`
                    })
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
        <form onSubmit={handleSubmit(submitFn)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label='Title: '
                    className='mb-4'
                    placeHolder='Title'
                    errorMsg={errors.title?.message}
                    {...register("title", { required: "Title required" })}
                />

                <Input
                    label='Slug: '
                    className='mb-4'
                    placeHolder='Slug'
                    errorMsg={errors.slug?.message}
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

                <Input
                    label="Wanna to change slug"
                    type="checkbox"
                    checked={slugEdit}
                    onChange={() => setSlugEdit(prev => !prev)}
                />


                {tinyMCEApiKey ? <RTE
                    apiKey={tinyMCEApiKey}
                    label="Content: "
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                /> : <div>Loading</div>}
                {errors.content?.message && <p className="text-red-600 my-1">{errors.content?.message}</p>}

            </div>
            <div className="w-1/3 px-2">
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
                        />
                    </div>
                )}
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={fileService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["Active", "Inactive",]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className={`w-full ${loadingSubmission && 'cursor-progress opacity-5'}`}
                    disabled={loadingSubmission}
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
            <DevTool control={control} /> {/* set up the dev tool */}
        </form>
    )
}
