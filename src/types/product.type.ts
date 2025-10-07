export type TProduct = {
  // id?: string | number;
  name: string;
  type: "Product" | "Service";
  price: number;
  description: string;
  unit?: string;
  business_id: string | number;
};
