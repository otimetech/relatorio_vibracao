import StatusBadge from "./StatusBadge";
import { mapVibracaoStatusToStatusType } from "@/types/vibracao";

interface VibrationAlarmRow {
  area: string;
  local: string;
  conjunto: string;
  st3: string;
  data_exe: string;
  diagnostico: string;
  recomendacao: string;
}

interface VibrationAlarmTableProps {
  title: string;
  rows: VibrationAlarmRow[];
}

const VibrationAlarmTable = ({ title, rows }: VibrationAlarmTableProps) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
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
    return "N/A";
  };

  return (
    <div className="report-section">
      <h2 className="report-title">{title}</h2>
      <div className="overflow-x-auto">
        <table className="equipment-table">
          <thead>
            <tr>
              <th>Area</th>
              <th>Local</th>
              <th>Conjunto</th>
              <th>ST3</th>
              <th>Data Exec.</th>
              <th>Diagnostico</th>
              <th>Recomendacao</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item, index) => (
              <tr key={`${item.area}-${item.local}-${index}`}>
                <td>{item.area}</td>
                <td>{item.local}</td>
                <td>{item.conjunto}</td>
                <td>
                  {item.st3 ? (
                    <StatusBadge
                      status={mapVibracaoStatusToStatusType(item.st3)}
                      label={item.st3}
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{formatDate(item.data_exe)}</td>
                <td>{item.diagnostico || "N/A"}</td>
                <td>{item.recomendacao || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VibrationAlarmTable;
