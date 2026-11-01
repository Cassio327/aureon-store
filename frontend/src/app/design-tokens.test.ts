import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

function readColor(variable: string): string {
  const match = css.match(new RegExp(`${variable}:\\s*(#[0-9a-fA-F]{6})`));

  if (!match?.[1]) throw new Error(`Missing color token: ${variable}`);
  return match[1];
}

function luminance(hex: string): number {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    ?.map((channel) => Number.parseInt(channel, 16) / 255);

  if (!channels) throw new Error(`Invalid color: ${hex}`);

  const [red, green, blue] = channels.map((channel) =>
    channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4,
  );

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(first: string, second: string): number {
  const lighter = Math.max(luminance(first), luminance(second));
  const darker = Math.min(luminance(first), luminance(second));
  return (lighter + 0.05) / (darker + 0.05);
}

describe("storefront color tokens", () => {
  it("keeps primary call-to-action text at WCAG AA contrast", () => {
    const gold = readColor("--color-gold");

    expect(contrast("#fffdf7", gold)).toBeGreaterThanOrEqual(4.5);
  });
});
