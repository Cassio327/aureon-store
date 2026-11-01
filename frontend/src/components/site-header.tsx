import Link from "next/link";

const navigationItems = [
  { label: "New arrivals", href: "/shop?sort=newest" },
  { label: "Suits", href: "/shop?category=suits" },
  { label: "Shirts", href: "/shop?category=shirts" },
  { label: "Accessories", href: "/shop?category=accessories" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href="/" aria-label="Aureon home">
          Aureon
        </Link>

        <nav className="primary-navigation" aria-label="Primary">
          {navigationItems.map((item) => (
            <Link
              className="nav-link"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link
            className="header-action account-link"
            href="/account"
          >
            Account
          </Link>
          <span className="header-divider" aria-hidden="true" />
          <Link className="header-action" href="/cart">
            Cart (0)
          </Link>
        </div>
      </div>
    </header>
  );
}
