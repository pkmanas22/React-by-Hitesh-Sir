import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import postService from '../appwrite/postService';
import { Container, PostCard, PostContainer } from '../components'

export default function MyPost() {
    const [posts, setPosts] = useState([]);

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        postService.getMyPosts(userData.$id).then((myPosts) => {
            if (myPosts) {
                setPosts(myPosts.documents)
            }
        })
    }, [userData.$id])

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