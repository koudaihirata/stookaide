import RankingCategories from "@/components/RankingCategories";
import { css } from "../../../styled-system/css";

const RCategories = [
    {
        title:"余り物のランキング"
    },
    {
        title:"買う時におすすめ"
    },
]

export default function RankingPage() {
    return(
        <main>
            <h2 className={css({textAlign:'center',fontSize:'24px',fontWeight:'bold',pt:'34px'})}>あなたのランキング</h2>
            <p className={css({fontSize:'14px',textAlign:'center',mt:'20px'})}>あなたが撮ってくれた物の色々なランキングを見てみよう！</p>
            <div>
                {RCategories.map((RCategory,index) => {
                    return<RankingCategories key={index} {...RCategory}/>
                })}
            </div>
        </main>
    )
}