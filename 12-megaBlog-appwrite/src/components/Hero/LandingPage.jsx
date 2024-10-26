import React from 'react'
import { Button, Input } from '../index'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <section className="w-[full] py-28 lg:py-28 xl:py-36 shadow-md">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-6 text-center">
                    <div className="space-y-3">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                            Welcome to <span className='bg-black/10 text-pink-700 px-2'>Post Palette</span>
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-600 md:text-2xl">
                            Your platform for sharing ideas, stories, and knowledge. Join our community of writers and readers today.
                        </p>
                    </div>
                    <div className="space-x-4">
                        <Link to={'/signup'}>
                            <Button>Sign Up</Button></Link>
                        <Button textColor='text-white' bgColor='bg-black'>Learn More</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
