import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { db } from "../config/firebase";

export const Players = ({isAdmin}) => {
    const [players, setPlayers] = useState([])
    
    const fetchPlayers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const playerData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPlayers(playerData);
        } catch (error) {
            console.error(error.toString());
        }
    }

    useEffect(() => {
        fetchPlayers();
    }, [])

    return (
        <Container>
            <h1>Players</h1>
            { players.map((player) => (
                <Card bg="dark" text="light">
                    <Card.Body>
                        <Card.Title>{ player.profile_picsture }</Card.Title> {/* change this to Card.Img */}
                        <Card.Title>{ player.last_name }, { player.first_name }</Card.Title>
                        <Card.Text>Skater: { player.skater ? "yes" : "No" }</Card.Text>
                        <Card.Text>Goalie: { player.goalie ? "yes" : "no"}</Card.Text>
                        <Card.Text>Light Jersey: { player.has_light_jersey ? "Yes" : "No" }</Card.Text>
                        <Card.Text>Dark Jersey:{ player.has_dark_jersey ? "Yes" : "No" }</Card.Text>
                        <Card.Text>{ player.jersey_size }</Card.Text>
                        <Card.Text>{ player.branch }</Card.Text>
                        { isAdmin ? (
                            <>
                                <Card.Text>{ player.verified ? "7Element Member" : "verification pending..." }</Card.Text>
                                <Card.Text>{ player.usa_hockey_number }</Card.Text>
                                <Card.Text>{ player.email }</Card.Text>
                                <Card.Text>{ player.phone_number }</Card.Text>
                                <Card.Text>{ player.isAdmin }</Card.Text>
                            </>
                        ) : null }
                    </Card.Body>
                </Card>
            ))}
        </Container>
    )
}