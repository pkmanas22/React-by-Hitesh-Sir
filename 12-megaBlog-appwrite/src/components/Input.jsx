/* eslint-disable react/prop-types */
import React, { forwardRef, useId, useState } from 'react'

const Input = forwardRef(function Input({
    label = '',
    type = 'text',
    className = '',
    placeHolder = '',
    errorMsg,
    ...props
}, ref) {
    const inputId = useId();
    const [show, setShow] = useState(false)

    const togglePassword = () => {
        setShow((prev) => !prev)
    }

    errorMsg && console.log("Inside Input Component: " + errorMsg) // here it works perfectly

    const inputType = (type === "password") && show ? 'text' : type

    return (
        <div>
            {label && <label className='inline-block mr-2' htmlFor={inputId}>
                {label}
            </label>}
            <input
                id={inputId}
                type={inputType}
                className={`px-3 py-2 my-1 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200  ${className}`}
                placeholder={placeHolder}
                ref={ref}
                {...props}
            />

            {type === "password" ? <span onClick={togglePassword}>
                {show ? "hide" : "show"}
            </span> : null}

            {errorMsg && <p className="text-red-600 my-1">{errorMsg}</p>}
        </div>
    )
}
)

export default Input