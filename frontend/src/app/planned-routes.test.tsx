import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage from "./about/page";
import AccountPage from "./account/page";
import CartPage from "./cart/page";
import ShopPage from "./shop/page";

describe("planned storefront routes", () => {
  it.each([
    [ShopPage, "The collection is being tailored."],
    [AboutPage, "Our approach is taking shape."],
    [AccountPage, "Your fitting room is coming soon."],
    [CartPage, "The cart is on the cutting table."],
  ])("renders an honest milestone page", (Route, heading) => {
    render(<Route />);

    expect(screen.getByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Return to the homepage" }),
    ).toHaveAttribute("href", "/");
  });
});
