import { Container, Logo } from '..'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status)        // there is auth in store's reducer and it has status
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "My Posts",
            slug: "/my-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]

    function logoutHandler() {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }

    return (
        <Container>
            <div className='flex justify-between items-center'>
                <Logo className='text-blue-800 text-4xl p-3 cursor-pointer' clickable />
                <ul className='flex gap-2 mr-5 items-center'>
                    {navItems.map((item, index) => (
                        item.active && <li key={index}>
                            <button
                                onClick={() => { 
                                    navigate(item.slug)
                                }}
                                className='px-2 md:px-4 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                                {item.name}
                            </button>
                        </li>
                    ))}
                    {authStatus && <li>
                        <button
                            onClick={logoutHandler}
                            className='px-2 md:px-4 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                            Logout
                        </button>
                    </li>}
                </ul>
            </div>
        </Container>
    )
}
