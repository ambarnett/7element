import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
import { Button, Form } from 'react-bootstrap';
import { useAuth, auth } from '../config/firebase';


export const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/homePage')
        } catch (error) {
            console.error(error.toString())
            
        }
    }



    // ? Currently disabled. Need to be able to verify user somehow
    // TODO find way to verify user or link account???
    // const signInWithGoogle = async () => {
    //     try {
    //         await signInWithPopup(auth, googleProvider);
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2>Login</h2>
                    <Form onSubmit={ handleLogin }>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={ email }
                                onChange={ (e) => setEmail(e.target.value) }
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={ password }
                                onChange={ (e) => setPassword(e.target.value) }
                            />
                        </Form.Group>

                        { error && <p className="text-danger">{ error }</p> }

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                    <p className='mt-3'>
                        Don't have an account? <Link to='../signUp'>Click Here to Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}