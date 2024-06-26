"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { css } from "../../styled-system/css";

export default function Home() {
  
  return (
    <div className={css({ fontSize: "2xl", fontWeight: 'bold' })}>Hello 🐼!</div>
  );
}