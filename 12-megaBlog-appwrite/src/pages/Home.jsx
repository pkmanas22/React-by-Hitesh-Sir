import { useState, useEffect } from 'react'
import postService from '../appwrite/postService';
import { Button, Container, LandingPage, PostCard, PostContainer } from '../components'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Home() {
    const [posts, setPosts] = useState([]);

    const authStatus = useSelector((state) => state.auth.status);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        postService.getAllPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                setLoading(false)
            }
        })
    }, [])

    if (!authStatus) {
        return <LandingPage />
    }

    if (loading) {
        return <div className='w-full py-8'>
            <Container>
                <div className='flex flex-col gap-3 h-[60vh] flex-wrap justify-center items-center font-bold text-3xl'>
                    Loading...
                </div>
            </Container>
        </div>
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold">
                                Currently no active post available
                                <br />
                                <br />
                                To create a new post <Link to={'/add-post'} className='border m-2 px-1 hover:text-pink-700 transition'>Click here</Link>
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    <PostContainer posts={posts} />
                </div>
            </Container>
        </div>
    )
}
