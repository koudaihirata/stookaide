import { faBell, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { css } from "../../styled-system/css";
import { mainColor, white } from "@/style/color";
import Link from "next/link";

export default function Header() {
    return(
        <>
            <header style={{backgroundColor: mainColor}} className={css({width:{base:'100%', lg:'390px'},height:'52px',position:'fixed',top:'0',left:{base:'0', lg:'50%'},zIndex:'100',transform:{base:'none', lg:'translateX(-50%)'}})}>
                <div className={css({margin:'0 auto',width:'85%',height:'100%',display:'flex',justifyContent:'space-between',alignItems:'center'})}>
                    <h1><Image src="/nameLogo.svg" alt="STOOK Aide" width={96} height={22}/></h1>
                    <div className={css({display:'flex',gap:'20px'})}>
                        <FontAwesomeIcon icon={faBell} style={{color: white}} className={css({fontSize:'24px'})} />
                        <Link href="/Profile"><FontAwesomeIcon icon={faCircleUser} style={{color: white}} className={css({fontSize:'24px'})} /></Link>
                    </div>
                </div>
            </header>
        </>
    )
}