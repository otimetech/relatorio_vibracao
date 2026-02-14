import ReportHeader from "./ReportHeader";
import ReportFooter from "./ReportFooter";

const VibrationPrinciplesPage1 = () => {
  return (
    <div className="report-page print-break flex flex-col">
      <div className="flex-1">
        <ReportHeader />
        
        <h2 className="report-title">RELATÓRIO DE INSPEÇÃO ANÁLISE DE VIBRAÇÃO</h2>

        <div className="report-section">
          <h3 className="report-subtitle">1 - PRINCÍPIOS DA ANÁLISE DE VIBRAÇÃO:</h3>
          <p className="text-sm text-foreground leading-relaxed mb-4">
            A análise de vibração é uma técnica de manutenção preditiva que permite detectar defeitos 
            em máquinas rotativas através da medição e análise dos sinais de vibração gerados durante 
            seu funcionamento. Esta técnica possibilita identificar problemas como desbalanceamento, 
            desalinhamento, folgas mecânicas, defeitos em rolamentos, engrenagens e outros componentes 
            mecânicos antes que causem falhas catastróficas.
          </p>
          <p className="text-sm text-foreground leading-relaxed">
            Os sinais de vibração são coletados através de acelerômetros posicionados em pontos 
            estratégicos do equipamento e posteriormente processados para obtenção de espectros de 
            frequência que permitem a identificação precisa dos defeitos presentes.
          </p>
        </div>

        <div className="report-section">
          <h3 className="report-subtitle">2 - APLICAÇÕES</h3>
          <p className="text-sm text-foreground leading-relaxed mb-4">
            A Análise de Vibração se aplica aos programas de manutenção preventiva e preditiva nas mais diversas 
            indústrias, sendo utilizada em:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-foreground ml-4">
            <li>Motores elétricos e geradores</li>
            <li>Bombas centrífugas e de deslocamento positivo</li>
            <li>Compressores (alternativos, parafuso e centrífugos)</li>
            <li>Ventiladores e exaustores industriais</li>
            <li>Redutores e multiplicadores de velocidade</li>
            <li>Turbinas a vapor e a gás</li>
            <li>Máquinas-ferramenta e centros de usinagem</li>
            <li>Equipamentos rotativos em geral</li>
          </ul>
        </div>

        <div className="report-section">
          <h3 className="report-subtitle">3 - METODOLOGIA DE COLETA</h3>
          
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-primary">3.1 - Pontos de Medição</p>
              <p className="text-foreground ml-4">
                Os pontos de medição são definidos de acordo com a configuração do equipamento, 
                priorizando os mancais e pontos de apoio onde as vibrações são transmitidas de forma 
                mais direta. Geralmente são coletados sinais nas direções horizontal, vertical e axial.
              </p>
            </div>
            <div>
              <p className="font-medium text-primary">3.2 - Equipamentos Utilizados</p>
              <p className="text-foreground ml-4">
                São utilizados coletores de dados de última geração, acelerômetros piezoelétricos 
                de alta sensibilidade e softwares especializados para análise espectral, permitindo 
                diagnósticos precisos e confiáveis.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ReportFooter />
    </div>
  );
};

const VibrationPrinciplesPage1b = () => {
  return (
    <div className="report-page print-break flex flex-col">
      <div className="flex-1">
        <ReportHeader />
        
        <div className="report-section">
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-primary">3.3 - Parâmetros Analisados</p>
              <p className="text-foreground ml-4">
                São analisados os níveis globais de velocidade (mm/s RMS), espectros de frequência, 
                formas de onda no tempo, envelope de aceleração para análise de rolamentos e outras 
                técnicas avançadas conforme necessidade.
              </p>
            </div>
          </div>
        </div>

        <div className="report-section">
          <h3 className="report-subtitle">4 - CRITÉRIOS DE AVALIAÇÃO</h3>
          
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-primary">4.1 - Normas de Referência</p>
              <p className="text-foreground ml-4">
                Os critérios de avaliação são baseados nas normas técnicas internacionais ISO 10816-1, 
                ISO 10816-3 e ISO 10816-7, que estabelecem limites de severidade de vibração para 
                diferentes classes de máquinas industriais.
              </p>
            </div>
            <div>
              <p className="font-medium text-primary">4.2 - Classificação da Severidade</p>
              <p className="text-foreground ml-4">
                A severidade da vibração é classificada em zonas que indicam a condição operacional 
                do equipamento, desde "Bom" (zona verde) até "Inaceitável" (zona vermelha), orientando 
                as ações de manutenção necessárias.
              </p>
            </div>
            <div>
              <p className="font-medium text-primary">4.3 - Análise de Tendência</p>
              <p className="text-foreground ml-4">
                Além da avaliação pontual, é realizado o acompanhamento histórico dos níveis de 
                vibração, permitindo identificar tendências de degradação e programar intervenções 
                antes da ocorrência de falhas.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ReportFooter />
    </div>
  );
};

const VibrationPrinciplesPage2 = () => {
  return (
    <div className="report-page print-break flex flex-col">
      <div className="flex-1">
        <ReportHeader />
        
        <div className="report-section">
          <h3 className="report-subtitle">5 - DIAGNÓSTICO DE DEFEITOS</h3>
          
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-primary">5.1 - Desbalanceamento</p>
              <p className="text-foreground ml-4">
                Manifesta-se como vibração predominante na frequência de rotação (1x RPM) e é causado 
                por distribuição irregular de massa no rotor. Pode ser corrigido através de balanceamento 
                dinâmico.
              </p>
            </div>
            <div>
              <p className="font-medium text-primary">5.2 - Desalinhamento</p>
              <p className="text-foreground ml-4">
                Caracteriza-se por elevados níveis de vibração em 2x RPM (desalinhamento angular) ou 
                vibração axial elevada (desalinhamento paralelo). A correção é feita através de 
                alinhamento a laser.
              </p>
            </div>
            <div>
              <p className="font-medium text-primary">5.3 - Defeitos em Rolamentos</p>
              <p className="text-foreground ml-4">
                São identificados através da análise de envelope de aceleração, que revela frequências 
                características de defeitos na pista interna (BPFI), pista externa (BPFO), elementos 
                rolantes (BSF) e gaiola (FTF).
              </p>
            </div>
            <div>
              <p className="font-medium text-primary">5.4 - Folgas Mecânicas</p>
              <p className="text-foreground ml-4">
                Apresentam harmônicos múltiplos da frequência de rotação e podem ser estruturais 
                (base ou fundação) ou internas (mancais, acoplamentos). Requerem reaperto ou substituição 
                de componentes desgastados.
              </p>
            </div>
            <div>
              <p className="font-medium text-primary">5.5 - Defeitos em Engrenagens</p>
              <p className="text-foreground ml-4">
                São detectados através da análise das frequências de engrenamento (GMF) e suas bandas 
                laterais, indicando desgaste, excentricidade ou defeitos nos dentes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ReportFooter />
    </div>
  );
};

export { VibrationPrinciplesPage1, VibrationPrinciplesPage1b, VibrationPrinciplesPage2 };
