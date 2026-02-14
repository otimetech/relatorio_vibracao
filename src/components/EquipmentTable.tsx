
export interface Equipment {
  id: number;
  area: string;
  local: string;
  conjunto: string;
  st3: string;
  data: string;
  diagnostico: string;
  recomendacao: string;
}

interface EquipmentTableProps {
  title: string;
  equipment: Equipment[];
}

const EquipmentTable = ({ title, equipment }: EquipmentTableProps) => {
  const formatDate = (value: string) => {
    if (!value) return "-";
    const trimmed = value.trim();
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

  const getSt3Class = (st3: string) => {
    const status = st3.toUpperCase();
    if (status === "N") return "bg-success text-success-foreground";
    if (status === "A1") return "bg-destructive text-destructive-foreground";
    if (status === "A2") return "bg-warning text-foreground";
    return "bg-muted text-foreground";
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
              <th>Data</th>
              <th>Diagnostico</th>
              <th>Recomendacao</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.area || "-"}
                </td>
                <td>{item.local || "-"}</td>
                <td>{item.conjunto || "-"}</td>
                <td>
                  {item.st3 ? (
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${getSt3Class(
                        item.st3
                      )}`}
                    >
                      {item.st3.toUpperCase()}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                <td>{formatDate(item.data)}</td>
                <td>{item.diagnostico || "-"}</td>
                <td>{item.recomendacao || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquipmentTable;
