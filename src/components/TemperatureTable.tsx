interface TemperatureLimit {
  component: string;
  maxTemp: string;
}

const temperatureLimits: TemperatureLimit[] = [
  { component: "Fios encapados", maxTemp: "70°C" },
  { component: "Régua de borne", maxTemp: "70°C" },
  { component: "Cabos isolados até 15 K", maxTemp: "70°C" },
  { component: "Conexões mediante parafusos", maxTemp: "90°C" },
  { component: "Conexões e barramentos de baixa tensão", maxTemp: "90°C" },
  { component: "Conexões de linha de transmissão aérea", maxTemp: "70°C" },
  { component: "Conexões recobertas de prata ou níquel", maxTemp: "90°C" },
  { component: "Fusíveis (corpo)", maxTemp: "100°C" },
  { component: "Seccionadoras", maxTemp: "50°C" },
  { component: "Conexões", maxTemp: "60°C" },
  { component: "Transformadores a óleo - ponto mais quente – (núcleo)", maxTemp: "80°C" },
  { component: "Transformadores a óleo (óleo)", maxTemp: "65°C" },
  { component: "Transformadores a seco", maxTemp: "De 115°C a 180°C*" },
];

const TemperatureTable = () => {
  return (
    <div className="report-section" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
      <h3 className="report-subtitle">3.4 - Máxima Temperatura Admissível (MTA)</h3>
      <p className="text-xs text-muted-foreground mb-2">
        Utilizam-se como máxima temperatura admissível de componentes de diversos fabricantes, 
        valores indicativos obtidos através de ensaios e experiência em campo:
      </p>
      <table className="data-table w-full text-xs" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
        <thead>
          <tr style={{ height: '20px' }}>
            <th className="text-left py-0 px-2" style={{ height: '20px', lineHeight: '20px' }}>Componente</th>
            <th className="text-right py-0 px-2 w-32" style={{ height: '20px', lineHeight: '20px' }}>Temperatura Máxima</th>
          </tr>
        </thead>
        <tbody>
          {temperatureLimits.map((item, index) => (
            <tr key={index} style={{ height: '20px' }}>
              <td className="py-0 px-2" style={{ height: '20px', lineHeight: '20px' }}>{item.component}</td>
              <td className="py-0 px-2 text-right font-mono" style={{ height: '20px', lineHeight: '20px' }}>{item.maxTemp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[10px] text-muted-foreground mt-1 italic">
        *De acordo com a classe de isolação do transformador em questão.
      </p>

      {/* Methodology Sections */}
      <div className="space-y-4 text-sm mt-6">
        <div>
          <p className="font-medium text-primary">3.5</p>
          <p className="text-foreground">
            As falhas elétricas detectadas são classificadas segundo critérios de prioridades de 
            manutenção, calculando-se a temperatura que o componente teria em condição padrão de funcionamento.
          </p>
        </div>
        <div>
          <p className="font-medium text-primary">3.6</p>
          <p className="text-foreground">
            Entende-se por manutenção não apenas a troca do componente, como também a limpeza e/ou reaperto. 
            A observação de um componente envolve a verificação periódica da evolução térmica.
          </p>
        </div>
        <div>
          <p className="font-medium text-primary">3.7</p>
          <p className="text-foreground">
            Por uma questão de aproveitamento de tempo de inspeção, a execução de termogramas e imagens 
            térmicas que ilustram o relatório é reservada apenas aos equipamentos anormalmente aquecidos 
            de maior importância ou a critério do contratante.
          </p>
        </div>
      </div>

      {/* Conclusion Section */}
      <div className="mt-8">
        <h3 className="report-subtitle">4 - CONCLUSÃO</h3>
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium text-primary">4.1</p>
            <p className="text-foreground">
              Recomendamos que sejam realizadas as manutenções nos equipamentos com temperaturas anormais 
              listados neste relatório.
            </p>
          </div>
          <div>
            <p className="font-medium text-primary">4.2</p>
            <p className="text-foreground">
              Colocamo-nos à disposição para esclarecer quaisquer dúvidas a respeito de nossos serviços.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureTable;
