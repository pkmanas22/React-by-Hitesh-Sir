/* eslint-disable react/prop-types */
import React from 'react'

export default function PostNotFound({ slug = "" }) {
    return (
        <section className="w-[full] py-32 lg:py-16 shadow-md">
            <div className="container px-4 md:px-6 text-2xl font-semibold text-center flex flex-col justify-center items-center">
                <img className='md:w-3/6' src="/postNotFound.png" alt="" />
                <div>
                    There is no post available in the given slug:
                    <code className='ml-2 font-mono bg-slate-100 px-2'>
                        /{slug}
                    </code>
                </div>
            </div>
        </section>
    )
}
