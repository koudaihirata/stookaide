"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { css } from "../../styled-system/css";
import RankingBtn from "@/components/RankingBtn";

export default function Home() {
  return (
    <main className={css({width:'100%',height:'50vh',background:'linear-gradient(180deg, #FFCE7B 58.71%, #FFF 100%)'})}>
      <RankingBtn/>
      <RankingBtn/>
      </main>
  );
}