import authService from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from './index'
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function Signup() {
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors } } = useForm()
    const [btnClicked, setBtnClicked] = useState(false);


    async function signupFn(data) {
        setError(null)
        setBtnClicked(true)
        
        try {
            const token = await authService.createUser(data);
            if(token.userId) {
                navigate(`/verification?uq=${token.$id}&$createdAt=${token.$createdAt}&num=${Math.floor(Math.random())}&email=${data.email}&data=${token.userId}&exp=${token.expire}`)
            }

        } catch (error) {
            // console.log("Signup Component Error :: signupFn :: error ", error.message);
            setError('root.serverError', {
                message: error.message
            })
        } finally {
            setBtnClicked(false)
        }
    }

    return (
        <div className="flex items-center justify-center mx-auto md:w-full">
            <div className={`mx-auto  max-w-lg w-full bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="text-center space-y-2 mb-3">
                    <h2 className="text-center text-2xl md:text-4xl font-bold leading-tight">Create an account</h2>
                    <div className="text-lg font-semibold">
                        Already have an account?&nbsp;
                        <span onClick={() => {
                            navigate("/login")
                        }}
                            className="italic underline hover:text-blue-700 cursor-pointer mx-1 text-xl text-gray-700">
                            Login
                        </span>
                    </div>
                </div>

                {errors.root && <p className="text-red-600 mt-8 text-center">{errors.root.serverError.message}</p>}

                <form onSubmit={handleSubmit(signupFn)} >
                    <div className='space-y-5'>
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            type="text"
                            errorMsg={errors.name?.message}
                            {...register("name", {
                                required: "Full name is required",
                                maxLength: {
                                    value: 20,
                                    message: "Full name cannot exceed more than 20 letters"
                                }
                            })}
                        />
                        <Input
                            label="Email"
                            type="text"
                            placeholder="example@gmail.com"
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
                                required: "Password is required",
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
                        <Button type='submit' className={`bg-green-200 w-full font-bold text-xl hover:bg-pink-100 ${btnClicked && 'cursor-progress'}`}>Send OTP</Button>
                    </div>
                </form>
            </div>

        </div>
    )
}
