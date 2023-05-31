import { collection, getDocs, updateDoc, doc, getDoc, addDoc, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { db } from "../config/firebase";

export const Events = ({ isAdmin }) => {
    const [events, setEvents] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('')
    const [eventInfo, setEventInfo] = useState('')
    const [skillLevel, setSkillLevel] = useState('')
    const [eventType, setEventType] = useState('')
    const [dateTime, setDateTime] = useState(null)
    const [location, setLocation] = useState('')

    const fetchEvents = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'events'));
            const eventData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setEvents(eventData);
        } catch (error) {
            console.error(error.toString());
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [])

    console.log(events, 'events')

    const handleRSVP = async (eventId, rsvpType) => {
        try {
            const eventRef = doc(db, 'events', eventId);
            const eventDoc = await getDoc(eventRef);

            if (eventDoc.exists()) {
                const event = eventDoc.data();
                const currentSkaters = event.skaters || 0;

                // Update the number of skaters based on RSVP type
                let updatedSkaters = currentSkaters;
                if (rsvpType === 'in') {
                    updatedSkaters++;
                } else if (rsvpType === 'out') {
                    updatedSkaters--;
                }

                // Update the event document in Firestore
                await updateDoc(eventRef, { skaters: updatedSkaters })
                
                console.log(`RSVP ${rsvpType} click for event ID: ${eventId}`)

                setEvents((prevEvents) => 
                    prevEvents.map((event) => 
                      event.id === eventId ? { ...event, skaters: updatedSkaters} : event  
                    )
                )
            }
        } catch (error) {
            console.error(error.toString())
        }
    }

    const handleCreateEvent = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Create the event opject
        const event = {
            title,
            dateTime : dateTime ? Timestamp.fromDate(dateTime) : null,
            location,
            info: eventInfo ? eventInfo : "No extra info to add",
            skill_level: skillLevel ? skillLevel : "All",
            type: eventType ? eventType : "Skate",
            skaters: 0,
            goalies: 0,
        };

        try {
            // Save the event to Firebase
            await addDoc(collection(db, 'events'), event);

            // Reset the form fields
            setTitle('')
            setDateTime(null)
            setLocation('')
            setEventInfo('')
            setSkillLevel('')
            setEventType('')

            //Close the modal
            setShowModal(false);

            //Refresh the events data
            fetchEvents();

            console.log('Event created: ', event)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <h1>Events</h1>
            { !isAdmin && (
                <Button onClick={handleCreateEvent} variant="primary">Create Event</Button>
            )}
            { events.map((event) => (
                <div key={ event.id }>
                    <h2>{ event.title }</h2>
                    <p>Info: { event.info }</p>
                    <p>Location: { event.location }</p>
                    <p>Skill level: { event.skill_level }</p>
                    <p>Type: { event.type }</p>
                    <p>Skaters: { event.skaters }</p>
                    <p>Goalies: { event.goalies }</p>
                    <Button onClick={ () => handleRSVP(event.id, 'in') }>IN</Button>
                    <Button onClick={ () => handleRSVP(event.id, 'out') }>OUT</Button>
                </div>
            )) }
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={ title }
                                onChange={ e => setTitle(e.target.value) }
                            />
                        </Form.Group>
                        <Form.Group controlId="formDateTime">
                            <Form.Label>Date and Time</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={ dateTime ? dateTime.toISOString().substring(0, 16) : '' }
                                onChange={e => setDateTime(new Date(e.target.value))}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                value={ location }
                                onChange={e => setLocation(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEventInfo">
                            <Form.Label>Info</Form.Label>
                            <Form.Control
                                type="text"
                                value={ eventInfo }
                                onChange={e => setEventInfo(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSkillLevel">
                            <Form.Label>Skill Level</Form.Label>
                            <Form.Control
                                type="text"
                                value={ skillLevel } 
                                onChange={e => setSkillLevel(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Type of skate</Form.Label>
                            <Form.Control
                                type="text"
                                value={ eventType }
                                onChange={e => setEventType(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="secondary" onClick={ handleCloseModal }>Cancel</Button>
                        <Button variant="primary" onClick={handleFormSubmit}>Save Event</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    )
}