import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { css } from "../../styled-system/css";
import { mainColor, white } from "@/style/color";

export default function Header() {
    return(
        <>
            <header style={{backgroundColor: mainColor}} className={css({width:'100%',height:'52px',position:'fixed',top:'0',left:'0',zIndex:'100'})}>
                <div className={css({margin:'0 auto',width:'85%',height:'100%',display:'flex',justifyContent:'space-between',alignItems:'center'})}>
                    <h1><Image src="/nameLogo.svg" alt="STOOK Aide" width={96} height={22}/></h1>
                    <FontAwesomeIcon icon={faBell} style={{color: white}} className={css({fontSize:'20px'})} />
                </div>
            </header>
        </>
    )
}