"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { css } from "../../styled-system/css";
import RankingBtn from "@/components/RankingBtn";
import Link from "next/link";
import { white } from "@/style/color";
import Help from "@/components/Help";

const RankingProps = [
  {
    User:"ストッくん",
    query:"の余り物",
    One:"キャベツ",
  },
  {
    User:"ストッくん",
    query:"におすすめな物",
    One:"牛肉",
  },
]
const HelpProps = [
  {
    item: "STOOKAideの使い方",
    link: "#",
  },
  {
    item: "【アンケート】",
    link: "#",
  },
  {
    item: "お問い合わせ",
    link: "#",
  },
]

export default function Home() {
  return (
    <main className={css({position:'relative'})}>
      <div className={css({width:'100%',height:'50vh',background:'linear-gradient(180deg, #FFCE7B 58.71%, #FFF 100%)'})}>
        {RankingProps.map((RankingProp,index) => {
          return<RankingBtn key={index} {...RankingProp}/>
        })}
      </div>
      <section className={css({width:'330px',margin:'50px auto 0'})}>
        <h3 className={css({fontWeight:'bold'})}>キャンペーン・お得情報</h3>
        <Link href="#">
          <div className={css({
            width:'330px',
            height:'116px',
            marginTop:'6px',
            bgImage:'url(/coupon.svg)',
            bgPosition: 'center',
            position:'relative',
          })}>
          </div>
        </Link>
      </section>
      <section className={css({width:'330px',margin:'50px auto 0'})}>
        <h3 className={css({fontWeight:'bold'})}>あなたの地域の余り物</h3>
        <div className={css({width:'100%',display:'flex',justifyContent:'space-between',marginTop:'6px'})}>
          <Link href="#">
            <div className={css({width:'160px',height:'150px',borderRadius:'8px',textAlign:'center',lineHeight:'150px',fontSize:'24px',fontWeight:'bold',bg:'#666'})}>
              <div className={css({width:'100%',height:'100%',bg:'#666/25',borderRadius:'8px'})}>
                <p style={{color:white}}>都道府県</p>
              </div>
            </div>
          </Link>
          <Link href="#">
            <div className={css({width:'160px',height:'150px',borderRadius:'8px',textAlign:'center',lineHeight:'150px',fontSize:'24px',fontWeight:'bold',bg:'#666'})}>
              <div className={css({width:'100%',height:'100%',bg:'#666/25',borderRadius:'8px'})}>
                <p style={{color:white}}>近くの地域</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
      <section className={css({width:'330px',margin:'50px auto 0'})}>
        <h3 className={css({fontWeight:'bold'})}>ヘルプ</h3>
        {HelpProps.map((HelpProp, index) => {
            return<Help key={index} {...HelpProp}/>
        })}
      </section>
    </main>
  );
}