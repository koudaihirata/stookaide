import RankingCategories from "@/components/RankingCategories";
import { css } from "../../../styled-system/css";


export default function RankingPage() {
    return(
        <main>
            <h2 className={css({textAlign:'center',fontSize:'24px',fontWeight:'bold',pt:'34px'})}>あなたのランキング</h2>
            <p className={css({fontSize:'14px',textAlign:'center',mt:'20px'})}>あなたが撮ってくれた物の色々なランキングを見てみよう！</p>
            <div>
                <RankingCategories/>
            </div>
        </main>
    )
}