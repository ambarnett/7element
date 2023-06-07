import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { updateProfile } from "firebase/auth";

export const UserProfile = ({ currentUser }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [error, setError] = useState('')
    console.log(currentUser, 'current user')

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(currentUser, {
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber
            })
            // Redirect the user to the home page or any other disired page 
            // after successful profile update
            // Can use React Router's navigate
        } catch (error) {
            setError(error.toString())
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2>Complete Your Profile</h2>
                    <Form onSubmit={ handleFormSubmit }>
                        <Form.Group controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your first name"
                                value={ firstName }
                                onChange={ (e) => setFirstName(e.target.value) }
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your last name"
                                value={ lastName }
                                onChange={ (e) => setLastName(e.target.value) }
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your phone number"
                                value={ phoneNumber }
                                onChange={ (e) => setPhoneNumber(e.target.value) }
                            />
                        </Form.Group>

                        { error && <p className="text-danger">{ error }</p> }

                        <Button variant="primary" type="submit">
                            Save Profile
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}