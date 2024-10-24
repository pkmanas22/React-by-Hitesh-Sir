import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-2xl text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
                <Link to="/" className="text-lg font-semibold text-blue-600 hover:underline">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}
