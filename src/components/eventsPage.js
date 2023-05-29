import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { db } from "../config/firebase";

export const Events = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
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
        fetchEvents();
    }, [])

    console.log(events, 'events')

    const handleRSVP = (eventId) => {
        // Implement RSVP logic here, such as updating the RSVP status in Firestore
        console.log(`RSVP clicked for event ID: ${eventId}`)
    }

    return (
        <Container>
            <h1>Events</h1>
            { events.map((event) => (
                <div key={ event.id }>
                    <h2>{ event.title }</h2>
                    <p>Info: { event.info }</p>
                    <p>Location: { event.location }</p>
                    <p>Skill level: { event.skill_level }</p>
                    <p>Type: { event.type }</p>
                    <p>Skaters: { event.skaters }</p>
                    <p>Goalies: { event.goalies }</p>
                    <Button onClick={() => handleRSVP(event.id)}>RSVP</Button>
                </div>
            ))}
        </Container>
    )
}