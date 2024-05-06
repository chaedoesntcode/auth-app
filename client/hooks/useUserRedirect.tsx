'use client';
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRedirectUser = (redirect: string) => {
    const { getLoginStatus }  = useUserContext();
    const router = useRouter();

    const redirectUser = async () => {
        try {
            const isLoggedUser = await getLoginStatus();

            if (!isLoggedUser) {
                router.push(redirect);
            }
        } catch (error) {
            console.log("Error redirecting user: ", error);
        }
    };

    useEffect(() => {
        redirectUser();
    }, [redirect, getLoginStatus, router]);
};

export default useRedirectUser;