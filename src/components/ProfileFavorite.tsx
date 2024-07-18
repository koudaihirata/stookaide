import Image from "next/image";
import { css } from "../../styled-system/css";
import { mainColor } from "@/style/color";


export default function ProfileFavorite() {
    return(
        <>
            <section>
                <h3 className={css({textAlign:'center',fontWeight:'bold',mt:'18px'})}>お気に入りレシピ</h3>
                <div className={css({display:'flex',overflowX:'scroll',whiteSpace:'nowrap',mt:'8px'})}>
                    <div className={css({w:'110px',h:'120px',display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'column',m:'0 12px'})}>
                        <div className={css({w:'80px',h:'80px',rounded:'50px',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0px 0px 4px 0px rgba(0, 0, 0, 0.25)'})} style={{backgroundColor:mainColor}}>
                            <Image src={'/AdobeStock_724935013.jpg'} alt="レシピのトップ画" width={70} height={70} className={css({w:'70px',h:'70px',rounded:'50%'})}/>
                        </div>
                        <p className={css({fontWeight:'bold'})}>二郎ラーメン</p>
                    </div>
                    <div className={css({w:'110px',h:'120px',display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'column',m:'0 12px'})}>
                        <div className={css({w:'80px',h:'80px',rounded:'50px',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0px 0px 4px 0px rgba(0, 0, 0, 0.25)'})} style={{backgroundColor:mainColor}}>
                            <Image src={'/AdobeStock_724935013.jpg'} alt="レシピのトップ画" width={70} height={70} className={css({w:'70px',h:'70px',rounded:'50%'})}/>
                        </div>
                        <p className={css({fontWeight:'bold'})}>二郎ラーメン</p>
                    </div>
                    <div className={css({w:'110px',h:'120px',display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'column',m:'0 12px'})}>
                        <div className={css({w:'80px',h:'80px',rounded:'50px',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0px 0px 4px 0px rgba(0, 0, 0, 0.25)'})} style={{backgroundColor:mainColor}}>
                            <Image src={'/AdobeStock_724935013.jpg'} alt="レシピのトップ画" width={70} height={70} className={css({w:'70px',h:'70px',rounded:'50%'})}/>
                        </div>
                        <p className={css({fontWeight:'bold'})}>二郎ラーメン</p>
                    </div>
                    <div className={css({w:'110px',h:'120px',display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'column',m:'0 12px'})}>
                        <div className={css({w:'80px',h:'80px',rounded:'50px',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0px 0px 4px 0px rgba(0, 0, 0, 0.25)'})} style={{backgroundColor:mainColor}}>
                            <Image src={'/AdobeStock_724935013.jpg'} alt="レシピのトップ画" width={70} height={70} className={css({w:'70px',h:'70px',rounded:'50%'})}/>
                        </div>
                        <p className={css({fontWeight:'bold'})}>二郎ラーメン</p>
                    </div>
                    <div className={css({w:'110px',h:'120px',display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'column',m:'0 12px'})}>
                        <div className={css({w:'80px',h:'80px',rounded:'50px',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0px 0px 4px 0px rgba(0, 0, 0, 0.25)'})} style={{backgroundColor:mainColor}}>
                            <Image src={'/AdobeStock_724935013.jpg'} alt="レシピのトップ画" width={70} height={70} className={css({w:'70px',h:'70px',rounded:'50%'})}/>
                        </div>
                        <p className={css({fontWeight:'bold'})}>二郎ラーメン</p>
                    </div>
                </div>
            </section>
        </>
    )
}