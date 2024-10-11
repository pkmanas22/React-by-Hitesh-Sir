import React, { useState } from 'react'
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { login as storeLogin } from '../store/authSlice'
import { useNavigate, Link } from 'react-router-dom';
import { Input, Logo, Button } from './index'
import { useForm } from 'react-hook-form';

export default function Signup() {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm()

    async function signupFn({ data }) {
        setError("")
        try {
            const response = await authService.createUser(data);
            if (response) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(storeLogin(userData))
                navigate("/")
            }
        } catch (error) {
            console.log("Login Component Error :: loginFn :: error ", error);
            setError(error.message)
        }
    }
    
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signupFn)} >
                    <div className='space-y-5'>
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            type="text"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="example@gmail.com"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email must be a valid address"
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="password..."
                            {...register("password", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/.test(value) || "Password should be of minimum 8 characters and must contain at least one lower case , one uppercase, one numeric and special character"
                                }
                            })}
                        />
                        <Button type='submit' className='w-full'>Submit</Button>
                    </div>
                </form>
            </div>

        </div>
    )
}
