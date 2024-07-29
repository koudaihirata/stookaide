import { mainColor, redColor, white } from "@/style/color";
import { css } from "../../../../styled-system/css";
import Link from "next/link";
import SignUpForm from "@/components/SignUpForm";



export default function SignUp() {
    return(
        <main>
            <div className={css({w:'80%',m:'0 auto'})}>
                <h1 className={css({fontSize:'22px',fontWeight:'bold'})}>新規登録</h1>
            </div>
            <div className={css({w:'100%',h:'1px',bg:'rgba(0, 0, 0, 0.25)',mt:'20px'})}></div>
            <SignUpForm/>
        </main>
    )
}