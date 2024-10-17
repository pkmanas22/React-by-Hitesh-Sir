import { useEffect, useState } from 'react'
import postService from '../appwrite/postService';
import { Container, PostCard } from '../components'

export default function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postService.getAllPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

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
