import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface CertificatCelibatProps {
  data: {
    "Nom du responsable"?: string;
    "Nom du demandeur"?: string;
    "Prénom du demandeur"?: string;
    "Date de naissance"?: string;
    "Lieu de naissance"?: string;
    "Nom du père"?: string;
    "Nom de la mère"?: string;
    "Domicile du demandeur"?: string;
    "Nationalité"?: string;
    "Nom du premier témoin"?: string;
    "CNI du premier témoin"?: string;
    "Profession du premier témoin"?: string;
    "Domicile du premier témoin"?: string;
    "Nom du deuxième témoin"?: string;
    "CNI du deuxième témoin"?: string;
    "Profession du deuxième témoin"?: string;
    "Domicile du deuxième témoin"?: string;
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


const CertificatCelibat: React.FC<CertificatCelibatProps> = ({ data }) => {
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
            <Text>*********</Text>
            <Text>REGION DE L'OUEST</Text>
            <Text>********</Text>
            <Text>DÉPARTEMENT DES BAMBOUTOS</Text>
            <Text>**********</Text>
            <Text>COMMUNE DE MBOUDA</Text>
            <Text>*******</Text>
            <Text>SECRETARIAT GENERAL</Text>
            <Text>*******</Text>
          </View>
          <View style={styles.bilingualText}>
            <Text>REPUBLIC OF CAMEROON</Text>
            <Text>Peace - Work - Fatherland</Text>
            <Text>*********</Text>
            <Text>WEST REGION</Text>
            <Text>****</Text>
            <Text>BAMBOUTOS DIVISION</Text>
            <Text>********</Text>
            <Text>MBOUDA COUNCIL</Text>
            <Text>********</Text>
            <Text>GENERAL SECRETARIAT</Text>
            <Text>*********</Text>
          </View>
        </View>

        {/* Titre principal */}
        <Text style={styles.title}>
          CERTIFICAT DE CELIBAT
        </Text>

        {/* Contenu */}
        <View style={styles.content}>
          {renderField("Nous soussigné", data["Nom du responsable"])}
          
          {renderField("Certifions que le ou la nommé(e)", `${data["Nom du demandeur"] || ''} ${data["Prénom du demandeur"] || ''}`.trim())}
          
          {renderFields("Né(e) le", formatDate(data["Date de naissance"]), "à", data["Lieu de naissance"])}
          
          {renderFields("Fils/fille de", data["Nom du père"] || '', "et de", data["Nom de la mère"] || '')}
          
          {renderFields("Domicilié(e) à", data["Domicile du demandeur"] || '', "nationalité", data["Nationalité"] || '')}
          
          <Text style={{ marginTop: 20 }}>
            Est célibataire, et n'a jamais contracté de mariage avant son départ du Cameroun.
          </Text>
          
          <Text style={{ marginTop: 20 }}>
            Le présent certificat de célibat établi sur les déclarations de l'intéressé et des témoins suivant à savoir :
          </Text>
          
          <View style={{ marginLeft: 20, marginTop: 10 }}>
            {renderFields("1. M.", data["Nom du premier témoin"] || '', "CNI N°", data["CNI du premier témoin"] || '')}
            {renderFields("   Profession", data["Profession du premier témoin"] || '', "domicilié(e) à", data["Domicile du premier témoin"] || '')}
            
            {renderFields("2. M.", data["Nom du deuxième témoin"] || '', "CNI N°", data["CNI du deuxième témoin"] || '')}
            {renderFields("   Profession", data["Profession du deuxième témoin"] || '', "domicilié(e) à", data["Domicile du deuxième témoin"] || '')}
          </View>
          
          <Text style={{ marginTop: 20 }}>
            L'intéressé(e) est avisé(e) qu'il / elle est passible de poursuite judiciaire conformément aux dispositions de l'article 163 alinéa 2 du code pénal sur les déclarations mensongères.
          </Text>
        </View>

        {/* Signature */}
        <View style={styles.signatureSection}>
          <Text>
            Mbouda, le {formatDate(new Date().toISOString())}
          </Text>
          <Text>Officier d'Etat-Civil</Text>
        </View>
      </Page>
    </Document>
  );
};

export default CertificatCelibat;