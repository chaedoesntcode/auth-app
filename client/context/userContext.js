import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useContext } from "react";
import toast from 'react-hot-toast';
import axios from 'axios';

const UserContext = React.createContext();

export const UserContextProvider = ({children}) => {
    const serverUrl = "http://localhost:8000";

    const router = useRouter();

    const [user, setUser] = useState(null);
    const [userState, setUserState] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(true);

    const registerUser = async (e) => {
        e.preventDefault();

        if(!userState.email.includes("@") || !userState.password || userState.password.length < 6) {
            toast.error("Enter a valid email and password.");
            return
        }

        try {
            const res = await axios.post(`${serverUrl}/api/v1/register`, userState);
            console.log(res.data);

            toast.success("User successfully registered.");
            console.log("yes");
            setUserState({
                name: "",
                email: "",
                password: "",
            });

            router.push('/login');
        } catch (error) {
            toast.error("Error registering user.");
        }
    };

    const handleUserInput = (name) => (e) => {
        const value = e.target.value;
    
        setUserState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
      };

    return(
        <UserContext.Provider value={{
            registerUser,
            userState,
            handleUserInput,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
}