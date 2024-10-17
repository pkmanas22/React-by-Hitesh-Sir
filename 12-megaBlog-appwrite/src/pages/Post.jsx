import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import postService from '../appwrite/postService';
import { Container, Button } from '../components'
import fileService from '../appwrite/fileService';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser'

export default function Post() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            postService.getPost(slug).then((post) => {
                if (post) setPost(post)
                else navigate("/")
            })
        } else navigate("/")
    }, [navigate, slug])

    const userData = useSelector((state) => state.auth.status)

    const isAuthor = post && userData ? userData.$id === post.userId : false

    const deletePost = async () => {
        const status = await postService.deletePost(post.$id)
        if (status) {
            fileService.deleteFile(post.featuredImage)
            navigate("/")
        }
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={fileService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
