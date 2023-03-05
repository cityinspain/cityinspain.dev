import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import client from "@lib/sanityClient";
import { IconBrandGithub, IconGlobe } from "@tabler/icons-react";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

export default function PortfolioProjectCard({ project }) {
  return (
    <div className="block rounded-lg shadow-lg bg-zinc-800 max-w-lg">
      <img
        className="rounded-t-lg mb-4"
        src={
          urlFor(project.mainImage)
            .fit("max")
            .auto("format") as unknown as string
        }
        alt=""
      />
      <div className="p-6 pt-0">
        <Link href={`/portfolio/projects/${project.slug.current}`}>
          <h5 className="text-gray-200 text-xl leading-tight font-medium mb-2">
            {project.title}
          </h5>
        </Link>

        <p className="text-gray-300 text-base mb-4">{project.publishedAt}</p>
        <div className="flex justify-end gap-4">
          {project.projectLink && (
            <Link href={project.projectLink}>
              <IconGlobe></IconGlobe>
            </Link>
          )}

          {project.githubRepo && (
            <Link href={project.githubRepo}>
              <IconBrandGithub></IconBrandGithub>
            </Link>
          )}
        </div>
      </div>
    </div>

    // <Link href={`/portfolio/projects/${project.slug.current}`}>
    //   <div className="flex justify-between py-4 sm:flex-row flex-col">
    //     <div className="flex flex-col">
    //       <h2 className="font-bold text-xl">{project.title}</h2>
    //     </div>
    //     <div>
    //       <p className="text-md text-gray-300 ">{project.publishedAt}</p>
    //     </div>
    //   </div>
    // </Link>
  );
}
