import { DOMParser } from "@b-fuze/deno-dom";
import type { Product } from "./types.ts";

/**
 * Parse product from page
 *
 * @param html HTML of page
 * @returns product
 */
export function parse(html: string): Product {
  const document = new DOMParser().parseFromString(html, "text/html");

  const scripts = document.querySelectorAll(
    `script[type="application/ld+json"]`,
  );

  const jsons = Array.from(scripts).map((script) =>
    JSON.parse(script.textContent)
  );

  const product: Product | undefined = jsons.find((json) =>
    json["@type"] === "Product"
  );

  if (!product) {
    throw new Error("No product data found in the HTML.");
  }

  return product;
}
