"use client"

import { mainColor, white } from "@/style/color";
import { css } from "../../styled-system/css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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

export default function LeftoversR() {
    const router = useRouter();
    const [useToken, setTokens] = useState<AccessToken | null>(null);
    const [ingredients, setIngredients] = useState<string[]>([]);

    useEffect(() => {
        const checkTokens = async () => {
            const accessToken = JSON.parse(localStorage.getItem('accessToken') || 'null');
            const refreshToken = JSON.parse(localStorage.getItem('refreshToken') || 'null');
            
            if (!accessToken && !refreshToken) {
                // トークンがない場合、ログインページにリダイレクト
                router.push('/certification/LogIn');
            } else {
                setTokens(accessToken);
            }
        };

        checkTokens();
    }, [router]);

    useEffect(() => {
        const fetchIngredients = async (email: string) => {
            try {
                const response = await axios.get(`https://click.ecc.ac.jp/ecc/khirata/STOOKAide/?action=get_ingredients&email=${email}`);
                console.log('API response:', response.data);
                if (response.status === 200) {
                    console.log('Setting ingredients:', response.data.ingredients);
                    setIngredients(response.data.ingredients);
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error('データの取得が失敗しました:', error);
            }
        }
    
        if (useToken) {
            fetchIngredients(useToken.user.email);
        }
    }, [useToken]);

    return (
        <div className={css({w:'100%',h:'30vh',borderTop:'10px solid #FFCE7B',position:'relative',mt:'70px',bg:'rgba(255,206,123,.3)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'20px'})}>
            <div className={css({w:'100%',display:'flex',alignItems:'center',justifyContent:'center',position:'absolute',top:'-40px'})}>
                <div className={css({w:'65px',h:'65px',rounded:'50%',transform:'translateX(20px)',bg:'#55DCFA'})}></div>
                <h3 className={css({w:'230px',h:'40px',textAlign:'center',lineHeight:'40px',fontWeight:'bold'})} style={{backgroundColor:mainColor,color:white}}>余り物のランキング</h3>
                <div className={css({w:'65px',h:'65px',rounded:'50%',transform:'translateX(-20px)',bg:'#FA5555'})}></div>
            </div>
            <h4 className={css({fontSize:'18px',fontWeight:'bold'})}>
                １.<span className={css({fontSize:'26px',fontWeight:'bold'})}>
                    {ingredients.length > 0 ? ingredients[0] : "データなし"}
                </span>
            </h4>
            <div className={css({w:'100%',display:'flex',alignItems:'center',justifyContent:'space-around'})}>
                <p className={css({fontSize:'18px',fontWeight:'bold'})}>２.<span className={css({fontSize:'20px',fontWeight:'bold'})}>{ingredients.length > 1 ? ingredients[1] : "データなし"}</span></p>
                <p className={css({fontSize:'18px',fontWeight:'bold'})}>４.<span className={css({fontSize:'20px',fontWeight:'bold'})}>{ingredients.length > 3 ? ingredients[3] : "データなし"}</span></p>
            </div>
            <div className={css({w:'100%',display:'flex',alignItems:'center',justifyContent:'space-around'})}>
                <p className={css({fontSize:'18px',fontWeight:'bold'})}>３.<span className={css({fontSize:'20px',fontWeight:'bold'})}>{ingredients.length > 2 ? ingredients[2] : "データなし"}</span></p>
                <p className={css({fontSize:'18px',fontWeight:'bold'})}>５.<span className={css({fontSize:'20px',fontWeight:'bold'})}>{ingredients.length > 4 ? ingredients[4] : "データなし"}</span></p>
            </div>
        </div>
    );
}
