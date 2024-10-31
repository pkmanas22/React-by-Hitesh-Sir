import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import postService from '../appwrite/postService';
import { Container, PostCard, PostContainer } from '../components'

export default function MyPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        postService.getMyPosts(userData.$id).then((myPosts) => {
            if (myPosts) {
                setPosts(myPosts.documents)
                setLoading(false)
            }
        })
    }, [userData.$id])

    if (loading) {
        return <div className='w-full py-8'>
            <Container>
                <div className='flex flex-col gap-3 h-[60vh] flex-wrap justify-center items-center font-bold text-3xl'>
                    Loading...
                </div>
            </Container>
        </div>
    }

    if (posts.length == 0) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-col gap-3 h-[60vh] flex-wrap justify-center items-center font-bold text-3xl'>
                        Currently there is no post available
                        <div>
                            Try creating new one <a className='text-violet-600 border px-4 rounded bg-slate-200 hover:underline' href="/add-post">Click here</a>
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