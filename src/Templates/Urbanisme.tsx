import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface UrbanCertificateProps {
  data: {
    "Nom de l'entreprise"?:string;
    'Nom, Prénom et/ou Raison Sociale'?: string;
    'Adresse'?: string;
    'B.P'?: string;
    'Téléphone'?: string;
    'Email'?: string;
    'Qualité'?: string;
    'Précisez autre qualité'?: string;
    'Nom du propriétaire (si différent du demandeur)'?: string;
    'Adresse du propriétaire'?: string;
    'B.P du propriétaire'?: string;
    'Téléphone du propriétaire'?: string;
    'Email du propriétaire'?: string;
    'Type de projet'?: string;
    'Précisez autre projet'?: string;
    'Arrondissement'?: string;
    'Quartier'?: string;
    'Lieudit'?: string;
    'Rue'?: string;
    'Titre Foncier N°'?: string;
    'Superficie'?: string;
  };
  formType:"civil" | "Service";
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    lineHeight: 0.8,
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
    lineHeight: 0.9,
  },
  cote: {
    padding: 10,
    width: '30%',
    fontSize: 7,
    textAlign: 'left',
    lineHeight: 0.7,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'dotted',
    textAlign: 'center',
    marginVertical: 5,
    width:"15%"
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 3,
    textDecoration: 'underline',
  },
  section: {
    marginBottom: 5,
    lineHeight:0.7
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
    textDecoration: 'underline',
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'flex-end',
  },
  fieldLabel: {
    width: 'auto',
    fontSize: 9,
  },
  fieldValue: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    paddingBottom: 2,
    marginLeft: 5,
    fontSize: 9,
  },
  contactInfo: {
    fontSize:7,
    marginBottom: 2,
  },
  signatureSection: {
    marginTop: 7,
    textAlign: 'right',
  },
  signatureLine: {
    width: '30%',
    marginTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#000',
    paddingTop: 5,
    alignSelf: 'flex-end',
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  checkboxGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
    width: '30%',
  },
  content: {
    marginTop: 20,
    lineHeight: 0.7,
  },
  checkbox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#000',
  },
  checkboxLabel: {
    fontSize: 9,
  },
});

const UrbanCertificateTemplate: React.FC<UrbanCertificateProps> = ({ data, formType }) => {
  const isCivilForm = formType === "civil";
  const renderField = (label: string, value?: string) => (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value || '......'}</Text>
    </View>
  );

  const renderContactField = (label: string, value?: string) => (
    <View style={{ width: '25%' }}>
      {renderField(label, value)}
    </View>
  );

  const renderCheckboxField = (label: string, options: string[], selectedValue?: string) => (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.checkboxContainer}>
        {options.map((option) => {
          const isSelected = selectedValue === option;
          
          return (
            <View key={option} style={styles.checkboxGroup}>
              <View style={[
                styles.checkbox,
                isSelected ? styles.checkboxSelected : {}
              ]}>
                {isSelected && <Text style={{ color: '#fff', fontSize: 8 }}>X</Text>}
              </View>
              <Text style={styles.checkboxLabel}>{option}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );

  const currentDate = new Date().toLocaleDateString('fr-FR');

  // Options pour les champs checkbox
  const qualiteOptions = ['Propriétaire', 'Mandataire', 'Autre à préciser'];
  const typeProjetOptions = [
    'Construction : maison d\'habitation',
    'Ouvrage commercial',
    'Ouvrage industriel',
    'Lotissement',
    'Autre à préciser'
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête bilingue */}
        <View style={styles.header}>
          <View style={styles.bilingualText}>
            <Text>REPUBLIQUE DU CAMEROUN</Text>
            <Text>-Paix - Travail - Patrie-</Text>
            <Text>***********</Text>
            <Text>REGION DE L'OUEST</Text>
            <Text>******</Text>
            <Text>DEPARTEMENT DES BAMBOUTOS</Text>
            <Text>**********</Text>
            <Text>Arrondissement de Mbouda</Text>
            <Text>**********</Text>
            <Text>COMMUNE DE MBOUDA</Text>
            <Text>*******</Text>
            <Text>SECRETARIAT GENERAL</Text>
            <Text>***********</Text>
            <Text>Service technique</Text>
            <Text>*********</Text>
          </View>
          <View style={styles.bilingualText}>
            <Text>REPUBLIC OF CAMEROON</Text>
            <Text>Peace - Work - Fatherland</Text>
            <Text>********</Text>
            <Text>WEST REGION</Text>
            <Text>********</Text>
            <Text>BAMBOUTOS DIVISION</Text>
            <Text>********</Text>
            <Text>MBOUDA SUBDIVISION</Text>
            <Text>********</Text>
            <Text>MBOUDA COUNCIL</Text>
            <Text>********</Text>
            <Text>GENERAL SECRETARIAT</Text>
            <Text>********</Text>
          </View>
        </View>
        <View style={styles.contactInfo}>
        <Text>BP 51 MBOUDA</Text>
            <Text>Tél. : 233 30 5362</Text>
            <Text>Email : contact@communedembouda.cn</Text>
        </View>
        
        {/* Titre principal */}
        <Text style={styles.title}>DEMANDE DE CERTIFICAT D'URBANISME</Text>
        <View style={styles.content}>
        {/* Section 1 - Identité du demandeur */}
        {isCivilForm &&(
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>IDENTITE DU DEMANDEUR</Text>
            <Text style={{fontSize:7,marginBottom: 2,}}>NOM, PRENOM et/ou RAISON SOCIALE (Ecrire en majuscule) :</Text>
            <Text style={{width:"70%",paddingBottom:4,borderBottom:0.5,borderBottomColor:"#000",marginLeft: 5,fontSize: 9,}}>
            {data['Nom, Prénom et/ou Raison Sociale']}
            </Text>
            </View>
          )}
          {!isCivilForm &&(
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>IDENTITE DU DEMANDEUR</Text>
            <Text style={{fontSize:7,marginBottom: 2,}}>NOM DE L'ENTREPRISE (Ecrire en majuscule) :</Text>
            <Text style={{width:"70%",paddingBottom:4,borderBottom:0.5,borderBottomColor:"#000",marginLeft: 5,fontSize: 9,}}>
            {data["Nom de l'entreprise"]}
            </Text>
            </View>
          )}
        <View style={styles.section}>
          <View style={styles.contactInfo}>
            {renderContactField('Adresse :', data['Adresse'])}
            {renderContactField('B.P :', data['B.P'])}
            {renderContactField('Tél. :', data['Téléphone'])}
            {renderContactField('Email :', data['Email'])}
          </View>

          {renderCheckboxField('Qualité :', qualiteOptions, data['Qualité'])}
          {data['Précisez autre qualité'] && (
            <View style={styles.fieldRow}>
              <Text style={[styles.fieldLabel, { width: '40%' }]}></Text>
              <Text style={[styles.fieldValue, { fontSize: 9 }]}>
                Précision : {data['Précisez autre qualité']}
              </Text>
            </View>
          )}

          {renderField(
            'NOM du propriétaire (si différent du demandeur) :', 
            data['Nom du propriétaire (si différent du demandeur)']
          )}
          
          <View style={styles.contactInfo}>
            {renderContactField('Adresse :', data['Adresse du propriétaire'])}
            {renderContactField('B.P.', data['B.P du propriétaire'])}
            {renderContactField('Tél. :', data['Téléphone du propriétaire'])}
            {renderContactField('Email :', data['Email du propriétaire'])}
          </View>
        </View>

        {/* Section 2 - Nature du projet */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NATURE DU PROJET</Text>
          <Text style={{ fontSize: 9, marginBottom: 5 }}>
            Sollicite le Certificat d'Urbanisme concernant le terrain ci-dessous en vue notamment de l'opération (nature du projet) ci-après :
          </Text>
          
          {renderCheckboxField('Type de projet :', typeProjetOptions, data['Type de projet'])}
          {data['Précisez autre projet'] && (
            <View style={styles.fieldRow}>
              <Text style={[styles.fieldLabel, { width: '40%' }]}></Text>
              <Text style={[styles.fieldValue, { fontSize: 9 }]}>
                Précision : {data['Précisez autre projet']}
              </Text>
            </View>
          )}
        </View>

        {/* Section 3 - Situation du terrain */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SITUATION DU TERRAIN</Text>
          
          {renderField('Arrondissement :', data['Arrondissement'])}
          
          <View style={styles.fieldRow}>
            <Text style={[styles.fieldLabel, { width: 'auto' }]}>Quartier :</Text>
            <Text style={[styles.fieldValue, { width: '30%' }]}>{data['Quartier'] || '......'}</Text>
            <Text style={[styles.fieldLabel, { width: 'auto', marginLeft: 10 }]}>Lieudit :</Text>
            <Text style={[styles.fieldValue, { width: '30%' }]}>{data['Lieudit'] || '......'}</Text>
          </View>
          
          {renderField('Rue :', data['Rue'])}
          {renderField('Titre Foncier N° :', data['Titre Foncier N°'])}
          {renderField('Superficie :', data['Superficie'])}
        </View>
        </View>

        {/* Section 4 - Engagement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ENGAGEMENT DU DEMANDEUR</Text>
          <Text style={{ fontSize: 9, marginBottom: 10 }}>
            Je certifie exactes les informations mentionnées ci-dessus :
          </Text>
          
          <View style={styles.signatureSection}>
          <Text >Fait à, Mbouda</Text>
          <Text >le {currentDate}</Text>
            <View style={styles.signatureLine}>
              <Text style={{ fontSize: 9, textAlign: 'center' }}>Signature du demandeur</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default UrbanCertificateTemplate;