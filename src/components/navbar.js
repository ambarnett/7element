import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../config/firebase";

export const NavBar = () => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            navigate('/login') //Redirect to login page. 
        } catch (error) {
            console.error(error.toString())
        }
    }
    return (
        <Navbar bg='dark' variant='dark' expand='lg'>
            <Navbar.Brand as={ Link } to='/homePage'>
                7Element
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={ Link } to="/homePage">
                        Home
                    </Nav.Link>
                    <Nav.Link as={ Link } to="/events">
                        Events
                    </Nav.Link>
                    <Nav.Link as={ Link } to="/players">
                        Players
                    </Nav.Link>
                    <Nav.Link as={ Link } to="/about">
                        About
                    </Nav.Link>
                    <Nav.Link as={ Link } to="/help">
                        Help
                    </Nav.Link>
                    {/** Add more Nav.Link components for navigation links */}
                </Nav>
                <Button variant="outline-light" onClick={ handleSignOut }>
                    Sign Out
                </Button>
            </Navbar.Collapse>
        </Navbar>
    )
}