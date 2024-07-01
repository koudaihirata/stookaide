"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { css } from "../../styled-system/css";
import RankingBtn from "@/components/RankingBtn";

export default function Home() {
  return (
    <main>
      <RankingBtn/>
    </main>
  );
}