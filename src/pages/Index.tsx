import { useParams, useSearchParams } from "react-router-dom";
import ReportHeader from "@/components/ReportHeader";
import ReportFooter from "@/components/ReportFooter";
import PaginatedEquipmentTable from "@/components/PaginatedEquipmentTable";
import VibrationAlarmCriticalTable from "@/components/VibrationAlarmCriticalTable";
import StatusChart from "@/components/StatusChart";
import { VibrationPrinciplesPage1, VibrationPrinciplesPage1b, VibrationPrinciplesPage2 } from "@/components/VibrationPrinciples";
import SeverityTable from "@/components/SeverityTable";
import AccelerationReference from "@/components/AccelerationReference";
import VibrationOperationalReport from "@/components/VibrationOperationalReport";
import { useRelatorio } from "@/hooks/useRelatorio";
import { StatusType } from "@/types/relatorio";
import { mapVibracaoStatusToStatusType, VibracaoItem } from "@/types/vibracao";

const Index = () => {
  const { idRelatorio: paramId } = useParams<{
    idRelatorio?: string;
  }>();
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get("idRelatorio");

  // Suporta tanto /relatorio/:id quanto /?idRelatorio=id
  const idRelatorio = paramId || queryId;
  const {
    data,
    isLoading,
    error
  } = useRelatorio(idRelatorio);
  const handlePrint = () => {
    window.print();
  };
  if (!idRelatorio) {
    return <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-primary mb-4">Relatório de Vibração</h1>
          <p className="text-muted-foreground mb-6">
            Informe o ID do relatório na URL para visualizar os dados.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 text-sm font-mono">
            <p>/relatorio/8</p>
            <p className="text-muted-foreground mt-2">ou</p>
            <p>/?idRelatorio=8</p>
          </div>
        </div>
      </div>;
  }
  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando relatório...</p>
        </div>
      </div>;
  }
  if (error) {
    return <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-destructive text-5xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-destructive mb-2">Erro ao carregar relatório</h1>
          <p className="text-muted-foreground">{(error as Error).message}</p>
        </div>
      </div>;
  }
  if (!data) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Nenhum dado encontrado.</p>
      </div>;
  }
  const {
    relatorio
  } = data;

  // Usar cliente do response ou do relatorio
  const clienteData = relatorio.cliente;
  // Usar usuario do response ou do relatorio
  const usuarioData = relatorio.usuario;
  // Usar aprovador do response ou do relatorio
  const aprovadorData = relatorio.aprovador;

  const getVibracaoStatus = (item: VibracaoItem): StatusType => {
    // Priorizar st3 se existir
    if (item.st3) {
      return mapVibracaoStatusToStatusType(item.st3);
    }
    if (item.status) {
      return mapVibracaoStatusToStatusType(item.status);
    }
    const diagnostico = (item.diagnostico || "").toLowerCase();
    if (diagnostico.includes("fora de operação") || diagnostico.includes("fora de operacao")) {
      return "off";
    }
    if (item.diagnostico || item.recomendacao) {
      return "alert";
    }
    return "normal";
  };

  // Filtrar vibracoes com problemas (apenas A1 e A2, ou seja alert e critical)
  const criticalEquipment = relatorio.vibracoes
    .filter((v) => {
      const status = getVibracaoStatus(v);
      return status === "alert" || status === "critical";
    })
    .map((v, index) => ({
      id: index + 1,
      area: v.area || v.equipamento?.area || "",
      local: v.local,
      conjunto: v.conjunto,
      st3: v.st3 || "",
      data_exe: v.data_exe || relatorio.dataExe,
      diagnostico: v.diagnostico || "",
      recomendacao: v.recomendacao || "",
      status: getVibracaoStatus(v),
      observation: `VIDE R.O. ${String(index + 1).padStart(2, "0")}`
    }));

  // Todos os equipamentos
  const allEquipment = relatorio.vibracoes.map((v, index) => ({
    id: index + 1,
    area: v.area || v.equipamento?.area || "",
    local: v.local || "",
    conjunto: v.conjunto || "",
    st3: v.st3 || "",
    data: v.data_exe || relatorio.dataExe || "",
    diagnostico: v.diagnostico || "",
    recomendacao: v.recomendacao || ""
  }));


  // Calcular estatísticas de status
  const statusCounts = relatorio.vibracoes.reduce((acc, v) => {
    const status = getVibracaoStatus(v);
    if (status === "normal") acc.normal++;else if (status === "alert") acc.alert++;else if (status === "critical") acc.critical++;else if (status === "maintenance") acc.maintenance++;else if (status === "off") acc.off++;
    return acc;
  }, {
    normal: 0,
    alert: 0,
    critical: 0,
    maintenance: 0,
    off: 0
  });
  const total = relatorio.vibracoes.length || 1;
  const statusData = [{
    label: "NORMAIS",
    value: Math.round(statusCounts.normal / total * 100),
    color: "bg-success"
  }, {
    label: "EM MANUTENÇÃO",
    value: Math.round(statusCounts.maintenance / total * 100),
    color: "bg-muted-foreground"
  }, {
    label: "DESLIGADOS",
    value: Math.round(statusCounts.off / total * 100),
    color: "bg-border"
  }, {
    label: "ALARME",
    value: Math.round(statusCounts.alert / total * 100),
    color: "bg-warning"
  }, {
    label: "CRÍTICO",
    value: Math.round(statusCounts.critical / total * 100),
    color: "bg-destructive"
  }];

  const hasOperationalSt3 = (item: VibracaoItem) => {
    const st3 = (item.st3 || "").trim().toUpperCase();
    return st3 === "A1" || st3 === "A2";
  };

  // Vibracoes com dados para relatorio operacional (apenas A1/A2)
  const operationalReports = relatorio.vibracoes.filter(hasOperationalSt3);

  // Formatar data
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR");
  };

  // Formatar data como mês/ano
  const formatMonthYear = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }).replace(/de /g, "");
  };
  return <div className="min-h-screen bg-background py-8 px-4 print:p-0 print:bg-white">
      {/* Print Button */}
      <div className="no-print fixed top-4 right-4 z-50">
        <button onClick={handlePrint} className="bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg hover:opacity-90 transition-opacity flex items-center gap-2 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          Imprimir A4
        </button>
      </div>

      <div className="a4-container">
        
        {/* Cover Page */}
        <div className="report-page print-break flex flex-col text-center">
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <img src="/logo-jundpred.jpg" alt="JundPred - Manutenção Preditiva" className="cover-logo h-8 w-auto" />
              <img src="/logo_brasil.jpg" alt="Logo Brasil" className="cover-logo h-8 w-auto" />
            </div>

            <div className="bg-primary text-primary-foreground py-4 px-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold">RELATÓRIO DE MANUTENÇÃO PREDITIVA</h2>
              <p className="text-lg mt-2">REF. INSPEÇÃO ANÁLISE DE VIBRAÇÃO</p>
              <p className="text-sm mt-2 opacity-80">Nº {relatorio.n_relatorio}</p>
            </div>

            <div className="mb-8 flex justify-center items-center">
              <img src="/vibracao-cover.jpg" alt="Imagem de Análise de Vibração" className="cover-image rounded-lg" style={{ width: "320px", height: "240px", objectFit: "cover" }} />
            </div>

            {clienteData?.logo && <div className="mb-8">
              <img src={clienteData.logo} alt={clienteData.nome} className="cover-logo h-20 w-auto mx-auto" />
            </div>}

            {clienteData && <div className="bg-secondary/30 rounded-lg p-4 mb-6 text-center">
                <h3 className="font-semibold text-primary mb-2">Cliente / Unidade</h3>
                <p className="font-bold text-lg">{clienteData.nome} - {clienteData.cidade}/{clienteData.estado}</p>
                
              </div>}

            <div className="grid grid-cols-1 gap-8 text-center max-w-lg mx-auto">
              <div>
                <p className="text-muted-foreground text-sm">Mês de Referência</p>
                <p className="font-semibold">{formatMonthYear(relatorio.dataExe)}</p>
              </div>
              
            </div>
          </div>

          <ReportFooter />
        </div>

        {/* Letter Page */}
        <div className="report-page print-break flex flex-col">
          <div className="flex-1">
          <ReportHeader />
          
          <div className="text-right text-sm text-muted-foreground mb-8">
            Jundiaí, {formatDate(relatorio.dataExe)}.
          </div>

          <div className="mb-8">
            <p className="text-sm text-muted-foreground">A/C:</p>
            <p className="font-semibold">{clienteData?.pessoa_contato || "Departamento de Manutenção"}</p>
            {clienteData?.departamento_contato && <p className="text-sm text-muted-foreground">{clienteData.departamento_contato}</p>}
            {clienteData && <div className="mt-2 text-sm">
                <p className="font-medium">{clienteData.nome}</p>
                <p className="text-muted-foreground">{clienteData.email}</p>
                <p className="text-muted-foreground">{clienteData.telefone}</p>
              </div>}
          </div>

          <div className="mb-8">
            
            <p className="text-foreground leading-relaxed">Referente à inspeção de análise de vibração nos equipamentos rotativos na data de <strong>{formatDate(relatorio.dataExe)}</strong>.
              <br />
              Relatório Nº <strong>{relatorio.n_relatorio}</strong>.
            </p>
          </div>

          <div className="mb-8">
            <p className="mb-4">Atenciosamente,</p>
            <div className="border-l-4 border-primary pl-4">
              <p className="font-semibold">Luís Henrique Guimarães Stefani</p>
              <p className="text-muted-foreground text-sm">Diretor Comercial</p>
              <p className="text-sm mt-2">luis@jundpred.com.br</p>
              <p className="text-sm">Tel.: (11) 2817-0616</p>
              <p className="text-sm">Cel: (11) 98112-2244</p>
            </div>
          </div>
          </div>
          <ReportFooter />
        </div>

        {/* Vibration Principles Page 1 */}
        <VibrationPrinciplesPage1 />

        {/* Vibration Principles Page 1b */}
        <VibrationPrinciplesPage1b />

        {/* Vibration Principles Page 2 */}
        <VibrationPrinciplesPage2 />

        {/* Severity Table Page */}
        <SeverityTable />

        {/* Acceleration Reference Page */}
        <AccelerationReference />

        {/* Critical Equipment List */}
        {criticalEquipment.length > 0 && <div className="report-page print-break flex flex-col">
            <div className="flex-1">
              <ReportHeader />
              <VibrationAlarmCriticalTable title="RESUMO DOS EQUIPAMENTOS EM ALARME / CRÍTICOS" equipment={criticalEquipment} />
            </div>
            <ReportFooter />
          </div>}

        {/* Full Equipment List */}
        <PaginatedEquipmentTable
          title="LISTAGEM GERAL DOS EQUIPAMENTOS"
          equipment={allEquipment}
        />

        {/* Status Overview */}
        <div className="report-page print-break flex flex-col">
          <div className="flex-1">
            <ReportHeader />
            <StatusChart statusData={statusData} />
          </div>
          <ReportFooter />
        </div>

        {/* Operational Reports Header */}
        {operationalReports.length > 0 && <>
            <div className="report-page flex flex-col">
              <ReportHeader />
              <div className="flex-1 flex flex-col items-center justify-center">
                <h2 className="report-title text-center text-3xl">RELATÓRIOS OPERACIONAIS</h2>
                <p className="text-center text-muted-foreground">
                  Detalhamento das ocorrências encontradas durante a inspeção de análise de vibração
                </p>
              </div>
            </div>

            {/* Vibration Operational Reports */}
            {operationalReports.map((vibracao, index) => (
              <VibrationOperationalReport
                key={`vib-${vibracao.id}`}
                id={String(index + 1).padStart(2, "0")}
                area={vibracao.area}
                equipment={vibracao.local}
                components={vibracao.conjunto}
                date={formatDate(relatorio.dataExe)}
                status={getVibracaoStatus(vibracao)}
                fabricante={vibracao.equipamento?.fabricante || "N/A"}
                modelo={vibracao.equipamento?.modelo || "N/A"}
                potencia={vibracao.equipamento?.potencia || "N/A"}
                rotacao={vibracao.equipamento?.rotacao || "N/A"}
                alimentacao={vibracao.equipamento?.alimentacao || "N/A"}
                rolamento={vibracao.equipamento?.rolamento || "N/A"}
                transmissao={vibracao.equipamento?.transmissao || "N/A"}
                equipmentImage={vibracao.equipamento?.foto_equipamento || vibracao.foto || ""}
                spectrumImage={vibracao.espectro || ""}
                trendImage={vibracao.tendencia || ""}
                readings={[]}
                problem={vibracao.diagnostico || "Nao informado"}
                classification={getVibracaoStatus(vibracao) === "critical" ? "INTERVENCAO IMEDIATA" : getVibracaoStatus(vibracao) === "off" ? "EQUIPAMENTO FORA DE OPERACAO" : "INTERVENCAO PROGRAMADA"}
                recommendations={vibracao.recomendacao ? [vibracao.recomendacao] : ["Realizar manutencao preventiva"]}
              />
            ))}
          </>}

        {/* Final Considerations */}
        <div className="report-page print-break flex flex-col">
          <div className="flex-1">
            <ReportHeader />
          
          <h2 className="report-title">CONSIDERAÇÕES FINAIS</h2>
          
          <div className="bg-secondary/30 rounded-lg p-6 mb-8">
            <p className="text-foreground leading-relaxed mb-4">
              As medições realizadas referem-se ao plano de monitoramento
              dos equipamentos rotativos, método da manutenção preditiva, que avalia a condição atual dos
              equipamentos por análise das vibrações..
            </p>
            <p className="text-primary font-semibold">
              Muito obrigado pela confiança.
            </p>
          </div>

          <div className="mb-8">
            <p className="mb-4">Atenciosamente,</p>
            <div className="border-l-4 border-primary pl-4">
              <p className="font-semibold">{usuarioData?.nome || 'Nome do Responsável'}</p>
              <p className="text-muted-foreground text-sm">{usuarioData?.departamento || 'DEPTO. DE PREDITIVA'}</p>
              <p className="text-sm mt-2">{usuarioData?.email || 'email@jundpred.com.br'}</p>
              <p className="text-sm">{usuarioData?.telefone || 'Tel.: (11) 2817-0616'}</p>
            </div>
          </div>

          {aprovadorData && (
            <div className="mb-8">
              <p className="mb-4">Aprovado por,</p>
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold">{aprovadorData.nome}</p>
                <p className="text-muted-foreground text-sm">{aprovadorData.departamento}</p>
                <p className="text-sm mt-2">{aprovadorData.email}</p>
                <p className="text-sm">{aprovadorData.telefone}</p>
              </div>
            </div>
          )}
          </div>
          <ReportFooter />
        </div>

        {/* Services Page */}
        <div className="report-page flex flex-col">
          <div className="flex-1">
            <ReportHeader />
            
            <h2 className="report-title">NOSSOS SERVIÇOS</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[{
              title: "Análise de Vibrações",
              desc: "Off-line e on-line, solo e estrutural"
            }, {
              title: "Inspeção Termográfica",
              desc: "Painéis, cabines, fornos, mancais, etc."
            }, {
              title: "Alinhamento a Laser",
              desc: "De eixos e polias + calços calibrados"
            }, {
              title: "Balanceamento Dinâmico",
              desc: "Realizado no local – 1 a 4 planos"
            }, {
              title: "ODS (Estrutural)",
              desc: "Análise de torção de base com correção"
            }, {
              title: "MCA – Inspeção Elétrica",
              desc: "Avaliação de circuitos em motores elétricos"
            }, {
              title: "Análise de Óleo",
              desc: "Lubrificante / pacote industrial"
            }, {
              title: "Técnicas Multiparâmetro",
              desc: "Aplicação de diversas técnicas preditivas"
            }, {
              title: "Treinamentos de Preditiva",
              desc: "Análise de vibração e Termografia – N1"
            }, {
              title: "Monitoramento Online",
              desc: "Sensor online de vibração"
            }, {
              title: "Inspeção Ultrassônica",
              desc: "Ar comprimido, vapor, gases e elétrica"
            }, {
              title: "Inspeção Sensitiva",
              desc: "Abordagem para identificar falhas incipientes"
            }].map((service, index) => <div key={index} className="info-card hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-primary">{service.title}</h4>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </div>)}
            </div>
            <ReportFooter />
          </div>
        </div>

      </div>
    </div>
};
export default Index;