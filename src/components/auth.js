import { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { Button } from 'react-bootstrap';


export const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err)
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

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <input
                placeholder='Email...'
                onChange={e => setEmail(e.target.value)}
            />
            <input
                placeholder='Password...'
                onChange={e => setPassword(e.target.value)}
            />
            <Button onClick={signIn}>Sign In</Button>
            {/* <Button onClick={signInWithGoogle}>Google Sign In</Button> */}
            <Button onClick={logout}>Sign Out</Button>
        </div>
    )
}