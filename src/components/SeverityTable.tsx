import ReportHeader from "./ReportHeader";
import ReportFooter from "./ReportFooter";

interface SeverityCell {
  value: string;
  classification: "bom" | "adequado" | "admissivel" | "inadmissivel";
}

const getBackgroundColor = (classification: "bom" | "adequado" | "admissivel" | "inadmissivel") => {
  switch (classification) {
    case "bom":
    case "adequado":
      return "bg-green-500";
    case "admissivel":
      return "bg-yellow-300";
    case "inadmissivel":
      return "bg-red-600";
    default:
      return "bg-white";
  }
};

const getTextColor = (classification: "bom" | "adequado" | "admissivel" | "inadmissivel") => {
  switch (classification) {
    case "bom":
    case "adequado":
    case "inadmissivel":
      return "text-black";
    case "admissivel":
      return "text-black";
    default:
      return "text-foreground";
  }
};

const severityData = [
  { vibration: "0,28", ate20cv: { value: "", classification: "bom" as const }, de20a100cv: { value: "", classification: "bom" as const }, gt100rigid: { value: "", classification: "bom" as const }, gt75flex: { value: "", classification: "bom" as const } },
  { vibration: "0,45", ate20cv: { value: "Bom", classification: "bom" as const }, de20a100cv: { value: "", classification: "bom" as const }, gt100rigid: { value: "", classification: "bom" as const }, gt75flex: { value: "", classification: "bom" as const } },
  { vibration: "0,71", ate20cv: { value: "", classification: "bom" as const }, de20a100cv: { value: "Bom", classification: "bom" as const }, gt100rigid: { value: "", classification: "bom" as const }, gt75flex: { value: "", classification: "bom" as const } },
  { vibration: "1,12", ate20cv: { value: "", classification: "bom" as const }, de20a100cv: { value: "", classification: "bom" as const }, gt100rigid: { value: "Bom", classification: "bom" as const }, gt75flex: { value: "", classification: "bom" as const } },
  { vibration: "1,8", ate20cv: { value: "Adequado", classification: "adequado" as const }, de20a100cv: { value: "", classification: "bom" as const }, gt100rigid: { value: "", classification: "bom" as const }, gt75flex: { value: "Bom", classification: "bom" as const } },
  { vibration: "2,8", ate20cv: { value: "", classification: "adequado" as const }, de20a100cv: { value: "Adequado", classification: "adequado" as const }, gt100rigid: { value: "", classification: "bom" as const }, gt75flex: { value: "", classification: "bom" as const } },
  { vibration: "4,5", ate20cv: { value: "Admissível", classification: "admissivel" as const }, de20a100cv: { value: "", classification: "adequado" as const }, gt100rigid: { value: "Adequado", classification: "adequado" as const }, gt75flex: { value: "", classification: "bom" as const } },
  { vibration: "7,1", ate20cv: { value: "", classification: "admissivel" as const }, de20a100cv: { value: "Admissível", classification: "admissivel" as const }, gt100rigid: { value: "", classification: "adequado" as const }, gt75flex: { value: "Adequado", classification: "adequado" as const } },
  { vibration: "11,2", ate20cv: { value: "Inadmissível", classification: "inadmissivel" as const }, de20a100cv: { value: "", classification: "admissivel" as const }, gt100rigid: { value: "Admissível", classification: "admissivel" as const }, gt75flex: { value: "", classification: "adequado" as const } },
  { vibration: "18", ate20cv: { value: "", classification: "inadmissivel" as const }, de20a100cv: { value: "Inadmissível", classification: "inadmissivel" as const }, gt100rigid: { value: "", classification: "admissivel" as const }, gt75flex: { value: "Admissível", classification: "admissivel" as const } },
  { vibration: "28", ate20cv: { value: "", classification: "inadmissivel" as const }, de20a100cv: { value: "", classification: "inadmissivel" as const }, gt100rigid: { value: "Inadmissível", classification: "inadmissivel" as const }, gt75flex: { value: "", classification: "admissivel" as const } },
  { vibration: "45", ate20cv: { value: "", classification: "inadmissivel" as const }, de20a100cv: { value: "", classification: "inadmissivel" as const }, gt100rigid: { value: "", classification: "inadmissivel" as const }, gt75flex: { value: "Inadmissível", classification: "inadmissivel" as const } },
];

const SeverityTable = () => {
  return (
    <div className="report-page print-break flex flex-col">
      <div className="flex-1">
        <ReportHeader />
        
        <h2 className="report-title">CRITÉRIO PARA JULGAMENTO DE ESTADO DE MÁQUINAS</h2>
        <p className="text-sm text-muted-foreground mb-4">
          10 a 1000 Hz - RMS
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse text-xs print:text-xs">
            <thead>
              <tr>
                <th className="bg-primary text-primary-foreground text-center px-3 py-2 font-semibold border border-border">
                  Nível de Vibração (mm/s)
                </th>
                <th className="bg-primary text-primary-foreground text-center px-3 py-2 font-semibold border border-border">
                  Até 20 CV
                </th>
                <th className="bg-primary text-primary-foreground text-center px-3 py-2 font-semibold border border-border">
                  De 20 CV Até 100 CV
                </th>
                <th className="bg-primary text-primary-foreground text-center px-3 py-2 font-semibold border border-border">
                  &gt; 100 CV Base Rígida
                </th>
                <th className="bg-primary text-primary-foreground text-center px-3 py-2 font-semibold border border-border">
                  &gt; 75 CV B. Flexível
                </th>
              </tr>
            </thead>
            <tbody>
              {severityData.map((row, index) => (
                <tr key={index}>
                  <td className="px-3 py-2 text-center border border-border font-mono font-semibold bg-gray-100">
                    {row.vibration}
                  </td>
                  <td className={`px-3 py-2 text-center border border-border font-semibold ${getBackgroundColor(row.ate20cv.classification)} ${getTextColor(row.ate20cv.classification)}`}>
                    {row.ate20cv.value}
                  </td>
                  <td className={`px-3 py-2 text-center border border-border font-semibold ${getBackgroundColor(row.de20a100cv.classification)} ${getTextColor(row.de20a100cv.classification)}`}>
                    {row.de20a100cv.value}
                  </td>
                  <td className={`px-3 py-2 text-center border border-border font-semibold ${getBackgroundColor(row.gt100rigid.classification)} ${getTextColor(row.gt100rigid.classification)}`}>
                    {row.gt100rigid.value}
                  </td>
                  <td className={`px-3 py-2 text-center border border-border font-semibold ${getBackgroundColor(row.gt75flex.classification)} ${getTextColor(row.gt75flex.classification)}`}>
                    {row.gt75flex.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="report-section">
          <h3 className="report-subtitle">LEGENDA</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="info-card">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded bg-green-500"></div>
                <span className="font-semibold text-sm">BOM/ADEQUADO</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Equipamento em excelente ou adequada condição de operação.
              </p>
            </div>
            
            <div className="info-card">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded bg-yellow-300"></div>
                <span className="font-semibold text-sm">ADMISSÍVEL</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Condição aceitável por período limitado. Programar manutenção.
              </p>
            </div>
            
            <div className="info-card">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded bg-red-600"></div>
                <span className="font-semibold text-sm">CRÍTICO</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Condição inaceitável. Intervenção imediata necessária.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ReportFooter />
    </div>
  );
};

export default SeverityTable;
