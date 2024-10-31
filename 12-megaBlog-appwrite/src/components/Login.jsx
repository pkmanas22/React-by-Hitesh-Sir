import React, { useState } from 'react'
import { Button, Input, Logo } from '.'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth';
import { login as storeLogin } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form'

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const loginFn = async (data) => {
        setError(null);
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(storeLogin(userData))
                navigate('/');
            }
        } catch (error) {
            // console.log("Login Component Error :: loginFn :: error ", error.message);
            setError('root.serverError', {
                message: error.message
            })
        }
    }

    // console.log(errors)

    return (
        <div className='flex items-center justify-center m-auto md:w-full'>
            <div className={`w-full max-w-lg bg-gray-100 rounded-xl border border-black/10 p-10`}>
                <div className="text-center space-y-2">
                    <h2 className="text-center text-2xl md:text-4xl font-bold leading-tight">Sign in to your account</h2>
                    <div className="text-lg font-semibold">
                        Don&apos;t have any account?&nbsp;
                        <span onClick={() => {
                            navigate("/signup")
                        }}
                            className="italic underline hover:text-blue-700 cursor-pointer mx-1 text-xl text-gray-700">
                            Signup
                        </span>
                    </div>
                </div>

                {errors.root && <p className="text-red-600 mt-8 text-center">{errors.root.serverError.message}</p>}

                <form onSubmit={handleSubmit(loginFn)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email"
                            placeholder="example@gmail.com"
                            type="text"
                            errorMsg={errors.email?.message}
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email must be a valid address"
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="password..."
                            errorMsg={errors.password?.message}
                            {...register("password", {
                                required: "Oops... ! Password is required",
                                maxLength: {
                                    value: 32,
                                    message: "Password cannot exceed 32 letters"
                                },
                                minLength: {
                                    value: 8,
                                    message: "Password should be at least 8 characters"
                                },
                                validate: {
                                    matchPattern: (value) => /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,32})/.test(value) || "Password must contain at least one lower case , one uppercase, one numeric and special character"
                                }
                            })}
                        />
                        <Button type='submit' className='w-full font-bold text-xl hover:bg-yellow-100 bg-green-200'>Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
