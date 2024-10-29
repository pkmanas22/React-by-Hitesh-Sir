import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logo({
    className = '',
    clickable = false,
}) {
    const navigate = useNavigate()

    return (
        <div onClick={() => { clickable ? navigate("/") : null }} className={`text-center text-3xl font-bold italic text-[#09350c] ${className} `}>
            Post Palette
        </div>
    )
}
