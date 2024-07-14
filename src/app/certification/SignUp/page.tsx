import { redColor } from "@/style/color";
import { css } from "../../../../styled-system/css";



export default function SignUp() {
    return(
        <main>
            <div className={css({w:'80%',m:'0 auto'})}>
                <h1 className={css({fontSize:'22px',fontWeight:'bold'})}>新規登録</h1>
            </div>
            <div className={css({w:'100%',h:'1px',bg:'rgba(0, 0, 0, 0.25)',mt:'20px'})}></div>
            <div className={css({w:'80%',m:'0 auto'})}>
                <div>
                    <label htmlFor="user">ユーザー名<span style={{color:redColor}}>必須</span></label>
                </div>
            </div>
        </main>
    )
}