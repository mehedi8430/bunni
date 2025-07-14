// components/ProductDetails.tsx
import { useEffect, useState } from "react";
import { productApi, type Product } from "@/mockApi/productApi";

interface ProductDetailsProps {
  productId: string;
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const data = await productApi.getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Product Details</h2>
      <p>
        <strong>Name:</strong> {product.name}
      </p>
      <p>
        <strong>Type:</strong> {product.type}
      </p>
      <p>
        <strong>Unit:</strong> {product.unit}
      </p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>
    </div>
  );
}
