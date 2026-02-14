import ReportHeader from "./ReportHeader";
import ReportFooter from "./ReportFooter";

const AccelerationReference = () => {
  return (
    <div className="report-page print-break flex flex-col">
      <div className="flex-1">
        <ReportHeader />
        
        <h2 className="report-title">REFERÊNCIAS DE ACELERAÇÃO PARA FALHAS</h2>
        
        <p className="text-sm text-muted-foreground mb-6">
          Para falha de rolamentos e outros que geram alta frequência são utilizadas as referências abaixo:
        </p>

        <p className="text-xs text-muted-foreground mb-4 italic">
          Aceleração Pura – RMS – 10-100000 Hz
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse text-xs print:text-xs">
            <thead>
              <tr>
                <th className="bg-primary text-primary-foreground text-center px-3 py-2 font-semibold border border-border">
                  Faixa de Rotação (RPM)
                </th>
                <th className="bg-yellow-300 text-black text-center px-3 py-2 font-semibold border border-border">
                  A1 (Alarme 1)
                </th>
                <th className="bg-red-600 text-white text-center px-3 py-2 font-semibold border border-border">
                  A2 (Alarme 2)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 text-center border border-border font-semibold bg-gray-100">
                  600 a 1500
                </td>
                <td className="px-3 py-2 text-center border border-border font-semibold bg-yellow-300 text-black">
                  1,5
                </td>
                <td className="px-3 py-2 text-center border border-border font-semibold bg-red-600 text-white">
                  3
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-center border border-border font-semibold bg-gray-100">
                  1500 a 2000
                </td>
                <td className="px-3 py-2 text-center border border-border font-semibold bg-yellow-300 text-black">
                  2
                </td>
                <td className="px-3 py-2 text-center border border-border font-semibold bg-red-600 text-white">
                  4
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-center border border-border font-semibold bg-gray-100">
                  2000 a 3600
                </td>
                <td className="px-3 py-2 text-center border border-border font-semibold bg-yellow-300 text-black">
                  3
                </td>
                <td className="px-3 py-2 text-center border border-border font-semibold bg-red-600 text-white">
                  5
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="report-section rounded-md p-4">
          <h3 className="report-subtitle mb-4">OBSERVAÇÕES IMPORTANTES</h3>
          
          <div className="space-y-4 text-sm">
            <p className="text-foreground">
              <span className="font-semibold">Obs.:</span> Em planos de manutenção preditiva, após a sexta medição a criticidade dos equipamentos (status) é dada em função da tendência e não somente do nível global.
            </p>

            <div className="ml-4 space-y-3">
              <div className="border-l-4 border-green-600 pl-3">
                <p className="font-semibold text-foreground">Status para equipamentos monitorados:</p>
              </div>

              <div className="ml-4 space-y-2">
                <p className="text-foreground">
                  <span className="font-semibold bg-green-500 text-white px-2 py-1 rounded">N</span> – Normal: Equipamento em condições normais de vibração;
                </p>
                <p className="text-foreground">
                  <span className="font-semibold bg-yellow-300 text-black px-2 py-1 rounded">A1 – Alarme 1:</span> Equipamento em condições admissíveis de vibração, podendo ser monitorado ou programado uma intervenção;
                </p>
                <p className="text-foreground">
                  <span className="font-semibold bg-red-600 text-white px-2 py-1 rounded">A2 – Alarme 2:</span> Equipamento em condições inadmissíveis de vibração, onde recomenda-se uma intervenção;
                </p>
              </div>

              <div className="border-l-4 border-gray-600 pl-3 mt-4">
                <p className="font-semibold text-foreground">Status para equipamentos não monitorados:</p>
              </div>

              <div className="ml-4 space-y-2">
                <p className="text-foreground">
                  <span className="font-semibold">P</span> – Parado: Equipamento parado por motivo de processo.
                </p>
                <p className="text-foreground">
                  <span className="font-semibold">D</span> – Desativado;
                </p>
                <p className="text-foreground">
                  <span className="font-semibold">M</span> – Manutenção;
                </p>
                <p className="text-foreground">
                  <span className="font-semibold">NM</span> – Não Medido: Equipamento por outros motivos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReportFooter />
    </div>
  );
};

export default AccelerationReference;
