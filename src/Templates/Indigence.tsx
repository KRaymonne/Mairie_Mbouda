import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface IndigenceCertificateProps {
  data: {
    // Informations sur le demandeur
    "Titre"?: string;
    "M./Mme/Mlle"?: string;
    "Né(e) le"?: string;
    "À"?: string;
    "Fils/Fille de"?: string;
    "Et de"?: string;
    "Profession"?: string;
    "Domicile"?: string;
    
    // Informations administratives
    "Numéro rapport"?: string;
    "Date rapport"?: string;
    "Date délivrance"?: string;
  };
  previewMode?: boolean;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    lineHeight: 1.3,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  bilingualText: {
    width: '48%',
    fontSize: 9,
    textAlign: 'center',
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    marginVertical: 3,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    textDecoration: 'underline',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8,
    textDecoration: 'underline',
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  fieldLabel: {
    width: 'auto',
    fontWeight: 'bold',
  },
  fieldValue: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    paddingBottom: 3,
    marginLeft: 5,
  },
  signatureSection: {
    marginTop: 30,
    textAlign:"right",
  },
  signature: {
    width: '40%',
    marginTop: 30,
    borderTopWidth: 0.5,
    borderTopColor: '#000',
    paddingTop: 5,
    textAlign: 'center',
  },
  note: {
    fontSize: 8,
    marginTop: 10,
    fontStyle: 'italic',
  },
});

const IndigenceCertificateTemplate: React.FC<IndigenceCertificateProps> = ({ data, previewMode = false }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '......';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR') || '......';
    } catch {
      return '......';
    }
  };

  const currentDate = new Date().toLocaleDateString('fr-FR');

  const renderField = (label: string, value?: string) => (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value || '......'}</Text>
    </View>
  );

  if (!previewMode) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* En-tête bilingue */}
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

          {/* Titre principal */}
          <Text style={styles.title}>
            CERTIFICAT D'INDIGENCE N°______/CI/CMDA/SG/SAG
          </Text>

          {/* Section 1 - Informations sur le demandeur */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>INFORMATIONS SUR LE DEMANDEUR</Text>
            
            {renderField("M./Mme/Mlle", data["M./Mme/Mlle"])}
            <View style={styles.fieldRow}>
            <Text style={[styles.fieldLabel, { width: 'auto' }]}>Né(e) le </Text>
            <Text style={[styles.fieldValue, { width: '25%' }]}>{formatDate(data["Né(e) le"]) || '......'}</Text>
            <Text style={[styles.fieldLabel, { width: 'auto', marginLeft: 10 }]}>à </Text>
            <Text style={[styles.fieldValue, { width: '40%' }]}>{data["À"] || '......'}</Text>
          </View>
            {renderField("Fils/Fille de", data["Fils/Fille de"])}
            {renderField("Et de", data["Et de"])}
            {renderField("Profession", data["Profession"])}
            {renderField("Domicilié(e) à", data["Domicile"])}
          </View>

          {/* Section 2 - Déclaration d'indigence */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>DECLARATION D'INDIGENCE</Text>
            
            <Text style={{ marginBottom: 10 }}>
              Je soussigné Maire de la Commune de Mbouda, certifie que la personne mentionnée ci-dessus est indigente dans ma Commune en ce moment, eu égard aux conclusions du Rapport d'enquête N°2025/ 
              <Text style={{ fontWeight: 'bold' }}> {formatDate(data["Date rapport"])} </Text>/RES/MINAS/DRAS-OU/DDAS-BTOS/CS-MDA  <Text style={{ fontWeight: 'bold' }}> {formatDate(data["Date rapport"])} </Text>
              du Chef de Centre Social de Mbouda.
            </Text>

            <Text style={{ marginBottom: 10 }}>
              En foi de quoi, le présent certificat d'indigence est établi et délivré à l'intéressé(e) pour servir et valoir ce que de droit.
            </Text>
          </View>

          {/* Signature */}
          <View style={styles.signatureSection}>
              <Text>Mbouda, le {currentDate}</Text>
              <Text>Le Maire</Text>
          </View>

          {/* Pièce jointe */}
          
          <Text style={{textDecoration:"underline",fontWeight:"bold"}}>
          P.J. :
          </Text>
          <Text style={styles.note}>
             Rapport d'enquête sociale
          </Text>
        </Page>
      </Document>
    );
  }

  return (
    <div className="template-preview">
      {/* Rendu HTML pour prévisualisation */}
    </div>
  );
};

export default IndigenceCertificateTemplate;