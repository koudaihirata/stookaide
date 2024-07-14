import { redColor } from "@/style/color";
import { css } from "../../../../styled-system/css";



export default function SignUp() {
    return(
        <main>
            <div className={css({w:'80%',m:'0 auto'})}>
                <h1 className={css({fontSize:'22px',fontWeight:'bold'})}>新規登録</h1>
            </div>
            <div className={css({w:'100%',h:'1px',bg:'rgba(0, 0, 0, 0.25)',mt:'20px'})}></div>
            <form className={css({w:'80%',m:'0 auto'})}>
                <div className={css({w:'100%',mt:'22px'})}>
                    <label htmlFor="user" className={css({fontSize:'12px'})}>ユーザー名<span className={css({fontSize:'10px',ml:'10px'})} style={{color:redColor}}>必須</span></label>
                    <input type="text" name="user" id="user" className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px',fontSize:'12px'})} placeholder="ユーザー名"/>
                </div>
                <div className={css({w:'100%',mt:'22px'})}>
                    <label htmlFor="em" className={css({fontSize:'12px'})}>メールアドレス<span className={css({fontSize:'10px',ml:'10px'})} style={{color:redColor}}>必須</span></label>
                    <input type="text" name="em" id="em" className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px',fontSize:'12px'})} placeholder="xxxxx@stook.com"/>
                </div>
                <div className={css({w:'100%',mt:'22px'})}>
                    <label htmlFor="ps" className={css({fontSize:'12px'})}>パスワード<span className={css({fontSize:'10px',ml:'10px'})} style={{color:redColor}}>必須</span></label>
                    <input type="password" name="ps" id="ps" className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px',fontSize:'12px'})} placeholder="パスワードを入力してください"/>
                    <ul className={css({listStyle:'circle',ml:'1.2rem'})}>
                        <li>
                            <p className={css({fontSize:'12px'})}>8文字以上20文字以内で入力してください</p>
                        </li>
                        <li>
                            <p className={css({fontSize:'12px'})}>半角英字と半角数字を含めてください</p>
                        </li>
                    </ul>
                </div>
                <div className={css({w:'100%',mt:'22px'})}>
                    <label htmlFor="reps" className={css({fontSize:'12px'})}>パスワード（確認）<span className={css({fontSize:'10px',ml:'10px'})} style={{color:redColor}}>必須</span></label>
                    <input type="password" name="reps" id="reps" className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px',fontSize:'12px'})} placeholder="パスワードを入力してください"/>
                </div>
                <div className={css({w:'100%',mt:'22px'})}>
                    <label htmlFor="post" className={css({fontSize:'12px'})}>郵便番号<span className={css({fontSize:'10px',ml:'10px'})} style={{color:redColor}}>必須</span></label>
                    <input type="text" name="post" id="post" className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px',fontSize:'12px'})} placeholder="例）5550001"/>
                </div>
                <div className={css({w:'100%',mt:'22px'})}>
                    <label htmlFor="birth" className={css({fontSize:'12px'})}>生年月日</label>
                    <input type="text" name="birth" id="birth" className={css({w:'100%',h:'44px',border:'1px solid #3e3e3e',rounded:'8px',pl:'12px',fontSize:'12px'})} placeholder="例）2002-06-01"/>
                </div>
                <div className={css({w:'100%',mt:'22px'})}>
                    <p className={css({fontSize:'12px'})}>性別</p>
                    <div className={css({display:'flex',alignItems:'center',gap:'12px',mt:'6px'})}>
                        <label htmlFor="gen-male" className={css({ fontSize: '12px',display:'flex',alignItems:'center'})}>
                            <input type="radio" name="gen" id="gen-male" value="男" />
                            男性
                        </label>
                        <label htmlFor="gen-female" className={css({ fontSize: '12px', marginLeft: '10px',display:'flex',alignItems:'center'})}>
                            <input type="radio" name="gen" id="gen-female" value="女" />
                            女性
                        </label>
                        <label htmlFor="gen-oth" className={css({ fontSize: '12px', marginLeft: '10px',display:'flex',alignItems:'center'})}>
                            <input type="radio" name="gen" id="gen-oth" value="その他" />
                            その他
                        </label>
                    </div>
                    <p className={css({fontSize:'12px',color:'#8F8F8F',mt:'8px'})}>性別をご登録いただきますと、あなたにおすすめの商品をご提案いたします。</p>
                </div>
                <div className={css({w:'100%',h:'1px',bg:'#D0D0D0',mt:'22px'})}></div>
            </form>
        </main>
    )
}