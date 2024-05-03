import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useContext } from "react";
import toast from 'react-hot-toast';
import axios from 'axios';

const UserContext = React.createContext();

export const UserContextProvider = ({children}) => {
    const serverUrl = "http://localhost:8000";

    const router = useRouter();

    const [user, setUser] = useState({});
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

            toast.success("Account created successfully.");
            setUserState({
                name: "",
                email: "",
                password: "",
            });

            router.push('/login');
        } catch (error) {
            toast.error("Error registering.");
        }
    };

    const handleUserInput = (name) => (e) => {
        const value = e.target.value;
    
        setUserState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
      };

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${serverUrl}/api/v1/login`, {
                email: userState.email,
                password: userState.password,
            }, {
                withCredentials: true,
            });

            toast.success("User logged in successfully");

            setUserState({
                email: "",
                password: "",
            });

            router.push("/");
        } catch (error) {
            console.log("Error logging in user: ", error);
            toast.error(error.response.data.message);
        };
    };

    const logoutUser = async () => {
        try {
            const res = await axios.get(`${serverUrl}/api/v1/logout`, {
                withCredentials: true,
            });

            toast.success("User logged out successfully.");
            router.push("/login");
        } catch (error) {
            console.log("Error logging out user: ", error);
        }
    };

    const userLoginStatus = async () => {
        let loggedIn = false;

        try {
            const res = await axios.get(`${serverUrl}/api/v1/login-status`, {
                withCredentials: true,
            });

            loggedIn = !!res.data;
            setLoading(false);

            if(!loggedIn) {
                router.push("/login");
            }
        } catch (error) {
            console.log("Error getting user login status: ", error);
        }

        return loggedIn;
    };

    useEffect(() => {
        userLoginStatus();
    }, []);

    return(
        <UserContext.Provider value={{
            registerUser,
            userState,
            handleUserInput,
            loginUser,
            userLoginStatus,
            logoutUser,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
}