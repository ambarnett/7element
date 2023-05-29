import { collection, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
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
                    <Button onClick={ () => handleRSVP(event.id, 'in') }>IN</Button>
                    <Button onClick={ () => handleRSVP(event.id, 'out') }>OUT</Button>
                </div>
            ))}
        </Container>
    )
}