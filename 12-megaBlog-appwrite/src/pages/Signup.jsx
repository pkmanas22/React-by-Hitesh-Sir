import { BlockquoteComponent, Signup as SignupComponent } from '../components'

export default function Signup() {
    return (
        <div className='w-screen h-full pt-20 grid md:grid-cols-2 shadow-md p-10 gap-5'>
            <div className="bg-gray-100 mb-2 border border-black/10 rounded-xl px-6 md:px-20 flex-col items-center justify-center font-bold md:text-xl hidden md:inline-flex">
                < BlockquoteComponent />
            </div>

            <div className="flex justify-center items-center mx-auto w-full">
                < SignupComponent />
            </div>
        </div>
    )
}
