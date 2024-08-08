import { mainColor, white } from "@/style/color";
import { css } from "../../styled-system/css";


export default function RecommendationR() {
    return(
        <div>
            <div className={css({w:'100%',h:'30vh',borderTop:'10px solid #FFCE7B',position:'relative',mt:'70px',bg:'rgba(255,206,123,.3)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'20px'})}>
                <div className={css({w:'100%',display:'flex',alignItems:'center',justifyContent:'center',position:'absolute',top:'-40px'})}>
                    <div className={css({w:'65px',h:'65px',rounded:'50%',transform:'translateX(20px)',bg:'#FAF355'})}></div>
                    <h3 className={css({w:'230px',h:'40px',textAlign:'center',lineHeight:'40px',fontWeight:'bold'})} style={{backgroundColor:mainColor,color:white}}>余り物のランキング</h3>
                    <div className={css({w:'65px',h:'65px',rounded:'50%',transform:'translateX(-20px)',bg:'#58FA55'})}></div>
                </div>
                <h4 className={css({fontSize:'18px',fontWeight:'bold'})}>
                    １.<span className={css({fontSize:'26px',fontWeight:'bold'})}>牛肉</span>
                </h4>
                <div className={css({w:'100%',display:'flex',alignItems:'center',justifyContent:'space-around'})}>
                    <p className={css({fontSize:'18px',fontWeight:'bold'})}>２.<span className={css({fontSize:'20px',fontWeight:'bold'})}>ハム</span></p>
                    <p className={css({fontSize:'18px',fontWeight:'bold'})}>４.<span className={css({fontSize:'20px',fontWeight:'bold'})}>ジャガイモ</span></p>
                </div>
                <div className={css({w:'100%',display:'flex',alignItems:'center',justifyContent:'space-around'})}>
                    <p className={css({fontSize:'18px',fontWeight:'bold'})}>３.<span className={css({fontSize:'20px',fontWeight:'bold'})}>ひき肉</span></p>
                    <p className={css({fontSize:'18px',fontWeight:'bold'})}>５.<span className={css({fontSize:'20px',fontWeight:'bold'})}>ほうれん草</span></p>
                </div>
            </div>
            <p className={css({fontSize:'14px',textAlign:'center',mt:'10px',color:'#555'})}>今まで読み取った食材から<br/>あなたにおすすめの食材を表示しています</p>
        </div>
    )
}