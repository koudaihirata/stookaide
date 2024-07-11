import { css } from "../../styled-system/css";


export default function RankingCategories() {
    return(
        <div>
            <div>
                <div></div>
                <h3>余り物のランキング</h3>
                <div></div>
            </div>
            <h4 className={css({fontSize:'16px'})}>１.<span className={css({fontSize:'26px',fontWeight:'bold'})}>キャベツ</span></h4>
        </div>
    )
}