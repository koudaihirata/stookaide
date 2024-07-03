"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { css } from "../../styled-system/css";
import RankingBtn from "@/components/RankingBtn";

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

export default function Home() {
  return (
    <main className={css({width:'100%',height:'50vh',background:'linear-gradient(180deg, #FFCE7B 58.71%, #FFF 100%)',position:'relative'})}>
      {RankingProps.map((RankingProp,index) => {
        return<RankingBtn key={index} {...RankingProp}/>
      })}
      <section>
        <h3>キャンペーン・お得情報</h3>
        <div className={css({width:'330px',height:'116px',background:'url()'})}>

        </div>
      </section>
    </main>
  );
}