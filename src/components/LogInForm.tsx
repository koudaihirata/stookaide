"use client";

import Btn from "@/components/Btn";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { css } from "../../styled-system/css";
import { white } from "@/style/color";


export default function LogInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); 
        try {
            const response = await axios.post('https://click.ecc.ac.jp/ecc/khirata/STOOKAide/?action=login', {
                email: email,
                password: password,
            });

            console.log(response.data);

            if (response.data.message === "Login failed.") {
                setError("ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。");
            } else {
                // トークンなどのデータをlocalStorageに保存
                localStorage.setItem('accessToken', JSON.stringify(response.data));
                localStorage.setItem('refreshToken', JSON.stringify(response.data));
                // トップページ（'/'）にリダイレクト
                router.push('/');
            }
        } catch (err) {
            console.error(err);
            setError("ログインに失敗しました。サーバーに問題が発生しました。");
        }
    };

    return(
        <>
            <form onSubmit={handleLogin} className={css({w:'80%',h:'288px',rounded:'8px',m:'10vh auto 0'})} style={{backgroundColor:white}}>
                <div className={css({w:'90%',h:'100%',m:'0 auto',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'24px'})}>
                    <div className={css({width:'100%'})}>
                        <label htmlFor="em">メールアドレス</label>
                        <input 
                            type="text" 
                            name="em" 
                            id="em" 
                            className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px'})} 
                            placeholder="xxxxx@stook.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={css({width:'100%'})}>
                        <label htmlFor="ps">パスワード</label>
                        <input 
                            type="password" 
                            name="ps" 
                            id="ps"  
                            className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px'})} 
                            placeholder="パスワードを入力してください" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={css({fontSize:'22px',display:'inline-block'})}>
                        <Btn label='ログイン' />
                    </div>
                </div>
                {error && <p className={css({color: 'red', textAlign: 'center', marginTop: '16px'})}>{error}</p>}
            </form>

        </>
    )
}