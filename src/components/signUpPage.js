import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const SignUpPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const auth = getAuth()
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            const userRef = doc(db, 'users', userCredential.user.uid);
            await setDoc(userRef, {
                email: userCredential.user.email,
                isAdmin: false,
            })
            navigate('/profile')
        } catch (error) {
            setError(error.toString());
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2>Sign Up</h2>
                    <Form onSubmit={ handleSignUp }>
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
                            Sign Up
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}