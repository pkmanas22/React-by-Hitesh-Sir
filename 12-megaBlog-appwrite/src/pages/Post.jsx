import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import postService from '../appwrite/postService';
import { Container, Button, PostNotFound } from '../components'
import fileService from '../appwrite/fileService';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser'

export default function Post() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const [Loading, setLoading] = useState(true)

    useEffect(() => {
        if (slug) {
            console.log(slug)
            postService.getPost(slug)
                .then((post) => {
                    setLoading(false);
                    if (post.$id) setPost(post)
                    else setPost(null)
                })
        } else navigate("/")
    }, [navigate, slug])


    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = post && userData ? userData.$id === post?.userId : false

    const deletePost = async () => {
        const status = await postService.deletePost(post.$id)
        if (status) {
            fileService.deleteFile(post.featuredImage)
            navigate("/")
        }
    }

    if (Loading) {
        return <div>Loading...</div>
    }

    if (!post) {
        return (
            <PostNotFound slug={slug} />
        )
    }


    return (
        <div className="pt-16 px-3 bg-gray-100">
            <div className="flex flex-col justify-center relative border border-gray-300 rounded-xl p-8 bg-white shadow-md gap-5 px-[10vw]">
                <div className="lg:w-[65vw] mx-auto mb-6 text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-800">{post.title}</h1>
                </div>
                
                <div className='flex justify-center'>
                    <img
                        src={fileService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl max-h-96"
                    />
                </div>

                {isAuthor && (
                    <div className="absolute right-6 top-1 flex space-x-2">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
                <div className="browser-css text-gray-700 leading-relaxed px-5 md:px-10 lg:px-20 mt-5 overflow-x-auto">
                    {parse(post.content)}
                </div>
            </div>
        </div>
    );
}
