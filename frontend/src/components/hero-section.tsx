import Image from "next/image";
import Link from "next/link";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <p className="hero-eyebrow">Fictional product study</p>
        <h1 id="hero-heading">Tailored for the moments that matter.</h1>
        <p className="hero-description">
          Modern formalwear, considered down to the last detail.
        </p>

        <div className="hero-actions">
          <Link className="primary-cta" href="/shop">
            Explore the collection
            <ArrowIcon />
          </Link>
          <Link className="text-link" href="/about">
            Discover our approach
            <ArrowIcon />
          </Link>
        </div>
      </div>

      <figure className="hero-media">
        <Image
          alt="Editorial illustration of a figure wearing a charcoal Aureon suit"
          fill
          preload
          sizes="(max-width: 840px) 100vw, 52vw"
          src="/images/aureon-tailoring.svg"
          unoptimized
        />
      </figure>
    </section>
  );
}
