import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface BirthCertificateExtractProps {
  data: {
    "Nom de l'enfant"?: string;
    "Date de naissance"?: string;
    "Lieu de naissance"?: string;
    "Arrondissement"?: string;
    "Département"?: string;
    "Région"?: string;
    "Domicile"?: string;
    "Nom du père"?: string;
    "Nom de la mère"?: string;
  };
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.4,
    fontFamily: 'Times-Roman',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  bilingualText: {
    width: '48%',
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 1.1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    textDecoration: 'underline',
  },
  content: {
    marginTop: 20,
    lineHeight: 0.7,
  },
  fieldLine: {
    marginBottom: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  fieldText: {
    fontWeight: 'normal',
  },
  dottedUnderline: {
    borderBottomWidth: 1,
    borderBottomStyle: 'dotted',
    borderBottomColor: '#000',
    minWidth: 300,
    paddingBottom: 0,
    marginLeft: 4,
    marginRight: 4,
  },
  dottedUnderlines: {
    borderBottomWidth: 1,
    borderBottomStyle: 'dotted',
    borderBottomColor: '#000',
    minWidth: 150,
    paddingBottom: 0,
    marginLeft: 4,
    marginRight: 4,
  },
  signatureSection: {
    marginTop: 40,
    textAlign: 'right',
  },
  signatureLine: {
    width: 200,
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 5,
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
});

const BirthCertificateExtractTemplate: React.FC<BirthCertificateExtractProps> = ({ data }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR') || '';
    } catch {
      return '';
    }
  };

  const renderField = (label: string, value?: string) => (
    <View style={styles.fieldLine}>
      <Text style={styles.fieldText}>{label}</Text>
      <View style={styles.dottedUnderline}>
        <Text style={styles.fieldText}>{value || ' '}</Text>
      </View>
    </View>
  );
  const renderFields = (label: string, value: string, label2: string, value2?: string) => (
    <View style={styles.fieldLine}>
      <Text style={styles.fieldText}>{label}</Text>
      <View style={styles.dottedUnderlines}>
        <Text style={styles.fieldText}>{value || ' '}</Text>
      </View>
      <Text style={styles.fieldText}>{label2}</Text>
      <View style={styles.dottedUnderlines}>
        <Text style={styles.fieldText}>{value2 || ' '}</Text>
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête bilingue */}
        <View style={styles.header}>
          <View style={styles.bilingualText}>
            <Text>REPUBLIQUE DU CAMEROUN</Text>
            <Text>Paix - Travail - Patrie</Text>
            <Text>*******</Text>
            <Text>REGION DE L'OUEST</Text>
            <Text>*******</Text>
            <Text>DÉPARTEMENT DES BAMBOUTOS</Text>
            <Text>*********</Text>
            <Text>COMMUNE DE MBOUDA,</Text>
            <Text>*******</Text>
            <Text>SECRETARIAT GENERAL</Text>
            <Text>*********</Text>
            <Text>SERVICE DES AFFAIRES GENERALES</Text>
            <Text>***************</Text>
          </View>
          <View style={styles.bilingualText}>
            <Text>REPUBLIC OF CAMEROON</Text>
            <Text>Peace - Work - Fatherland</Text>
            <Text>*****</Text>
            <Text>WEST REGION</Text>
            <Text>*****_</Text>
            <Text>BAMBOUTOS DIVISION</Text>
            <Text>********</Text>
            <Text>MBOUDA COUNCIL</Text>
            <Text>*******</Text>
            <Text>GENERAL SECRETARIAT</Text>
            <Text>**********</Text>
            <Text>GENERAL DUTIES OFFICE</Text>
            <Text>**********</Text>
          </View>
        </View>

        {/* Titre principal */}
        <Text style={styles.title}>
          EXTRAIT D'ACTE DE NAISSANCE N° ______
        </Text>

        {/* Contenu */}
        <View style={styles.content}>
          <Text style={styles.fieldLine}>
            Le Maire de la Commune de Mbouda (Officier d'état-civil), soussigné,
          </Text>
          {renderField("Certifie que M.", data["Nom de l'enfant"])}
          {renderFields("Est né(e) le", formatDate(data["Date de naissance"]),"à", data["Lieu de naissance"])}
          {renderField("Arrondissement de", data["Arrondissement"])}
          {renderField("Département de", data["Département"])}
          {renderField("Région de", data["Région"])}
          {renderField("Domicilié(e) à", data["Domicile"])}
          {renderField("Fils ou fille de", data["Nom du père"])}
          {renderField("Et de", data["Nom de la mère"])}
        </View>


        {/* Formule de validation */}
        <Text style={{ marginTop: 20 }}>
          En foi de quoi le présent extrait d'acte de naissance est établi pour servir et valoir ce que de droit./-
        </Text>

        {/* Signature */}
        <View style={styles.signatureSection}>
          <Text>
            Mbouda, le {formatDate(new Date().toISOString())}
          </Text>
            <Text>Le Maire (Officier d'état-Civil)</Text>
        </View>
      </Page>
    </Document>
  );
};

export default BirthCertificateExtractTemplate;