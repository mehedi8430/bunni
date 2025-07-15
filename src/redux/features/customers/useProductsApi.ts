import { productApi } from "@/mockApi/productApi";
import type { TProduct } from "@/types";
import { useEffect, useState } from "react";


export function useProductApi(){
    const [products, setProducts] = useState<TProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch products when component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await productApi.getProducts();
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, isLoading };
}