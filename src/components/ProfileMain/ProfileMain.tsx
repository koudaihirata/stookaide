"use client"

import Image from "next/image";
import { css } from "../../../styled-system/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import { mainColor, subColor } from "@/style/color";
import Link from "next/link";
import "@/components/ProfileMain/ProfileMain.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
    created_at: string;
    date_of_birth: string;
    email: string;
    favorite_recipe: string | null;
    gender: string;
    id: number;
    postal_code: string;
    profile_image: string | null;
    username: string;
}

interface AccessToken {
    message: string;
    user: User;
}

export default function ProfileMain() {
    const router = useRouter();
    const [useToken, setTokens] = useState<AccessToken | null>(null);

    useEffect(() => {
        const checkTokens = async () => {
            const accessToken = JSON.parse(localStorage.getItem('accessToken') || 'null');
            const refreshToken = JSON.parse(localStorage.getItem('refreshToken') || 'null');

            console.log(accessToken);
            // console.log(accessToken.user.username); 名前の指定

            
            if (!accessToken && !refreshToken) {
                // トークンがない場合、ログインページにリダイレクト
                router.push('/certification/LogIn');
            } else {
                setTokens(accessToken);
            }
        };

        checkTokens();
    }, [router]);

    const username = useToken ? useToken.user.username : "ストッくん";
    const email = useToken ? useToken.user.email : "*****@stook.com";

    return(
        <>
            <div className={css({w:'100%',h:'280px',borderBottom:'1px solid rgba(130, 130, 130, 0.25)',position:'relative',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'})}>
                <Link href={'#'} >
                    <FontAwesomeIcon icon={faGears} style={{color:mainColor}} className={css({fontSize:'32px',position:'absolute',top:'14px',right:'20px'})}/>
                </Link>
                <div className={css({w:'100%',h:'150px',display:'flex',alignItems:'center',justifyContent:'center'})}>
                    <div className="ProfileMain" style={{backgroundColor:mainColor}}>
                        <div className="ProfileSub" style={{backgroundColor:subColor}}>
                            <Image src={'/AdobeStock_724935013.jpg'} alt="プロフィール写真" width={100} height={100} className={css({w:'100px',h:'100px',rounded:'50%'})}/>
                        </div>
                    </div>
                </div>
                <h2 className={css({fontSize:'32px',fontWeight:'bold',mt:'2px'})}>{username}</h2>
                <p className={css({fontSize:'16px',fontWeight:'bold'})}>{email}</p>
            </div>
        </>
    )  
}