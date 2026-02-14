import { useQuery } from "@tanstack/react-query";
import { VibracaoRelatorioResponse } from "@/types/vibracao";

const API_URL = "/api/get-vibracao";

export const fetchRelatorio = async (idRelatorio: string): Promise<VibracaoRelatorioResponse> => {
  const response = await fetch(`${API_URL}?id_relatorio=${idRelatorio}`);
  
  if (!response.ok) {
    throw new Error(`Erro ao buscar relatório: ${response.status}`);
  }

  const data: VibracaoRelatorioResponse = await response.json();
  if (!data.success) {
    throw new Error("Erro ao buscar relatório: resposta inválida");
  }

  return data;
};

export const useRelatorio = (idRelatorio: string | null) => {
  return useQuery({
    queryKey: ["relatorio", idRelatorio],
    queryFn: () => fetchRelatorio(idRelatorio!),
    enabled: !!idRelatorio,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};
