import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import fileService from '../../appwrite/fileService';
import postService from '../../appwrite/postService'
import { useCallback, useEffect } from 'react';
import { Input, Button, RTE, Select } from '../index'

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)

    const submitFn = async (data) => {
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
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d]+/g, "-")
        }
        return "";
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name == "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true
                })
            }
        });

        // for better memory management 
        return subscription.unsubscribe()
    }, [watch, setValue, slugTransform])

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label='Title: '
                    className='mb-4'
                    placeHolder='Title'
                    {...register("title", { required: true })}
                />
                <Input
                    label='Slug: '
                    className='mb-4'
                    placeHolder='Slug'
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true
                        })
                    }}
                />
                <RTE
                    label="Content: "
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label='Featured Image: '
                    className='mb-4'
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                    {...register("image", { required: !post })}
                />
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
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}
