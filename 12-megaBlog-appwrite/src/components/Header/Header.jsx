import { Container, Logo } from '..'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status)        // there is auth in store's reducer and it has status
    const dispatch = useDispatch();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.userData)

    // console.log(user)

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
            navigate('/login')
        })
    }

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Container>
            <nav className="bg-slate-100 border-gray-200 border-b-2 fixed z-[1000] top-0 left-0 w-full">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                    {/* Menu toggle button */}
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>

                    <Logo className='cursor-pointer text-blue-700' clickable />
                    {user && <div className="flex justify-between items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <span className='italic mr-3 hidden sm:flex'>Welcome, {user?.name.split(' ')[0]}</span>
                        {/* User menu button */}
                        <button
                            type="button"
                            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                            onClick={toggleDropdown}
                        >
                            <span className="sr-only">Open user menu</span>
                            <div className="w-8 h-8 text-white text-lg font-semibold flex justify-center items-center rounded-full">
                                {user?.name.charAt(0).toUpperCase()}
                            </div>
                        </button>

                        {/* Dropdown menu */}
                        {isDropdownOpen && (
                            <div ref={dropdownRef} className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow absolute top-16 right-4">
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900">{user?.name}</span>
                                    <span className='text-sm text-gray-700'>{user?.email}</span>
                                </div>
                                <ul className="py-2">
                                    {/* <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</a></li>
                                    <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a></li> */}
                                    <li><a onClick={logoutHandler} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a></li>
                                </ul>
                            </div>
                        )}
                    </div>}

                    {/* Navbar links */}
                    <div className={`items-center justify-between ${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`}>
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-slate-200 md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-slate-100">
                            {navItems.map((item) => (
                                item.active && <li key={item.slug}>
                                    <a href={item.slug} className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-300 md:hover:bg-transparent md:hover:text-blue-700 md:hover:bg-pink-200 border md:px-3 md:py-1">{item.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </Container>
    );
}
