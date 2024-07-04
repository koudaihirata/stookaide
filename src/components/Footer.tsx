import { faCamera, faHouseChimney, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { css } from "../../styled-system/css";
import { white } from "@/style/color";


export default function Footer() {
    return(
        <>
            <footer className={css({width:{base:'100%', lg:'390px'},height:'120px',position:'fixed',bottom:'0',left:{base:'0', lg:'50%'},transform:{base:'none', lg:'translateX(-50%)'}})}>
                <div className={css({width:'85%',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-around'})}>
                    <Link href="/">
                        <div className={css({width:'67px',height:'67px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',bg:'linear-gradient(180deg, #FFCE7B 0%, #FAA755 100%)',transform:'translateY(15px)'})}>
                            <FontAwesomeIcon icon={faHouseChimney} className={css({fontSize:'24px'})} style={{color:white}}/>
                            <p className={css({fontSize:'14px'})} style={{color:white}}>ホーム</p>
                        </div>
                    </Link>
                    <Link href="#">
                        <div className={css({width:'86px',height:'86px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',bg:'linear-gradient(180deg, #FFCE7B 0%, #FAA755 100%)',transform:'translateY(-10px)'})}>
                            <FontAwesomeIcon icon={faCamera} className={css({fontSize:'32px'})} style={{color:white}}/>
                            <p className={css({fontSize:'18px'})} style={{color:white}}>撮影</p>
                        </div>
                    </Link>
                    <Link href="/Recipe">
                        <div className={css({width:'67px',height:'67px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',bg:'linear-gradient(180deg, #FFCE7B 0%, #FAA755 100%)',transform:'translateY(15px)'})}>
                            <FontAwesomeIcon icon={faUtensils} className={css({fontSize:'24px'})} style={{color:white}}/>
                            <p className={css({fontSize:'14px'})} style={{color:white}}>レシピ</p>
                        </div>
                    </Link>
                </div>
            </footer>
        </>
    )
}