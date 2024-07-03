import Link from "next/link";
import { css } from "../../styled-system/css";

const moveUpAndDown = keyframes({
    '0%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-20px)' },
    '100%': { transform: 'translateY(0)' }
});

export default function Coupon() {
    return(
        <>
        <section className={css({width:'330px',margin:'75px auto 0'})}>
            <h3>キャンペーン・お得情報</h3>
            <Link href="#">
                <div className={css({
                    width:'330px',
                    height:'116px',
                    bgImage:'url(/coupon.svg)',
                    bgPosition: 'center',
                    position:'relative',
                    _before: {
                        content:'""',
                        position:'absolute',
                        width:'54px',
                        height:'54px',
                        bgImage:'url(/BlueCircle.svg)',
                        bgPosition: 'center',
                        zIndex:'-1',
                    }
                })}>

            </div>
            </Link>
        </section>

        </>
    )
}