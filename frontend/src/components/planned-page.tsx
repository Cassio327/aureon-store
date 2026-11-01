import Link from "next/link";

import { SiteHeader } from "./site-header";

type PlannedPageProps = {
  description: string;
  eyebrow: string;
  title: string;
};

export function PlannedPage({
  description,
  eyebrow,
  title,
}: PlannedPageProps) {
  return (
    <>
      <SiteHeader />
      <main className="planned-page">
        <p className="planned-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <Link className="planned-return" href="/">
          Return to the homepage
        </Link>
      </main>
    </>
  );
}
