"use client";

import Link from "next/link";
import { css } from "../../styled-system/css";
import { mainColor, redColor, white } from "@/style/color";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function SignUpForm() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        repassword: "",
        postal_code: "",
        date_of_birth: "",
        gender: "",
        terms: false
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isConfirming, setIsConfirming] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            password: { value: string };
            reps: { value: string };
        };
        const password = target.password.value;

        const isPasswordValid = password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
        
        if (formData.password !== formData.repassword) {
            setErrorMessage("パスワードが一致しません。再度確認してください。");
        } else if(!isPasswordValid){
            setErrorMessage("パスワードの条件を満たしてください");
        }else if(!formData.username || !formData.email || !formData.password || !formData.postal_code) {
            setErrorMessage("すべての必須フィールドを入力してください。");
        }else if(!formData.terms) {
            setErrorMessage("注意事項・利用規約・プライバシーポリシーにご同意いただく必要があります。");
        }else {
            setErrorMessage("");
            setIsConfirming(true);
        }
    };

    const handleEdit = () => {
        setIsConfirming(false);
    };

    const handleConfirm = async () => {
        try {
            const response = await fetch('https://click.ecc.ac.jp/ecc/khirata/STOOKAide/?action=register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                if (data.message === "ユーザーが正常に登録されました。") {
                    // 成功メッセージの表示やリダイレクト処理
                    router.push('/certification/LogIn')
                } else {
                    setErrorMessage(`${data.message}: ${data.error}`);
                }
            } else {
                const errorMessage = await response.text();
                setErrorMessage(`エラーメッセージ: ${errorMessage}`);
            }
        } catch (error: any) {
            setErrorMessage(`データ送信中にエラーが発生しました: ${error.message}`);
        }
    };

    return(
        <>
        {isConfirming ? (
                <section className={css({w:'80%',h:'62vh',m:'0 auto'})}>
                    <h1 className={css({fontSize:'18px',fontWeight:'bold',mt:'18px'})}>確認画面</h1>
                    <div className={css({mt:'16px'})}>
                        <p className={css({fontSize:'12px',mr:'1rem'})}>ユーザー名: <span className={css({fontSize:'14px',fontWeight:'bold'})}>{formData.username}</span></p>
                        <p className={css({fontSize:'12px',mr:'1rem',mt:'12px'})}>メールアドレス: <span className={css({fontSize:'14px',fontWeight:'bold'})}>{formData.email}</span></p>
                        <p className={css({fontSize:'12px',mr:'1rem',mt:'12px'})}>パスワード: <span className={css({fontSize:'14px',fontWeight:'bold'})}>⚫︎⚫︎⚫︎⚫︎⚫︎⚫︎⚫︎⚫︎⚫</span></p>
                        <p className={css({fontSize:'12px',mr:'1rem',mt:'12px'})}>郵便番号: <span className={css({fontSize:'14px',fontWeight:'bold'})}>{formData.postal_code}</span></p>
                        <p className={css({fontSize:'12px',mr:'1rem',mt:'12px'})}>生年月日: <span className={css({fontSize:'14px',fontWeight:'bold'})}>{formData.date_of_birth}</span></p>
                        <p className={css({fontSize:'12px',mr:'1rem',mt:'12px'})}>性別: <span className={css({fontSize:'14px',fontWeight:'bold'})}>{formData.gender}</span></p>
                    </div>
                    <p className={css({fontSize:'12px',color:'#8F8F8F',mt:'28px'})}>入力内容に誤りがないか確認してください。上記の内容が宜しければ登録ボタンを押してください</p>
                    {errorMessage && <p className={css({ fontSize: '12px',mt: '8px' })} style={{color:redColor}}>{errorMessage}</p>}
                    <div>
                        <button className={css({ w: '100%', h: '52px', textAlign: 'center', lineHeight: '52px', mt: '18px', fontWeight: 'bold' })} style={{ backgroundColor: mainColor, color: white }} onClick={handleConfirm}>登録</button>
                        <button className={css({ w: '100%', h: '52px', textAlign: 'center', lineHeight: '52px', mt: '10px', fontWeight: 'bold' })} style={{ backgroundColor: 'gray', color: white }} onClick={handleEdit}>入力画面へ戻る</button>
                    </div>
                </section>
            ) : (
            <form onSubmit={handleSignup} className={css({w:'80%',m:'0 auto'})}>
                <div className={css({w:'100%',mt:'22px'})}>
                    <label htmlFor="username" className={css({fontSize:'12px'})}>ユーザー名<span className={css({fontSize:'10px',ml:'10px'})} style={{color:redColor}}>必須</span></label>
                    <input type="text" name="username" id="username" className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px',fontSize:'12px'})} placeholder="ユーザー名" onChange={handleChange} value={formData.username}/>
                </div>
                <div className={css({w:'100%',mt:'22px'})}>
                    <label htmlFor="email" className={css({fontSize:'12px'})}>メールアドレス<span className={css({fontSize:'10px',ml:'10px'})} style={{color:redColor}}>必須</span></label>
                    <input type="text" name="email" id="email" className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px',fontSize:'12px'})} placeholder="xxxxx@stook.com" onChange={handleChange} value={formData.email}/>
                </div>
                <div className={css({w:'100%',mt:'22px'})}>
                    <label htmlFor="password" className={css({fontSize:'12px'})}>パスワード<span className={css({fontSize:'10px',ml:'10px'})} style={{color:redColor}}>必須</span></label>
                    <input type="password" name="password" id="password" className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px',fontSize:'12px'})} placeholder="パスワードを入力してください" onChange={handleChange} value={formData.password}/>
                    <ul className={css({listStyle:'circle',ml:'1.2rem'})}>
                        <li>
                            <p className={css({fontSize:'12px'})}>8文字以上で入力してください</p>
                        </li>
                        <li>
                            <p className={css({fontSize:'12px'})}>半角英字と半角数字を含めてください</p>
                        </li>
                    </ul>
                </div>
                <div className={css({w:'100%',mt:'22px'})}>
                    <label htmlFor="repassword" className={css({fontSize:'12px'})}>パスワード（確認）<span className={css({fontSize:'10px',ml:'10px'})} style={{color:redColor}}>必須</span></label>
                    <input type="password" name="repassword" id="repassword" className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px',fontSize:'12px'})} placeholder="パスワードを入力してください" onChange={handleChange} value={formData.repassword}/>
                </div>
                <div className={css({w:'100%',mt:'22px'})}>
                    <label htmlFor="postal_code" className={css({fontSize:'12px'})}>郵便番号<span className={css({fontSize:'10px',ml:'10px'})} style={{color:redColor}}>必須</span></label>
                    <input type="number" name="postal_code" id="postal_code" className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px',fontSize:'12px'})} placeholder="例）5550001" onChange={handleChange} value={formData.postal_code}/>
                </div>
                <div className={css({w:'100%',mt:'22px'})}>
                    <label htmlFor="date_of_birth" className={css({fontSize:'12px'})}>生年月日</label>
                    <input type="text" name="date_of_birth" id="date_of_birth" className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px',fontSize:'12px'})} placeholder="例）2002-06-01" onChange={handleChange} value={formData.date_of_birth}/>
                </div>
                <div className={css({w:'100%',mt:'22px'})}>
                    <p className={css({fontSize:'12px'})}>性別</p>
                    <div className={css({display:'flex',alignItems:'center',gap:'12px',mt:'6px'})}>
                        <label htmlFor="gen-male" className={css({ fontSize: '14px',display:'flex',alignItems:'center'})}>
                            <input type="radio" name="gender" id="gen-male" value="男" onChange={handleChange}/>
                            男性
                        </label>
                        <label htmlFor="gen-female" className={css({ fontSize: '14px', marginLeft: '10px',display:'flex',alignItems:'center'})}>
                            <input type="radio" name="gender" id="gen-female" value="女" onChange={handleChange}/>
                            女性
                        </label>
                        <label htmlFor="gen-oth" className={css({ fontSize: '14px', marginLeft: '10px',display:'flex',alignItems:'center'})}>
                            <input type="radio" name="gender" id="gen-oth" value="その他" onChange={handleChange}/>
                            その他
                        </label>
                    </div>
                    <p className={css({fontSize:'12px',color:'#8F8F8F',mt:'8px'})}>性別をご登録いただきますと、あなたにおすすめの商品をご提案いたします。</p>
                </div>
                <div className={css({w:'100%',h:'1px',bg:'#D0D0D0',mt:'22px'})}></div>
                <p className={css({fontSize:'12px',mt:'24px'})}>利用規約</p>
                <label className={css({fontSize:'12px'})}>
                    <input type="checkbox" name="terms" id="terms" className={css({ mr: '10px', mt: '10px' })} onChange={handleChange} checked={formData.terms} />
                    注意事項・利用規約・プライバシーポリシーにご同意の上、確認画面へお進みください。
                </label>
                <p className={css({fontSize:'12px',color:'#8F8F8F',mt:'8px'})}>利用規約とプライバシーポリシーにご同意の上、確認画面へお進みください。</p>
                {errorMessage && <p className={css({ fontSize: '12px',mt: '8px' })} style={{color:redColor}}>{errorMessage}</p>}
                <div className={
                    css({
                        w:'100%',
                        h:'1.5rem',
                        mt:'14px',
                        display:'flex',
                        alignItems:'center',
                        position:'relative',
                        _before: {
                            content: '""',
                            position:'absolute',
                            w:'2px',
                            h:'100%',
                            top:'50%',
                            left:'50%',
                            bg:'#D0D0D0',
                            transform:'translate(-50%,-50%)'
                        }
                    })}>
                    <Link href={'#'} className={css({w:'50%',color:'#005DB5',fontSize:'12px',textAlign:'center'})}>利用規約</Link>
                    <Link href={'#'} className={css({w:'50%',color:'#005DB5',fontSize:'12px',textAlign:'center'})}>プライバシーポリシー</Link>
                </div>
                <button className={
                    css({
                        w:'100%',
                        h:'52px',
                        textAlign:'center',
                        lineHeight:'52px',
                        mt:'18px',
                        fontWeight:'bold'
                    })} style={{backgroundColor:mainColor,color:white}}>確認画面へ</button>
            </form>
            )}
        </>
    )
}