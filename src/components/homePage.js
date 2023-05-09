import { Link, redirect, useNavigate } from 'react-router-dom';
import { useAuth } from '../config/firebase';
import { useEffect } from 'react';

export const HomePage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    //If the user is not logged in, redirect to the login page
    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate])

    return (
        <div>this is the home page</div>
    )
}