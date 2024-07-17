

import ProfileMain from "@/components/ProfileMain/ProfileMain";
import { css } from "../../../styled-system/css";
import Btn from "@/components/Btn";


export default function Profile() {
    return(
        <>
            <main className={css({h:'100vh'})}>
                <ProfileMain/>
                <div className={css({w:'100%',display:'flex',justifyContent:'center'})}>
                    <Btn label="ログアウト"/>
                </div>
            </main>
        </>
    )
}