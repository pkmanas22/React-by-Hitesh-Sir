import React from 'react'
import Button from '../my-UI/Button';
import { Link } from 'react-router-dom';
import fileService from '../../appwrite/fileService';

export default function PostPageView({ post, isAuthor, onDelete }) {
    const { featuredImage, title, $id, content } = post;

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            {featuredImage && (
                <img
                    src={fileService.getFilePreview(featuredImage)}
                    alt={title}
                    className="w-full h-full max-h-96 object-fit"
                />
            )}
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
                <p className="text-gray-600 mb-6">{content}</p>

                {isAuthor && (
                    <div className="absolute right-6 top-6 flex space-x-2">
                        <Link to={`/edit-post/${$id}`}>
                            <Button>
                                Edit
                            </Button>
                        </Link>
                        <Button onClick={onDelete}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
