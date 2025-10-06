export type TProduct = {
  name: string;
  type: "Product" | "Service";
  price: number;
  description: string;
  unit?: string;
  business_id: string | number;
};
