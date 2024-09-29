import { useParams, useSearchParams } from 'react-router-dom'

function User() {
    const { userId } = useParams();
    const [searchParam, setSearchParam] = useSearchParams();
    return (
        <div className='bg-gray-600 text-white text-3xl p-4 text-center'>
            User: {userId}
            <br />
            Name: {searchParam.get('name')}
            <br />
            Age: {searchParam.get('age')}
        </div>
    )
}

export default User