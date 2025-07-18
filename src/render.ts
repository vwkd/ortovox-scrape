import type { Product } from "./types.ts";

const BASE_URL = "https://www.ortovox.com";

/**
 * Create product markdown
 *
 * @param productsByCategory products grouped by category
 * @returns markdown string
 */
export function render(productsByCategory: Record<string, Product[]>): string {
  let res = "# Produkte\n\n";

  for (const category in productsByCategory) {
    res += `## ${category}\n\n`;

    const products = productsByCategory[category];

    for (const product of products) {
      res += `### ${product.name.trim()}\n\n`;
      res += `![](${product.image[0]})\n\n`;
      res += `- link: ${BASE_URL}${product.offers.url}\n`;
      res += `- gender: ${product.gender}\n`;
      res += `- gtin13: ${product.gtin13}\n`;
      res += `- sku: ${product.sku}\n`;
      res += `- price: ${product.offers.price}€\n\n`;
      res += `${product.description.replaceAll("&nbsp;", " ")}\n`;
    }
  }

  return res;
}
