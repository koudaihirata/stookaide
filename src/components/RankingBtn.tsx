import { subColor, white } from "@/style/color";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { css } from "../../styled-system/css";

type RankingProps = {
    User:string,
    query:string,
    One:string,
}

export default function RankingBtn(props:RankingProps) {
    return(
        <>
            <p style={{color:white}} className={css({width:'330px',margin:'0 auto',paddingTop:'22px'})}><span className={css({fontSize:'20px'})}>{props.User}</span>{props.query}</p>
            <section className={css({width:'330px',height:'120px',margin:'0 auto',border:'3px solid #FAA755',borderRadius:'8px',background:'white'})}>
                <h2 className={css({width:'100%',height:'70%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',fontWeight:'bold'})}>{props.One}</h2>
                <Link href="#" className={css({display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',height:'30%',borderTop:'2px solid #FAA755'})}>
                    <p className={css({paddingLeft:'14px'})}>もっと詳しくみる</p>
                    <FontAwesomeIcon icon={faCircleChevronRight} style={{color:subColor}} className={css({width:'24px',height:'24px',paddingRight:'14px'})}/>
                </Link>
            </section>
        </>
    )
}