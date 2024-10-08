import React, { forwardRef, useId } from 'react'

const Input = forwardRef(function Input({
    label = '',
    type = 'text',
    className = '',
    placeHolder = '',
    ...props
}, ref) {
    const inputId = useId();

    return (
        <div>
            {label && <label className='inline-block mr-2' htmlFor={inputId}>
                {label}
            </label>}
            <input
                id={inputId}
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200  ${className}`}
                placeholder={placeHolder}
                ref={ref}
                {...props}
            />
        </div>
    )
}
)

export default Input