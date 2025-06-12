import { API_URL } from "@/constants/api";
import { Brand } from "@/models/Brand";
import { useCallback, useState } from "react";

export const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchBrands = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/carros/marcas`);
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error("Erro ao buscar marcas:", error);
    }
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetchBrands();
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchBrands]);

  return {
    brands,
    isLoading,
    loadData
  };
}