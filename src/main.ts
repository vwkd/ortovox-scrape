import { get } from "./get.ts";
import { parse } from "./parse.ts";
import { render } from "./render.ts";
import type { Product } from "./types.ts";

const [INPUT_PATH, OUTPUT_PATH] = Deno.args;

if (!INPUT_PATH) {
  throw new Error("Missing path to input file");
} else if (!OUTPUT_PATH) {
  throw new Error("Missing path to output file");
}

const urlsString = await Deno.readTextFile(INPUT_PATH);
const urls = urlsString.split("\n").filter((url) => url.trim() !== "");

const products: Product[] = [];

for (const url of urls) {
  const html = await get(url);

  const product = parse(html);

  products.push(product);
}

const productsByCategory = products.reduce((acc, product) => {
  const category = product.mainCategoryDE;

  if (!acc[category]) {
    acc[category] = [];
  }

  acc[category].push(product);

  return acc;
}, {} as Record<string, Product[]>);

const md = render(productsByCategory);

await Deno.writeTextFile(OUTPUT_PATH, md);
