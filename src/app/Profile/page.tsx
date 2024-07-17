

import ProfileMain from "@/components/ProfileMain/ProfileMain";
import { css } from "../../../styled-system/css";


export default function Profile() {
    return(
        <>
            <main className={css({h:'100vh'})}>
                <ProfileMain/>
            </main>
        </>
    )
}