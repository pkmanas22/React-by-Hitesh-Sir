import React from 'react';
import { Link } from 'react-router-dom';
import fileService from '../../appwrite/fileService';

export default function PostCard({ $id, title="", featuredImage }) {
    let newTitle = title.substring(0,60)
    if(newTitle.length >= 60) {
        newTitle += "..."
    }
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4 hover:shadow-lg transition-shadow">
                <div className="w-full h-56 md:h-48 overflow-hidden flex justify-center items-center mb-4">
                    <img
                        src={fileService.getFilePreview(featuredImage)}
                        alt={title}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{newTitle}</h2>
            </div>
        </Link>
    );
}
