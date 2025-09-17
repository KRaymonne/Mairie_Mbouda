import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface ExistenceCertificateProps {
  data: {
    'Numéro d\'acte de naissance'?: string;
    'Date de dressage de l\'acte'?: string;
    'Lieu'?: string;
    'Nom de l\'enfant'?: string;
    'Date de naissance de l\'enfant'?: string;
    'Lieu de naissance de l\'enfant'?: string;
    'Nom du père'?: string;
    'Nom de la mère'?: string;
    'Date de signature de la copie'?: string;
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

const ExistenceCertificateTemplate: React.FC<ExistenceCertificateProps> = ({ data }) => {
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
            <Text>****************</Text>
            <Text>Paix - Travail - Patrie</Text>
            <Text>****************</Text>
            <Text>REGION DE L'OUEST</Text>
            <Text>*****************</Text>
            <Text>DEPARTEMENT DES BAMBOUTOS</Text>
            <Text>****************</Text>
            <Text>COMMUNE DE MBOUDA</Text>
          </View>
          <View style={styles.bilingualText}>
            <Text>REPUBLIC OF CAMEROON</Text>
            <Text>****************</Text>
            <Text>Peace - Work - Fatherland</Text>
            <Text>***************</Text>
            <Text>WEST REGION</Text>
            <Text>********</Text>
            <Text>BAMBOUTOS DIVISION</Text>
            <Text>************</Text>
            <Text>MBOUDA COUNCIL</Text>
            <Text>************</Text>
          </View>
        </View>

        {/* Titre principal */}
        <Text style={styles.title}>
          ATTESTATION D'EXISTENCE DE SOUCHE D'ACTE DE NAISSANCE (N° {'______'})
        </Text>

        {/* Contenu */}
        <View style={styles.content}>
          <Text style={styles.fieldLine}>
            Le maire de la Commune de Mbouda, soussigné,
          </Text>
          {renderField("Atteste que la souche de l'acte de Naissance N° ", data['Numéro d\'acte de naissance'])}
          {renderFields("Dressé le ", formatDate(data['Date de dressage de l\'acte']), "à", data['Lieu'])}
          {renderField("Au nom de", data['Nom de l\'enfant'])}
          {renderFields("Né (e) le ", formatDate(data['Date de naissance de l\'enfant']), "à", data['Lieu de naissance de l\'enfant'])}
          {renderField("Fils ou fille de", data['Nom du père'])}
          {renderField("Et de", data['Nom de la mère'])}
          {renderField("Donc la copie a été signée le", formatDate(data['Date de signature de la copie']))}
          <Text style={styles.fieldLine}>
            Existe bien dans nos archives.
          </Text>
          {/* Formule de validation */}
          <Text style={{ marginTop: 8 }}>
            En foi de quoi la présente Attestation est établie pour servir et valoir ce que de droit./-
          </Text>

          {/* Signature */}
          <View style={styles.signatureSection}>
            <Text>
              Mbouda, le {formatDate(new Date().toISOString()) || '______'}
            </Text>
              <Text>L'officier de l'Etat-Civil</Text>
            </View>
          </View>
      </Page>
    </Document>
  );
};

export default ExistenceCertificateTemplate;