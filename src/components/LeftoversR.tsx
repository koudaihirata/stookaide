"use client"

import { mainColor, subColor, white } from "@/style/color";
import { css } from "../../styled-system/css";
import { useState } from "react";
import axios from "axios";

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

export default function LeftoversR() {
    const [ingredients, setIngredients] = useState<User | null>(null);

    const fetchIngredients = async (email: User) => {
        try {
            const response = await axios.get(`https://click.ecc.ac.jp/ecc/khirata/STOOKAide/?action=　&email=${email}`)
            if (response.status === 200) {
                setIngredients(response.data.ingredient);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('データの取得が失敗しました:', error);
        }
    }

    console.log(ingredients);
    

    return(
        <div className={css({w:'100%',h:'30vh',borderTop:'10px solid #FFCE7B',position:'relative',mt:'70px',bg:'rgba(255,206,123,.3)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'20px'})}>
            <div className={css({w:'100%',display:'flex',alignItems:'center',justifyContent:'center',position:'absolute',top:'-40px'})}>
                <div className={css({w:'65px',h:'65px',rounded:'50%',transform:'translateX(20px)',bg:'#55DCFA'})}></div>
                <h3 className={css({w:'230px',h:'40px',textAlign:'center',lineHeight:'40px',fontWeight:'bold'})} style={{backgroundColor:mainColor,color:white}}>余り物のランキング</h3>
                <div className={css({w:'65px',h:'65px',rounded:'50%',transform:'translateX(-20px)',bg:'#FA5555'})}></div>
            </div>
            <h4 className={css({fontSize:'18px',fontWeight:'bold'})}>１.<span className={css({fontSize:'26px',fontWeight:'bold'})}>キャベツ</span></h4>
            <div className={css({w:'100%',display:'flex',alignItems:'center',justifyContent:'space-around'})}>
                <p className={css({fontSize:'18px',fontWeight:'bold'})}>２.<span className={css({fontSize:'20px',fontWeight:'bold'})}>玉ねぎ</span></p>
                <p className={css({fontSize:'18px',fontWeight:'bold'})}>４.<span className={css({fontSize:'20px',fontWeight:'bold'})}>大根</span></p>
            </div>
            <div className={css({w:'100%',display:'flex',alignItems:'center',justifyContent:'space-around'})}>
                <p className={css({fontSize:'18px',fontWeight:'bold'})}>３.<span className={css({fontSize:'20px',fontWeight:'bold'})}>ネギ</span></p>
                <p className={css({fontSize:'18px',fontWeight:'bold'})}>５.<span className={css({fontSize:'20px',fontWeight:'bold'})}>人参</span></p>
            </div>
        </div>
    )
}