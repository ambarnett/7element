import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase'; // Import the auth object from your firebase.js file
import { Button } from 'react-bootstrap';

export const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setLoading(false);
            if (!user) {
                navigate('/login'); // Redirect to the login page if the user is not logged in
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            navigate('/login')
        } catch (error) {
            console.error(error.toString())
        }
    }

    if (loading) {
        return <div>Loading...</div>; // You can show a loading indicator while checking the authentication status
    }

    return (
        <div className="container">
            <h1 className="mt-4 mb-4">Welcome to the Home Page!</h1>
            <Button onClick={ handleSignOut }>
                Sign Out
            </Button>
            <Button onClick={() => navigate('/events')}>Events</Button>
            <Button onClick={() => navigate('/players')}>Players</Button>
            <Button onClick={ () => navigate('/about') }>About</Button>
            
        </div>
    );
};
