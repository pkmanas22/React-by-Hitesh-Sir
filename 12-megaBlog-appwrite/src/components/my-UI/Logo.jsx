import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logo({
    className = '',
    clickable = false,
}) {
    const navigate = useNavigate()

    return (
        <div onClick={() => { clickable ? navigate("/") : null }} className={`text-center text-3xl font-bold italic text-[#09350c] font-mono ${className} `}>
            Post Palette
        </div>
        // <div onClick={() => { clickable ? navigate("/") : null }} >
        //     <img src="./logo.png" alt="logo" className={`h-[40px] ${className}`} />
        // </div>
    )
}
