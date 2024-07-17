"use client"

import { subColor, white } from "@/style/color";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { css } from "../../styled-system/css";
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

export default function RankingBtn() {
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
    
    return (
        <>
            <p style={{color:white}} className={css({width:'330px',margin:'0 auto',paddingTop:'22px'})}><span className={css({fontSize:'20px',fontWeight:'bold'})}>{username}</span>の余り物</p>
            <section className={css({width:'330px',height:'120px',margin:'0 auto',border:'3px solid #FAA755',borderRadius:'8px',background:'white'})}>
                <h2 className={css({width:'100%',height:'70%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',fontWeight:'bold'})}>キャベツ</h2>
                <Link href="/RankingPage" className={css({display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',height:'30%',borderTop:'2px solid #FAA755'})}>
                    <p className={css({paddingLeft:'14px'})}>もっと詳しくみる</p>
                    <FontAwesomeIcon icon={faCircleChevronRight} style={{color:subColor}} className={css({width:'24px',height:'24px',paddingRight:'14px'})}/>
                </Link>
            </section>
            <p style={{color:white}} className={css({width:'330px',margin:'0 auto',paddingTop:'22px'})}><span className={css({fontSize:'20px',fontWeight:'bold'})}>{username}</span>におすすめな物</p>
            <section className={css({width:'330px',height:'120px',margin:'0 auto',border:'3px solid #FAA755',borderRadius:'8px',background:'white'})}>
                <h2 className={css({width:'100%',height:'70%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',fontWeight:'bold'})}>牛肉</h2>
                <Link href="/RankingPage" className={css({display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',height:'30%',borderTop:'2px solid #FAA755'})}>
                    <p className={css({paddingLeft:'14px'})}>もっと詳しくみる</p>
                    <FontAwesomeIcon icon={faCircleChevronRight} style={{color:subColor}} className={css({width:'24px',height:'24px',paddingRight:'14px'})}/>
                </Link>
            </section>
        </>
    );
}
