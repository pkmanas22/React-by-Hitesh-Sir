import React from 'react'
import { Container, Logo } from '../index'
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="w-[100vw] bg-white container border-t-2 mx-auto p-6 lg:py-8">
            <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0 text-center">
                    <Logo className='cursor-pointer' clickable />
                    <p className='text-gray-500 font-[cursive] '>A hub for writers & readers</p>
                </div>
                <div className="grid grid-cols-3 gap-8 sm:gap-6">
                    <div>
                        <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase ">Resources</h2>
                        <ul className="text-gray-500  font-medium  space-y-1">
                            <li>
                                <a target="_blank" href="https://github.com/pkmanas22/post-palette.git" className="hover:underline">Source Code</a>
                            </li>
                            <li>
                                <a target="_blank" href="/" className="hover:underline">Post Pallete</a>
                            </li>
                            <li>
                                <a target="_blank" href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a>
                            </li>
                            <li>
                                <a target="_blank" href="https://ui.aceternity.com/" className="hover:underline">Aceternity UI</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase ">Follow me</h2>
                        <ul className="text-gray-500  font-medium space-y-1">
                            <li>
                                <a target="_blank" href="https://github.com/pkmanas22" className="hover:underline ">Github</a>
                            </li>
                            <li>
                                <a target="_blank" href="https://twitter.com/pkmanas22" className="hover:underline">Twitter</a>
                            </li>
                            <li>
                                <a target="_blank" href="https://linkedin.com/in/pkmanas22" className="hover:underline ">LinkedIn</a>
                            </li>
                            <li>
                                <a target="_blank" href="https://www.leetcode.com/pkmanas22" className="hover:underline ">Leetcode</a>
                            </li>
                            <li>
                                <a target="_blank" href="https://instagram.com/pkmanas22" className="hover:underline">Instagram</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase ">Legal</h2>
                        <ul className="text-gray-500 font-medium space-y-1">
                            <li>
                                <a target="_blank" href="#" className="hover:underline">Privacy Policy</a>
                            </li>
                            <li>
                                <a target="_blank" href="#" className="hover:underline">Terms &amp; Conditions</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-gray-200 w-full mx-auto lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm text-gray-500 sm:text-center">&copy; 2024 <a target="_blank" href="/" className="hover:underline">PostPalette™</a>. All Rights Reserved. Designed & developed by <a href="https://twitter.com/pkmanas22" target='_blank' className='underline'>Manas</a>
                </span>
                <div className="flex mt-4 gap-3 sm:justify-center items-center sm:mt-0">
                    <a target="_blank" href="https://twitter.com/pkmanas22"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="pkmanas22" height="20" width="20" /></a>
                    <a target="_blank" href="https://linkedin.com/in/pkmanas22"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="pkmanas22" height="20" width="20" /></a>
                    <a target="_blank" href="https://instagram.com/pkmanas22"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="pkmanas22" height="20" width="20" /></a>
                    <a target="_blank" href="https://www.leetcode.com/pkmanas22"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/leet-code.svg" alt="pkmanas22" height="20" width="20" /></a>
                </div>
            </div>
        </footer>
    )
}
