import StatusBadge from "./StatusBadge";
import ReportHeader from "./ReportHeader";
import ReportFooter from "./ReportFooter";
import { StatusType } from "@/types/relatorio";

interface VibrationOperationalReportProps {
  id: string;
  area: string;
  equipment: string;
  components: string;
  date: string;
  status: StatusType;
  fabricante: string;
  modelo: string;
  potencia: string;
  rotacao: string;
  alimentacao: string;
  rolamento: string;
  transmissao: string;
  equipmentImage: string;
  spectrumImage: string;
  trendImage: string;
  readings: {
    label: string;
    value: string;
  }[];
  problem: string;
  classification: string;
  recommendations: string[];
}

const VibrationOperationalReport = ({
  id,
  area,
  equipment,
  components,
  date,
  status,
  fabricante,
  modelo,
  potencia,
  rotacao,
  alimentacao,
  rolamento,
  transmissao,
  equipmentImage,
  spectrumImage,
  trendImage,
  readings,
  problem,
  classification,
  recommendations
}: VibrationOperationalReportProps) => {
  const getTableClass = () => {
    return status === "critical" ? "vibration-report-table-critical" : "vibration-report-table";
  };

  const getClassificationBadgeClass = () => {
    return status === "critical" ? "classification-badge-critical" : "classification-badge-alert";
  };

  return (
    <div className="report-page print-break flex flex-col">
      <ReportHeader />
      <div className="flex items-center justify-between mb-4 pt-4 border-b border-border">
        <h2 className="report-title text-lg">RELATÓRIO OPERACIONAL – {id}</h2>
        <StatusBadge status={status} />
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground mb-4">
        <span>
          <span className="text-foreground font-semibold">Área:</span> {area}
        </span>
        <span>
          <span className="text-foreground font-semibold">Local:</span> {equipment}
        </span>
        <span>
          <span className="text-foreground font-semibold">Conjunto:</span> {components}
        </span>
      </div>

      {/* Info Table */}
      <div className="overflow-x-auto mb-4">
        <table className={getTableClass()}>
          <thead>
            <tr>
              <th>Área</th>
              <th>Equipamento / TAG</th>
              <th>Componentes</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{area}</td>
              <td>{equipment}</td>
              <td>{components}</td>
              <td>{date}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Equipment Data + Images in 4 quadrants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 mb-4 print:grid-cols-2 print:gap-x-4 print:gap-y-1 print:mb-3">
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold">Dados do Equipamento</h4>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            <div className="info-card p-2">
              <p className="text-xs text-muted-foreground mb-0">Fabricante</p>
              <p className="font-mono font-semibold text-sm">{fabricante}</p>
            </div>
            <div className="info-card p-2">
              <p className="text-xs text-muted-foreground mb-0">Modelo</p>
              <p className="font-mono font-semibold text-sm">{modelo}</p>
            </div>
            <div className="info-card p-2">
              <p className="text-xs text-muted-foreground mb-0">Potência</p>
              <p className="font-mono font-semibold text-sm">{potencia}</p>
            </div>
            <div className="info-card p-2">
              <p className="text-xs text-muted-foreground mb-0">Rotação</p>
              <p className="font-mono font-semibold text-sm">{rotacao}</p>
            </div>
            <div className="info-card p-2">
              <p className="text-xs text-muted-foreground mb-0">Alimentação</p>
              <p className="font-mono font-semibold text-sm">{alimentacao}</p>
            </div>
            <div className="info-card p-2">
              <p className="text-xs text-muted-foreground mb-0">Rolamento</p>
              <p className="font-mono font-semibold text-sm">{rolamento}</p>
            </div>
            <div className="info-card p-2">
              <p className="text-xs text-muted-foreground mb-0">Transmissão</p>
              <p className="font-mono font-semibold text-sm">{transmissao}</p>
            </div>
          </div>
        </div>

        <div className="vibration-card flex flex-col items-center">
          {equipmentImage ? (
            <img
              src={equipmentImage}
              alt="Foto do Equipamento"
              className="report-image h-[180px] object-contain w-full"
            />
          ) : (
            <div className="image-placeholder h-[180px] w-full">
              <span className="text-xs text-muted-foreground">Sem imagem do equipamento</span>
            </div>
          )}
          <div className="p-2 print:p-1 bg-secondary/30 w-full text-center">
            <h4 className="text-xs font-semibold print:text-[10px]">Foto do Equipamento</h4>
          </div>
        </div>

        <div className="vibration-card flex flex-col items-center">
          {spectrumImage ? (
            <img
              src={spectrumImage}
              alt="Espectro de Vibração"
              className="report-image h-[180px] object-contain w-full"
            />
          ) : (
            <div className="image-placeholder h-[180px] w-full">
              <span className="text-xs text-muted-foreground">Sem espectro disponível</span>
            </div>
          )}
          <div className="p-2 print:p-1 bg-secondary/30 w-full text-center">
            <h4 className="text-xs font-semibold mb-1 print:text-[10px] print:mb-0">Espectro de Vibração</h4>
            <div className="flex flex-wrap gap-2 print:gap-1 justify-center">
              {readings.map((reading, index) => (
                <div key={index} className="flex items-center gap-1">
                  <span className="text-xs print:text-[9px] text-muted-foreground">{reading.label}:</span>
                  <span className="font-mono text-xs print:text-[9px] font-medium">{reading.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="vibration-card flex flex-col items-center">
          {trendImage ? (
            <img
              src={trendImage}
              alt="Tendência de Vibração"
              className="report-image h-[180px] object-contain w-full"
            />
          ) : (
            <div className="image-placeholder h-[180px] w-full flex items-center justify-center">
              <span className="text-xs text-muted-foreground text-center px-2 leading-tight">
                As curvas de tendências estarão sendo incorporadas ao relatório após a realização a partir de 3(três) medições de coleta de dados de vibração.
              </span>
            </div>
          )}
          <div className="p-2 print:p-1 bg-secondary/30 w-full text-center">
            <h4 className="text-xs font-semibold print:text-[10px]">Tendência de Vibração</h4>
          </div>
        </div>
      </div>

      {/* Problem Description */}
      <div className="report-section mb-3">
        <h3 className="report-subtitle text-sm">DIAGNÓSTICO / DESCRIÇÃO DO PROBLEMA:</h3>
        <p className="text-foreground text-sm mb-3">{problem}</p>
        <div className={`classification-badge ${getClassificationBadgeClass()}`}>
          <span className="text-sm font-medium">Classificação:</span>
          <span className="font-semibold">{classification}</span>
        </div>
      </div>

      {/* Recommendations */}
      <div className="report-section mb-3">
        <h3 className="report-subtitle text-sm">RECOMENDAÇÕES:</h3>
        <ul className="recommendation-list text-sm">
          {recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>

      {/* Feedback Section */}
      <div className="feedback-section print:mt-2 print:pt-2 print:border-t print:border-border">
        <div className="mb-3 print:mb-2">
          <label className="text-sm font-medium print:text-[10px]">Observações/Feedback:</label>
          <div className="mt-1 print:mt-1 h-8 print:h-8 border-b-2 border-dashed border-border"></div>
        </div>
        <div className="flex items-center gap-4 print:gap-2">
          <span className="text-sm font-medium print:text-[10px]">Manutenção realizada:</span>
          <div className="flex-1 border-b-2 border-dashed border-border"></div>
          <span className="text-sm text-muted-foreground print:text-[10px]">Data: ___/___/___</span>
        </div>
      </div>

      <ReportFooter />
    </div>
  );
};

export default VibrationOperationalReport;
