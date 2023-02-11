import PageTitle from "@/components/PageTitle";
import TextContainer from "@/components/TextContainer";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMail,
} from "@tabler/icons-react";
import Head from "next/head";

export default function ContactPage() {
  const methods = [
    {
      icon: <IconMail></IconMail>,
      label: "salamanca@cityinspain.dev",
      link: "mailto:salamanca@cityinspain.dev",
    },
    {
      icon: <IconBrandGithub></IconBrandGithub>,
      label: "cityinspain",
      link: "https://github.com/cityinspain",
    },
    {
      icon: <IconBrandLinkedin></IconBrandLinkedin>,
      label: "cityinspain",
      link: "https://linkedin.com/in/cityinspain",
    },
  ];

  return (
    <>
      <Head>
        <title>contact - cityinspain.dev</title>
      </Head>
      <PageTitle>contact</PageTitle>
      <TextContainer>
        Find me here: <br />
        {methods.map(({ icon, label, link }) => (
          <div className="flex items-center gap-4" key={link}>
            {icon}
            <a href={link}>{label}</a>
          </div>
        ))}
      </TextContainer>
    </>
  );
}
