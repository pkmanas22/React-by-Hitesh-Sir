import { useState, useEffect } from 'react'
import postService from '../appwrite/postService';
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postService.getAllPosts().then((posts) => {
            if (posts) {
                console.log(posts.documents)
                setPosts(posts.documents)
            }
        })
        console.log(posts)
    }, [])

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
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
