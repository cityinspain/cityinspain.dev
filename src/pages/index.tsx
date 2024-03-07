/* eslint-disable react/no-unescaped-entities */
import TextContainer from "@/components/TextContainer";
import { Inter } from "@next/font/google";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>cityinspain.dev</title>
      </Head>
      <TextContainer>
        Hello! My name's Olive Salamanca. I'm a full-stack developer from New
        Hampshire.
      </TextContainer>
    </>
  );
}
