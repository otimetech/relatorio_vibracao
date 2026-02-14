import { useQuery } from "@tanstack/react-query";
import { VibracaoRelatorioResponse } from "@/types/vibracao";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
const API_URL = `${API_BASE_URL}/get-vibracao`;

export const fetchRelatorio = async (idRelatorio: string): Promise<VibracaoRelatorioResponse> => {
  const response = await fetch(`${API_URL}?id_relatorio=${idRelatorio}`);
  
  if (!response.ok) {
    throw new Error(`Erro ao buscar relatório: ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const bodyText = await response.text();
    throw new Error(`Resposta inesperada da API: ${bodyText.slice(0, 120)}`);
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
