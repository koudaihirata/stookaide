"use client"

import Image from "next/image";
import { css } from "../../../styled-system/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import { mainColor } from "@/style/color";
import Link from "next/link";

export default function ProfileMain() {
    return(
        <>
            <div className={css({w:'100%',h:'312px',borderBottom:'1px solid rgba(130, 130, 130, 0.25)',position:'relative',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'})}>
                <Link href={'#'} >
                    <FontAwesomeIcon icon={faGears} style={{color:mainColor}} className={css({fontSize:'32px',position:'absolute',top:'14px',right:'20px'})}/>
                </Link>
                <Image src={'/AdobeStock_724935013.jpg'} alt="プロフィール写真" width={100} height={100} className={css({w:'100px',h:'100px',rounded:'50%'})}/>
                <h2 className={css({fontSize:'32px',fontWeight:'bold',mt:'12px'})}>晃大</h2>
                <p className={css({fontSize:'16px',fontWeight:'bold'})}>hiratakoudai61@gmail.com</p>
            </div>
        </>
    )  
}