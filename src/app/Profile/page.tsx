"use client";

import ProfileMain from "@/components/ProfileMain/ProfileMain";
import { css } from "../../../styled-system/css";
import Btn from "@/components/Btn";
import ProfileFavorite from "@/components/ProfileFavorite";
import { useRouter } from "next/navigation";


export default function Profile() {
    const router = useRouter();

    const handleClick = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        router.push('/certification/LogIn');
    }  

    return(
        <>
            <main className={css({h:'100vh'})}>
                <ProfileMain/>
                <ProfileFavorite/>
                <div className={css({w:'100%',display:'flex',justifyContent:'center',mt:'20px'})}>
                    <Btn label="ログアウト" onClick={handleClick}/>
                </div>
            </main>
        </>
    )
}