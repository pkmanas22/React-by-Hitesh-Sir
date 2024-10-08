import React from 'react'

export default function Logo({
    className= ''
}) {
    return (
        <div onClick={() => {console.log("Logo clicked")}} className={`text-center text-3xl font-bold italic text-[#09350c] ${className}`}>
            Post Palette
        </div>
    )
}
