import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer"

// Register font
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
})

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Roboto",
    lineHeight: 1.5,
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  paragraph: {
    marginBottom: 5,
  },
  signature: {
    marginTop: 20,
    marginBottom: 5,
  },
  witnesses: {
    marginTop: 30,
  },
  footer: {
    marginTop: 20,
  },
})

interface TermoPDFProps {
  formData: {
    nomeFunc: string
    cpfFunc: string
    numSerie: string
    data: string
  }
  formattedDate: string
}

const TermoPDF = ({ formData, formattedDate }: TermoPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>TERMO DE RESPONSABILIDADE PELO USO DO COLETOR DE DADOS DA EMPRESA</Text>

      <View style={styles.section}>
        <Text style={styles.paragraph}>
          Pelo presente Termo de Responsabilidade pelo Uso de Equipamento do Coletor de Dados da Empresa, de um lado, A.
          SILVA FERRAGENS LTDA, pessoa jurídica de direito privado, estabelecida à Rodovia Luiz Rosso Km 05, nº 3610,
          Primeira Linha – Criciúma/SC, inscrita no CNPJ nº 02.492.310/0002-87, neste ato representada pelo Senhor
          Alexandro Willemann da Silva, doravante denominada "EMPRESA" e de outro lado, {formData.nomeFunc}, portador do
          CPF nº {formData.cpfFunc}, doravante denominado FUNCIONÁRIO, tem entre si justo e contratado o que segue:
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CLÁUSULA PRIMEIRA – DO EQUIPAMENTO</Text>
        <Text style={styles.paragraph}>
          A EMPRESA cede ao FUNCIONÁRIO, para fins de uso exclusivo na execução de suas atividades profissionais, os
          seguintes equipamentos:
        </Text>
        <Text style={styles.paragraph}>- Coletor Zebra (TC-21), N° de Série: {formData.numSerie}</Text>
        <Text style={styles.paragraph}>- Capa de Proteção.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CLÁUSULA SEGUNDA – DA RESPONSABILIDADE PELO USO E CONSERVAÇÃO</Text>
        <Text style={styles.paragraph}>O FUNCIONÁRIO se compromete a:</Text>
        <Text style={styles.paragraph}>
          1. Zelar pela integridade física e funcional dos equipamentos listados na Cláusula Primeira,
          responsabilizando-se por seu uso e conservação.
        </Text>
        <Text style={styles.paragraph}>
          2. Não emprestar, alugar, ceder ou permitir o uso dos equipamentos por terceiros.
        </Text>
        <Text style={styles.paragraph}>3. Utilizar os equipamentos exclusivamente para fins profissionais.</Text>
        <Text style={styles.paragraph}>
          4. Não realizar a instalação de programas sem autorização expressa do Departamento de TI.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CLÁUSULA TERCEIRA – DA PROPRIEDADE DO EQUIPAMENTO</Text>
        <Text style={styles.paragraph}>
          Os equipamentos descritos na Cláusula Primeira são propriedade exclusiva da EMPRESA, cabendo ao FUNCIONÁRIO
          apenas sua detenção temporária para fins profissionais, sem qualquer direito de posse definitiva.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CLÁUSULA QUARTA – DA DEVOLUÇÃO E RESPONSABILIDADE POR DANOS</Text>
        <Text style={styles.paragraph}>
          1. O FUNCIONÁRIO compromete-se a devolver todos os equipamentos listados na Cláusula Primeira em perfeito
          estado de funcionamento, excetuando-se o desgaste natural, no mesmo dia de seu desligamento.
        </Text>
        <Text style={styles.paragraph}>
          2. Em caso de danos, extravios ou avarias, decorrentes de negligência ou mau uso, o FUNCIONÁRIO autoriza a
          EMPRESA a proceder com o desconto em folha de pagamento.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CLÁUSULA QUINTA – DA RESPONSABILIDADE DO GESTOR</Text>
        <Text style={styles.paragraph}>1. O GESTOR responsável pelo FUNCIONÁRIO se compromete a:</Text>
        <Text style={styles.paragraph}>
          {" "}
          - Informar imediatamente ao Departamento de TI sempre que houver alteração na posse do equipamento.
        </Text>
        <Text style={styles.paragraph}>
          {" "}
          - Garantir que o FUNCIONÁRIO tenha assinado este termo antes da utilização do equipamento.
        </Text>
        <Text style={styles.paragraph}>
          {" "}
          - Responder solidariamente caso a omissão resulte em danos ao patrimônio da EMPRESA.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CLÁUSULA SEXTA – DISPOSIÇÕES FINAIS</Text>
        <Text style={styles.paragraph}>
          1. O FUNCIONÁRIO declara estar ciente e de acordo com as responsabilidades descritas neste termo.
        </Text>
        <Text style={styles.paragraph}>
          2. Este termo entra em vigor na data de sua assinatura e permanecerá válido enquanto o FUNCIONÁRIO estiver na
          posse dos equipamentos.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.paragraph}>Criciúma/SC, {formattedDate}</Text>

        <Text style={styles.signature}>EMPRESA: ____________________________</Text>
        <Text style={styles.signature}>GESTOR RESPONSÁVEL: ____________________________</Text>
        <Text style={styles.signature}>FUNCIONÁRIO: ____________________________</Text>

        <View style={styles.witnesses}>
          <Text style={styles.paragraph}>Testemunhas:</Text>
          <Text style={styles.signature}>Nome: ____________________________ CPF: ____________________________</Text>
          <Text style={styles.signature}>Nome: ____________________________ CPF: ____________________________</Text>
        </View>
      </View>
    </Page>
  </Document>
)

export default TermoPDF

