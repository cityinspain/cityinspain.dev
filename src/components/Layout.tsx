import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const links = [
    {
      href: "/about",
      label: "about",
    },
    {
      href: "/contact",
      label: "contact",
    },
    {
      href: "/blog",
      label: "blog",
    },
    {
      href: "/portfolio",
      label: "portfolio",
    },
  ];

  return (
    <>
      <div className="max-w-screen md:max-w-3xl md:m-auto py-4 divide-gray-600 divide-y ">
        <div className="pb-2 sm:px-0 px-4">
          <Link href="/">
            <h1 className="font-mono text-3xl font-bold pb-2">
              cityinspain.dev
            </h1>
          </Link>
          <div className="flex font-mono gap-4 py-2 text-xl pb-4">
            {links.map(({ href, label }) => (
              <Link
                href={href}
                key={href}
                className={
                  router.asPath === href ? "font-extrabold underline" : ""
                }
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="pt-4 md:px-0 px-4">{children}</div>
      </div>
    </>
  );
}
