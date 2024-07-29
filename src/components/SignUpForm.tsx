"use client";

import Link from "next/link";
import { css } from "../../styled-system/css";
import { mainColor, redColor, white } from "@/style/color";
import { useState } from "react";


export default function SignUpForm() {
    const [formData, setFormData] = useState({
        user: "",
        em: "",
        ps: "",
        reps: "",
        post: "",
        birth: "",
        gen: "",
        terms: false
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isConfirming, setIsConfirming] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.terms) {
            setErrorMessage("注意事項・利用規約・プライバシーポリシーにご同意いただく必要があります。");
        } else if(!formData.user || !formData.em || !formData.ps || !formData.reps || !formData.post){
            setErrorMessage("すべての必須フィールドを入力してください。");
        }else if(formData.ps !== formData.reps) {
            setErrorMessage("パスワードが一致しません。再度確認してください。");
        }else {
            setErrorMessage("");
            setIsConfirming(true);
        }
    };

    const handleEdit = () => {
        setIsConfirming(false);
    };

    const handleConfirm = async () => {
        // データベースへの保存処理
        console.log("データを保存しました:", formData);
        // ここにリダイレクトや成功メッセージの表示などを追加できます
    };

    return(
        <>
        {isConfirming ? (
                <div>
                <h1 className={css({ fontSize: '22px', fontWeight: 'bold' })}>確認画面</h1>
                    <div className={css({ mt: '20px' })}>
                        <p>ユーザー名: {formData.user}</p>
                        <p>メールアドレス: {formData.em}</p>
                        <p>郵便番号: {formData.post}</p>
                        <p>生年月日: {formData.birth}</p>
                        <p>性別: {formData.gen}</p>
                    </div>
                    <button className={css({ w: '100%', h: '52px', textAlign: 'center', lineHeight: '52px', mt: '18px', fontWeight: 'bold' })} style={{ backgroundColor: mainColor, color: white }} onClick={handleConfirm}>保存</button>
                    <button className={css({ w: '100%', h: '52px', textAlign: 'center', lineHeight: '52px', mt: '10px', fontWeight: 'bold' })} style={{ backgroundColor: 'gray', color: white }} onClick={handleEdit}>戻る</button>
                </div>
            ) : (
            <form onSubmit={handleSignup} className={css({w:'80%',m:'0 auto'})}>
                <div className={css({w:'100%',mt:'22px'})}>
                    <label htmlFor="user" className={css({fontSize:'12px'})}>ユーザー名<span className={css({fontSize:'10px',ml:'10px'})} style={{color:redColor}}>必須</span></label>
                    <input type="text" name="user" id="user" className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px',fontSize:'12px'})} placeholder="ユーザー名" onChange={handleChange} value={formData.user}/>
                </div>
                <div className={css({w:'100%',mt:'22px'})}>
                    <label htmlFor="em" className={css({fontSize:'12px'})}>メールアドレス<span className={css({fontSize:'10px',ml:'10px'})} style={{color:redColor}}>必須</span></label>
                    <input type="text" name="em" id="em" className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px',fontSize:'12px'})} placeholder="xxxxx@stook.com" onChange={handleChange} value={formData.em}/>
                </div>
                <div className={css({w:'100%',mt:'22px'})}>
                    <label htmlFor="ps" className={css({fontSize:'12px'})}>パスワード<span className={css({fontSize:'10px',ml:'10px'})} style={{color:redColor}}>必須</span></label>
                    <input type="password" name="ps" id="ps" className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px',fontSize:'12px'})} placeholder="パスワードを入力してください" onChange={handleChange} value={formData.ps}/>
                    <ul className={css({listStyle:'circle',ml:'1.2rem'})}>
                        <li>
                            <p className={css({fontSize:'12px'})}>8文字以上20文字以内で入力してください</p>
                        </li>
                        <li>
                            <p className={css({fontSize:'12px'})}>半角英字と半角数字を含めてください</p>
                        </li>
                    </ul>
                </div>
                <div className={css({w:'100%',mt:'22px'})}>
                    <label htmlFor="reps" className={css({fontSize:'12px'})}>パスワード（確認）<span className={css({fontSize:'10px',ml:'10px'})} style={{color:redColor}}>必須</span></label>
                    <input type="password" name="reps" id="reps" className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px',fontSize:'12px'})} placeholder="パスワードを入力してください" onChange={handleChange} value={formData.reps}/>
                </div>
                <div className={css({w:'100%',mt:'22px'})}>
                    <label htmlFor="post" className={css({fontSize:'12px'})}>郵便番号<span className={css({fontSize:'10px',ml:'10px'})} style={{color:redColor}}>必須</span></label>
                    <input type="text" name="post" id="post" className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px',fontSize:'12px'})} placeholder="例）5550001" onChange={handleChange} value={formData.post}/>
                </div>
                <div className={css({w:'100%',mt:'22px'})}>
                    <label htmlFor="birth" className={css({fontSize:'12px'})}>生年月日</label>
                    <input type="text" name="birth" id="birth" className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px',fontSize:'12px'})} placeholder="例）2002-06-01" onChange={handleChange} value={formData.birth}/>
                </div>
                <div className={css({w:'100%',mt:'22px'})}>
                    <p className={css({fontSize:'12px'})}>性別</p>
                    <div className={css({display:'flex',alignItems:'center',gap:'12px',mt:'6px'})}>
                        <label htmlFor="gen-male" className={css({ fontSize: '14px',display:'flex',alignItems:'center'})}>
                            <input type="radio" name="gen" id="gen-male" value="男" onChange={handleChange}/>
                            男性
                        </label>
                        <label htmlFor="gen-female" className={css({ fontSize: '14px', marginLeft: '10px',display:'flex',alignItems:'center'})}>
                            <input type="radio" name="gen" id="gen-female" value="女" onChange={handleChange}/>
                            女性
                        </label>
                        <label htmlFor="gen-oth" className={css({ fontSize: '14px', marginLeft: '10px',display:'flex',alignItems:'center'})}>
                            <input type="radio" name="gen" id="gen-oth" value="その他" onChange={handleChange}/>
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
                <button className={css({w:'100%',h:'52px',textAlign:'center',lineHeight:'52px',mt:'18px',fontWeight:'bold'})} style={{backgroundColor:mainColor,color:white}}>確認画面へ</button>
            </form>
            )}
        </>
    )
}