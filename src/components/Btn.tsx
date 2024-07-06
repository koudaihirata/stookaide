import { mainColor, white } from "@/style/color";
import { css } from "../../styled-system/css";

type BtnProps = {
    label: string;
    onClick?: () => void;
};

export default function Btn({ label, onClick }: BtnProps) {
    return(
        <>
            <button className={css({p:'10px 15px',rounded:'8px',fontWeight:'bold'})} style={{backgroundColor:mainColor,color:white}} onClick={onClick}>
                {label}
            </button>
        </>
    )
}