

import { mainColor, white } from "@/style/color";
import Image from "next/image";
import Link from "next/link";
import Btn from "@/components/Btn";
import { css } from "../../../../styled-system/css";


export default function LogIn() {
    return(
        <main className={css({w:'100%',h:'100vh',})} style={{backgroundColor:mainColor}}>
            <h1><Image src='/nameLogo.png' alt="STOOKAide" width={232} height={55} className={css({m:'0 auto 0'})}/></h1>
            <form className={css({w:'80%',h:'288px',rounded:'8px',m:'10vh auto 0'})} style={{backgroundColor:white}}>
                <div className={css({w:'90%',h:'100%',m:'0 auto',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'24px'})}>
                    <div className={css({width:'100%'})}>
                        <label htmlFor="em">メールアドレス</label>
                        <input type="text" name="em" id="em" className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px'})} placeholder="xxxxx@stook.com"/>
                    </div>
                    <div className={css({width:'100%'})}>
                        <label htmlFor="ps">パスワード</label>
                        <input type="password" name="ps" id="ps"  className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px'})} placeholder="パスワードを入力してください"/>
                    </div>
                    <div className={css({fontSize:'22px',display:'inline-block'})}>
                        <Btn label='ログイン'/>
                    </div>
                </div>
            </form>
            <Link href='/certification/SignUp'>
                <div className={css({w:'80%',h:'52px',rounded:'8px',m:'8vh auto 0'})} style={{backgroundColor:white}}>
                    <p className={css({fontSize:'22px',fontWeight:'bold',textAlign:'center',lineHeight:'52px'})}>新規登録</p>
                </div>
            </Link>
            <p className={css({fontSize:'12px',textAlign:'center',m:'5vh'})} style={{color:white}}>メールアドレスまたはパスワードを忘れた方は<Link href='#' className={css({color:'#005DB5'})}>こちら</Link></p>
        </main>
    )
}