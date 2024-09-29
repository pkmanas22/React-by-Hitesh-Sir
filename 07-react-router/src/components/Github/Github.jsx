import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
    /*
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('https://api.github.com/users/pkmanas22')
            .then((res) => res.json())
            .then((data) => { setData(data) })
    }, [])
    */

    // using loader
    const data = useLoaderData();

    return (
        <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl flex flex-col justify-center items-center'>
            Name: {data.name}
            <br />
            Github followers: {data.followers}
            <br />
            <img src={data.avatar_url} alt="Git picture" width={300} />
        </div>
    )
}

export default Github

export const githubInfoLoader = async() => {
    const response = await fetch('https://api.github.com/users/pkmanas22')
    return response.json()
}

