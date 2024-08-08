import RecommendationR from "@/components/RecommendationR";
import { css } from "../../../styled-system/css";
import LeftoversR from "@/components/LeftoversR";

export default function RankingPage() {
    return(
        <main>
            <h2 className={css({textAlign:'center',fontSize:'24px',fontWeight:'bold',pt:'34px'})}>あなたのランキング</h2>
            <p className={css({fontSize:'14px',textAlign:'center',mt:'20px'})}>あなたが撮ってくれた物の<br/>色々なランキングを見てみよう！</p>
            <LeftoversR/>
            <RecommendationR/>
            <p className={css({fontSize:'14px',textAlign:'center',mt:'40px',color:'#8F8F8F'})}>今後のアップデートでランキングが増える予定です<br/>お楽しみに！！</p>
        </main>
    )
}