import React from 'react'
import PostCard from '../my-UI/PostCard';

export default function PostContainer({ posts = [] }) {
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post.$id}>
                        <PostCard
                            $id={post.$id}
                            title={post.title}
                            featuredImage={post.featuredImage}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
