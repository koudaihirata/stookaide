import Link from "next/link";
import { css } from "../../styled-system/css";

type HelpProps = {
    item: string,
    link: string,
}

export default function Help(Props:HelpProps) {
    return(
        <Link href={Props.link}>
            <div className={css({width:'330px',height:'40px',bg:'linear-gradient(90deg, #FFCE7B 50.15%, #FFF 100%)',borderRadius:'8px',display:'flex',alignItems:'center',marginTop:'10px'})}>
                <p className={css({marginLeft:'24px'})}>{Props.item}</p>
            </div>
        </Link>
    )
}