import { API_URL } from "@/constants/api";
import { Model } from "@/models/Model";
import { useCallback, useState } from "react";

interface ModelResponse {
  modelos: Model[];
  anos: any[];
}

export const useModels = (brandId: string | undefined) => {
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchModels = useCallback(async () => {
    if (!brandId) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/carros/marcas/${brandId}/modelos`);
      const data: ModelResponse = await response.json();
      setModels(data.modelos);
    } catch (error) {
      console.error("Erro ao buscar modelos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [brandId]);

  return {
    models,
    isLoading,
    fetchModels,
  };
}
