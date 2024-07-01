import { subColor } from "@/style/color";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { css } from "../../styled-system/css";



export default function RankingBtn() {
    return(
        <>
            <p><span>ストッくん</span>の余り物</p>
            <section>
                <h2>キャベツ</h2>
                <Link href="#">
                    <p>もっと詳しくみる</p>
                    <FontAwesomeIcon icon={faCircleChevronRight} style={{color:subColor}} className={css({width:'24px',height:'24px'})}/>
                </Link>
            </section>
        </>
    )
}