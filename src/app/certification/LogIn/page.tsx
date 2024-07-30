import { mainColor, white } from "@/style/color";
import Image from "next/image";
import Link from "next/link";
import { css } from "../../../../styled-system/css";
import "@/components/Anime.scss";
import LogInForm from "@/components/LogInForm";

export default function LogIn() {
    return (
        <main className={css({w:'100%',h:'100vh',})} style={{backgroundColor:mainColor}}>
            <div className="splash"></div>
            <div id="welcome"></div>
            <h1>
                <Image src='/nameLogo.png' alt="STOOKAide" width={232} height={55} className={css({m:'0 auto 0'})}/>
            </h1>
            <LogInForm/>
            <Link href='/certification/SignUp'>
                <div className={css({w:'80%',h:'52px',rounded:'8px',m:'8vh auto 0'})} style={{backgroundColor:white}}>
                    <p className={css({fontSize:'22px',fontWeight:'bold',textAlign:'center',lineHeight:'52px'})}>新規登録</p>
                </div>
            </Link>
            <p className={css({fontSize:'12px',textAlign:'center',m:'5vh'})} style={{color:white}}>メールアドレスまたはパスワードを忘れた方は<Link href='#' className={css({color:'#005DB5'})}>こちら</Link></p>
        </main>
    );
}
