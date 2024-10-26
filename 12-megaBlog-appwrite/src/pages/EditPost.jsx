import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import postService from '../appwrite/postService';
import { Container, PostForm, PostNotFound } from '../components'

export default function EditPost() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (slug) {
            postService.getPost(slug)
                .then((post) => {
                    setLoading(false)
                    if (post.$id) {
                        setPost(post)
                    } else setPost(null)
                })
        } else {
            navigate("/")
        }
    }, [navigate, slug])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!post) {
        return (
            <PostNotFound slug={slug} />
        )
    }

    return (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    )
}
