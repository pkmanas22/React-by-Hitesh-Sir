/* eslint-disable react/prop-types */
import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-white/[0.2]",
    textColor = "text-black",
    className = "",
    ...props
}) {
    return (
        <button className={`px-4 py-2  backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)]  text-sm transition duration-200  ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}