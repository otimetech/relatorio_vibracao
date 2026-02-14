import StatusBadge from "./StatusBadge";

interface VibrationAlarmCriticalEquipment {
  id: number;
  area: string;
  local: string;
  conjunto: string;
  st3: string;
  data_exe: string;
  diagnostico: string;
  recomendacao: string;
  status: "normal" | "alert" | "critical" | "maintenance" | "off";
  observation?: string;
}

interface VibrationAlarmCriticalTableProps {
  title: string;
  equipment: VibrationAlarmCriticalEquipment[];
}

const VibrationAlarmCriticalTable = ({ title, equipment }: VibrationAlarmCriticalTableProps) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    const trimmed = dateStr.trim();
    if (/^\d{2}\/\d{2}\/\d{2,4}$/.test(trimmed)) {
      const parts = trimmed.split("/");
      if (parts[2].length === 4) {
        return `${parts[0]}/${parts[1]}/${parts[2].slice(2)}`;
      }
      return trimmed;
    }
    if (/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(trimmed)) {
      const date = new Date(trimmed);
      if (!Number.isNaN(date.getTime())) {
        return date.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          timeZone: "UTC"
        });
      }
    }
    return "-";
  };

  const getStatusColor = (st3: string) => {
    const status = st3.toUpperCase();
    if (status === "N") return "bg-success text-success-foreground";
    if (status === "A1") return "bg-warning text-foreground";
    if (status === "A2") return "bg-destructive text-destructive-foreground";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="report-section">
      <h2 className="report-title">{title}</h2>
      <div className="w-full">
        <table className="w-full border-collapse text-[10px] print:text-[9px]">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="border border-border px-1 py-1.5 text-left w-[8%]">Área</th>
              <th className="border border-border px-1 py-1.5 text-left w-[12%]">Local</th>
              <th className="border border-border px-1 py-1.5 text-left w-[15%]">Conjunto</th>
              <th className="border border-border px-1 py-1.5 text-center w-[6%]">Status</th>
              <th className="border border-border px-1 py-1.5 text-center w-[8%]">Data</th>
              <th className="border border-border px-1 py-1.5 text-left w-[22%]">Diagnóstico</th>
              <th className="border border-border px-1 py-1.5 text-left w-[22%]">Recomendação</th>
              <th className="border border-border px-1 py-1.5 text-center w-[7%]">Obs.</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((item) => (
              <tr key={item.id} className="hover:bg-secondary/50">
                <td className="border border-border px-1 py-1">{item.area}</td>
                <td className="border border-border px-1 py-1">{item.local}</td>
                <td className="border border-border px-1 py-1">{item.conjunto}</td>
                <td className="border border-border px-1 py-1 text-center">
                  <span className={`inline-block px-1 py-0.5 rounded text-[9px] font-semibold ${getStatusColor(item.st3)}`}>
                    {item.st3.toUpperCase()}
                  </span>
                </td>
                <td className="border border-border px-1 py-1 text-center">{formatDate(item.data_exe)}</td>
                <td className="border border-border px-1 py-1">{item.diagnostico || "-"}</td>
                <td className="border border-border px-1 py-1">{item.recomendacao || "-"}</td>
                <td className="border border-border px-1 py-1 text-center text-primary font-medium">
                  {item.observation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VibrationAlarmCriticalTable;
