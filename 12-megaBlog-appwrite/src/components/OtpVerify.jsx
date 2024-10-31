import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from './index'
import { PinInput } from './ui/pin-input'
import { useState } from 'react';
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { login as storeLogin } from '../store/authSlice';

export default function OtpVerify() {
    // http://localhost:5173/verification?uq=672167fe75d3410e8073&$createdAt=2024-10-29T22:55:58.483+00:00&num=0&email=manas@pradhan.com&data=67213cb3001217249821&expire=2024-10-29T23:10:58.482+00:00

    const [searchParams,] = useSearchParams();
    const [value, setValue] = useState(["", "", "", "", "", ""]);
    const [btnClicked, setBtnClicked] = useState(false);

    const email = searchParams.get('email');
    const userId = searchParams.get('data');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const handleOtpSubmit = async () => {
        let otp = "";
        value.forEach((each) => {
            otp += each;
        })

        if (otp.length === 6) {
            setBtnClicked(true);
            try {
                const response = await authService.createSessionOtp({
                    userId,
                    otp,
                })
                if (response.$id) {
                    // console.log("response")
                    const userData = await authService.getCurrentUser();
                    if (userData) dispatch(storeLogin(userData));
                    navigate('/');
                }
            } catch (error) {
                // console.log("OtpVerify Component Error :: handleOtpSubmitFn :: error ", error.message);
                await alert("Sorry something happened at this moment, please signup again");
                navigate('/signup');
            }

        } else {
            alert("Otp must be 6 digits")
            return;
        }

    }

    return (
        <div className='w-[80%] md:w-[40%] h-[70vh] flex flex-col justify-center items-center m-auto bg-white rounded-lg space-y-8 p-5 mt-5 shadow-lg'>
            <div className='text-center text-lg'>
                Enter the OTP (One Time Password) received on your email: <br /> <code className='text-lg bg-gray-300 px-2 '>{email}</code>
            </div>
            <div className='flex'>
                <PinInput
                    className="m-auto"
                    size="lg"
                    variant="outline"
                    type='numeric'
                    value={value}
                    onValueChange={(e) => setValue(e.value)}
                    otp />
            </div>
            <span>( OTP valid for 15 minutes )</span>
            <Button onClick={handleOtpSubmit} disabled={btnClicked} className={`text-lg ${btnClicked && 'cursor-progress'}`}>Submit</Button>
        </div>
    )
}
