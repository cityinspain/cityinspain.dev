import PageTitle from "@/components/PageTitle";
import PortfolioProjectCard from "@/components/PortfolioProjectCard";
import Head from "next/head";
import client from "@lib/sanityClient";
import groq from "groq";

export default function PortfolioPage({ projects }) {
  projects = projects.map((project) => {
    const date = new Date(project.publishedAt);
    project.publishedAt = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return project;
  });

  return (
    <>
      <Head>
        <title>portfolio - cityinspain.dev</title>
      </Head>
      <PageTitle>portfolio</PageTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mt-8">
        {projects.map((project) => (
          <PortfolioProjectCard
            project={project}
            key={project.slug.current}
          ></PortfolioProjectCard>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const projects = await client.fetch(
    groq`
    *[_type == "portfolioProject"] | order(publishedAt desc) {
    title,
    slug,
    githubRepo,
    projectLink,
    mainImage,
    publishedAt
    }
          `
  );

  return {
    props: {
      projects,
    },
  };
}
