/* eslint-disable @next/next/no-img-element */
import client from "@lib/sanityClient";
import groq from "groq";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import TextContainer from "@/components/TextContainer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Head from "next/head";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import { IconBrandGithub, IconGlobe } from "@tabler/icons-react";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const ptComponents = {
  block: {
    h1: (props) => <h1 className="text-3xl font-mono font-black" {...props} />,
    h2: (props) => (
      <h2 className="text-2xl font-mono font-black py-2" {...props} />
    ),
    h3: (props) => (
      <h2 className="text-2xl font-mono font-black py-2" {...props} />
    ),
    normal: (props) => (
      <p className="text-lg font-mono py-4 leading-8" {...props} />
    ),
  },
  list: {
    bullet: (props) => (
      <ul
        className="list-disc px-4 font-mono leading-7 text-lg space-y-4"
        {...props}
      />
    ),
  },
  types: {
    code: (props) => (
      <SyntaxHighlighter language={props.value.language} style={dracula}>
        {props.value.code}
      </SyntaxHighlighter>
      //   <pre data-language={props.language}>
      //     <code>{props.value.code}</code>
      //   </pre>
    ),
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        <img
          alt={value.alt || " "}
          loading="lazy"
          // eslint-disable-next-line @next/next/no-img-element
          src={urlFor(value).fit("max").auto("format") as unknown as string}
        />
      );
    },
  },
  marks: {
    link: (props) => {
      const target = (props.value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <Link
          href={props.value?.href || ""}
          target={target}
          className="underline"
        >
          {props.children}
        </Link>
      );
    },
  },
};

const Project = ({ project }) => {
  return (
    <>
      <Head>
        <title>{project?.title}</title>
      </Head>
      {project && (
        <article className="py-8">
          <h1 className="text-3xl font-mono font-black pb-4">
            {project?.title}
          </h1>

          <img
            src={
              urlFor(project.mainImage)
                .fit("max")
                .auto("format") as unknown as string
            }
            alt=""
          />
          <div className="flex gap-4 pt-6">
            {project.githubRepo && (
              <Link href={project.githubRepo}>
                <div className="flex items-center gap-4">
                  <IconBrandGithub height={38} width={38}></IconBrandGithub>
                  <div className="text-2xl">github repo</div>
                </div>
              </Link>
            )}
            {project.projectLink && (
              <Link href={project.projectLink}>
                <div className="flex items-center gap-4">
                  <IconGlobe height={38} width={38}></IconGlobe>
                  <div className="text-2xl">site</div>
                </div>
              </Link>
            )}
          </div>

          {project?.body && (
            <PortableText value={project.body} components={ptComponents} />
          )}
        </article>
      )}
    </>
  );
};

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "portfolioProject" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: string | undefined) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context: {
  params: { slug?: "" | undefined };
}) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  const project = await client.fetch(
    groq`
      *[_type == "portfolioProject" && slug.current == $slug][0]
    `,
    { slug }
  );

  return {
    props: {
      project,
    },
  };
}

export default Project;
