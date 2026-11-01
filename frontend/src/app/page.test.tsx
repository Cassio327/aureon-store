import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Page from "./page";

describe("Aureon home page", () => {
  it("renders_primary_navigation", () => {
    render(<Page />);

    const navigation = screen.getByRole("navigation", { name: "Primary" });

    expect(navigation).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Suits" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Shirts" })).toBeInTheDocument();
  });

  it("introduces_the_formalwear_collection", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Tailored for the moments that matter.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Fictional product study")).toBeInTheDocument();
  });

  it("offers_a_collection_call_to_action", () => {
    render(<Page />);

    expect(
      screen.getByRole("link", { name: "Explore the collection" }),
    ).toHaveAttribute("href", "/shop");
  });
});
