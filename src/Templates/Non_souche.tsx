import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

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
  divider: {
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
    lineHeight: 1.5,
  },
  field: {
    marginBottom: 10,
  },
  fieldLabel: {
    fontWeight: 'bold',
  },
  fieldValue: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
  },
  signature: {
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
  },
});

interface NonExistenceCertificateProps {
  data: {
    'Nom de l\'officier'?: string;
    'Nom de la personne'?: string;
  };
}

const NonExistenceCertificateTemplate: React.FC<NonExistenceCertificateProps> = ({ data }) => {
  const currentDate = new Date().toLocaleDateString('fr-FR');
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête */}
        <View style={styles.header}>
        <View style={styles.bilingualText}>
              <Text>REPUBLIQUE DU CAMEROUN</Text>
              <Text>Paix - Travail - Patrie</Text>
              <Text>*************</Text>
              <Text>REGION DE L'OUEST</Text>
              <Text>*********</Text>
              <Text>DEPARTEMENT DES BAMBOUTOS</Text>
              <Text>**************</Text>
              <Text>COMMUNE DE MBOUDA</Text>
              <Text>********</Text>
              <Text>SECRETARIAT GENERAL</Text>
              <Text>********</Text>
              <Text>SERVICE DES AFFAIRES GENERALES</Text>
              <Text>***************</Text>
            </View>
            <View style={styles.bilingualText}>
              <Text>REPUBLIC OF CAMEROON</Text>
              <Text>Peace - Work - Fatherland</Text>
              <Text>*************</Text>
              <Text>WEST REGION</Text>
              <Text>*******</Text>
              <Text>BAMBOUTOS DIVISION</Text>
              <Text>********</Text>
              <Text>MBOUDA COUNCIL</Text>
              <Text>*******</Text>
              <Text>GENERAL SECRETARIAT</Text>
              <Text>************</Text>
              <Text>GENERAL DUTIES OFFICE</Text>
              <Text>************</Text>
            </View>
        </View>

        {/* Titre */}
        <Text style={styles.title}>
          CERTIFICAT DE NON EXISTENCE DE SOUCHE D'ACTE DE NAISSANCE
        </Text>

        {/* Contenu */}
        <View style={styles.content}>
          <Text style={styles.field}>
            Je soussigné(e) <Text style={styles.fieldValue}>{data['Nom de l\'officier'] || '______'}</Text>.
          </Text>
          
          <Text style={styles.field}>
            Certifie qu'après vérification faite par mes soins dans le Registre d'Etat Civil, il n'existe
            aucune souche d'acte de naissance concernant le/la nommé(e) {' '}
            <Text style={styles.fieldValue}>{data['Nom de la personne'] || '______'}</Text>.
          </Text>

          <Text style={{ marginTop: 15 }}>
            En foi de quoi le présent Certificat lui est délivré pour servir et valoir ce que de droit./-
          </Text>

          {/* Signature */}
          <View style={styles.signature}>
            <Text>Mbouda, le {currentDate}</Text>
              <Text>L'Officier d'Etat Civil</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default NonExistenceCertificateTemplate;