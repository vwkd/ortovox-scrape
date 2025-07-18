/**
 * Product
 */
export interface Product {
  "@context": "https://schema.org/";
  "@type": "Product";
  additionalType: "";
  brand: {
    "@type": "Thing";
    name: "ORTOVOX Sportartikel GmbH";
  };
  description: string;
  gender: "male" | "female" | "unisex";
  gtin13: string;
  image: string[];
  mainCategoryDE: string;
  mainCategoryEN: string;
  name: string;
  offers: {
    "@context": "https://schema.org/";
    "@type": "Offer";
    availability:
      | "https://schema.org/InStock"
      | "https://schema.org/OutOfStock";
    price: string;
    priceCurrency: "EUR";
    url: string;
  };
  sku: string;
}
