import PageTitle from "@/components/PageTitle";
import TextContainer from "@/components/TextContainer";
import client from "@lib/sanityClient";
import { PortableText } from "@portabletext/react";
import groq from "groq";

export default function AboutPage({ about }) {
  return (
    <>
      <PageTitle>about me</PageTitle>
      <TextContainer>
        <PortableText value={about[0].content}></PortableText>
      </TextContainer>
    </>
  );
}

export async function getStaticProps() {
  const about = await client.fetch(
    groq`
            *[_type == "about"] {
                content
            }
            `
  );

  return {
    props: {
      about,
    },
  };
}
