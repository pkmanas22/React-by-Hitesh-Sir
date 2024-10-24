import React from 'react'
import { Container, Logo } from '../index'
import { useNavigate } from 'react-router-dom';

export default function Footer() {

    const footerItems = [
        [
            {
                tag: 'h2',
                title: "Prorewrwduct",
                link: "#",
                active: true,
            },
            {
                tag: 'p',
                title: "rewrer",
                link: "#",
                active: true,
            },
            {
                tag: 'p',
                title: "wwrewrwr",
                link: "#",
                active: true,
            },
            {
                tag: 'p',
                title: "Prodrrwuct",
                link: "#",
                active: true,
            },
        ],
        [
            {
                tag: 'h2',
                title: "ytyy",
                link: "#",
                active: true,
            },
            {
                tag: 'p',
                title: "rererw",
                link: "#",
                active: true,
            },
            {
                tag: 'p',
                title: "erere",
                link: "#",
                active: true,
            },
            {
                tag: 'p',
                title: "Product",
                link: "#",
                active: true,
            },
        ],
        [
            {
                tag: 'h2',
                title: "ytyy",
                link: "#",
                active: true,
            },
            {
                tag: 'p',
                title: "rererw",
                link: "#",
                active: true,
            },
            {
                tag: 'p',
                title: "erere",
                link: "#",
                active: true,
            },
            {
                tag: 'p',
                title: "Product",
                link: "#",
                active: true,
            },
        ],
        [
            {
                tag: 'h2',
                title: "ytyy",
                link: "#",
                active: true,
            },
            {
                tag: 'p',
                title: "rererw",
                link: "#",
                active: true,
            },
            {
                tag: 'p',
                title: "erere",
                link: "#",
                active: true,
            },
            {
                tag: 'p',
                title: "Product",
                link: "#",
                active: true,
            },
        ],
    ];

    const navigate = useNavigate();

    return (
        <Container>
            <div className=' p-4 grid grid-cols-1 md:grid-cols-2'>
                <div className='md:w-[30%] text-center'>
                    <Logo className='cursor-pointer' clickable />
                    <div>
                        A Blog Post App
                    </div>
                    <div className='flex gap-3 items-center justify-center my-3'>
                        <a href="https://twitter.com/pkmanas22" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="pkmanas22" height="20" width="20" /></a>
                        <a href="https://linkedin.com/in/pkmanas22" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="pkmanas22" height="20" width="20" /></a>
                        <a href="https://instagram.com/pkmanas22" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="pkmanas22" height="20" width="20" /></a>
                        <a href="https://www.leetcode.com/pkmanas22" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/leet-code.svg" alt="pkmanas22" height="20" width="20" /></a>
                    </div>
                </div>

                <div className='flex gap-10 justify-evenly items-center'>
                    {footerItems.map((each, index) => (
                        <ul key={index} className=''>
                            {
                                each.map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => { navigate(item.link) }}
                                        className={`text-left ${item.tag === 'h2' ? 'font-bold text-xl text-black' : 'text-gray-700 cursor-pointer hover:underline'}`}>
                                        {item.title}
                                    </li>
                                ))
                            }
                        </ul>
                    ))}
                </div>
            </div>
            <div className="text-sm text-gray-600 text-center">
                &copy; Copyright 2023. All Rights Reserved. Developed by Manas K Pradhan.
            </div>
        </Container>
    )
}
