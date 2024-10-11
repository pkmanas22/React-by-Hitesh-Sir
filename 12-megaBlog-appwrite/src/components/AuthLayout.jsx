import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AuthLayout({
    children,
    authentication = true,
}) {
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login');
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }

        //TODO: make it more easy to understand
        /*if (authStatus === true) {
            navigate('/')
        } else if (authStatus === false) {
            navigate("/login")
        }*/

        setLoader(false)
    }, [authentication, navigate, authStatus])

    return loader ? <div>Loading...</div> : <>{children}</>
}
