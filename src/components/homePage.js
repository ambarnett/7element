import { Link, redirect, useNavigate } from 'react-router-dom';
import { useAuth } from '../config/firebase';
import { useEffect, useState } from 'react';

export const HomePage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [error, setError] = useState("")
    // const [loading, setLoading] = useState(true);
    console.log(currentUser, 'currentUser on Home page')

    const getUser = async () => {
        try {
            const userCredentials = await currentUser
            setLoggedInUser(userCredentials)

        } catch (error) {
            setError(error.message)
        }
    }

    getUser()
    console.log(getUser(), 'getUser')

    // useEffect(() => {
    //     if (!currentUser) {
    //         // navigate('/login');
    //         console.log("no current user")
    //         console.log(currentUser, 'currentUser inside useEffect')
    //     } 
    // }, [currentUser, navigate]);

    // if (loading) {
    //     return (
    //         <div className='container mt-5'><h1>Loading...</h1></div>
    //     )
    // }

    // if (!currentUser) {
    //     return null;
    // }
    // this little if statement stops the page from very briefly flashing the details of the home page before redirecting if no user is logged in

    return (
        <div className='container mt-5'>
            <h1>Home Page</h1>
        </div>
    )
}