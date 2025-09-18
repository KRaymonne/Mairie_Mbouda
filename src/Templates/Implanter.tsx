import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface PermisConstruireProps {
  data: {
    "Nom de l'entreprise"?:string;
    "Noms et prénoms"?: string;
    "Adresse"?: string;
    "Situation terrain"?: string;
    "Cadastre"?: string;
    "Propriétaire si différent"?: string;
    "Dans lotissement"?: string;
    "Servitudes"?: string;
    "Nature travaux"?: string[] | string; // Accepte tableau ou string
    "Matériaux"?: string;
    "Accord préalable"?: string;
    "Qualité demandeur"?: string;
    "Appellation lotissement"?: string;
    "Texte autorisation lotissement"?: string;
    "Numéro lot"?: string;
    "Date approbation lotissement"?: string;
    "Montant travaux"?: string;
    "Architecte responsable"?: string;
    "Mode financement"?: string;
    "Organisme prêteur"?: string;
    "Lieu date signature"?: string;
    "Date réception mairie"?: string;
    "Avis mairie"?: string;
    "Motifs avis"?: string;
  };
  formType:"civil" | "Service";
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    lineHeight: 1.4,
    fontFamily: 'Times-Roman',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    textDecoration: 'underline',
  },
  section: {
    marginBottom: 10,
    lineHeight: 0.7,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  fieldLabel: {
    width: '30%',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontWeight: 'bold',
    textAlign:"center",
    marginBottom: 5,
    textDecoration: 'underline',
  },
  fieldLine: {
    marginBottom: 5,
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
    minWidth: 200,
    paddingBottom: 2,
    marginLeft: 4,
    marginRight: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
    width: '45%', // Pour organiser en 2 colonnes
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
  signatureSection: {
    marginTop: 20,
    textAlign: 'right',
  },
  bilingualText: {
    width: '48%',
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 1.1,
  },
});

const renderField = (label: string, value?: string) => (
  <View style={styles.fieldLine}>
    <Text style={styles.fieldText}>{label}</Text>
    <View style={styles.dottedUnderline}>
      <Text style={styles.fieldText}>{value || ' '}</Text>
    </View>
  </View>
);

const renderCheckbox = (label: string, checked: boolean = false) => (
  <View style={styles.checkboxContainer}>
    <View style={[
      styles.checkbox,
      checked ? { backgroundColor: 'black' } : {}
    ]}>
      {checked && <Text style={{ color: 'white', fontSize: 8 }}>X</Text>}
    </View>
    <Text style={styles.fieldText}>{label}</Text>
  </View>
);

const renderCheckboxField = (label: string, options: string[], selectedValues: string[] = []) => (
  <View style={styles.fieldRow}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option);
        return (
          <View key={option} style={styles.checkboxContainer}>
            <View style={[
              styles.checkbox,
              isSelected ? { backgroundColor: 'black' } : {}
            ]}>
              {isSelected && <Text style={{ color: 'white', fontSize: 8 }}>X</Text>}
            </View>
            <Text style={styles.fieldText}>{option}</Text>
          </View>
        );
      })}
    </View>
  </View>
);

const PermisConstruireTemplate: React.FC<PermisConstruireProps> = ({ data,formType }) => {
  const isCivilForm = formType === "civil";
  // Convertit les données "Nature travaux" en tableau si nécessaire
  const natureTravaux = Array.isArray(data["Nature travaux"]) 
    ? data["Nature travaux"] 
    : typeof data["Nature travaux"] === 'string'
      ? data["Nature travaux"].split(', ') 
      : [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête */}
        <View style={styles.header}>
          <View style={styles.bilingualText}>
            <Text>REPUBLIQUE DU CAMEROUN</Text>
            <Text>Paix - Travail - Patrie</Text>
            <Text>******</Text>
            <Text>REGION DE L'OUEST</Text>
            <Text>******</Text>
            <Text>DÉPARTEMENT DES BAMBOUTOS</Text>
            <Text>******</Text>
            <Text>COMMUNE DE MBOUDA</Text>
            <Text>******</Text>
            <Text>SERVICE TECHNIQUE</Text>
          </View>
          <View style={styles.bilingualText}>
            <Text>REPUBLIC OF CAMEROON</Text>
            <Text>Peace - Work - Fatherland</Text>
            <Text>******</Text>
            <Text>WEST REGION</Text>
            <Text>******</Text>
            <Text>BAMBOUTOS DIVISION</Text>
            <Text>******</Text>
            <Text>MBOUDA COUNCIL</Text>
            <Text>******</Text>
            <Text>TECHNICAL SERVICE</Text>
          </View>
        </View>

        {/* Titre principal */}
        <Text style={styles.title}>DEMANDE DE PERMIS D'EMPLANTER</Text>
{isCivilForm &&(
    <View style={styles.section}>
          <Text style={styles.sectionTitle}>DEMANDEUR</Text>
          {renderField("Noms et prénoms (raison sociale)", data["Noms et prénoms"])}
    </View>
  )}
  {!isCivilForm &&(
    <View style={styles.section}>
          <Text style={styles.sectionTitle}>DEMANDEUR</Text>
          {renderField("Nom de l'entreprise", data["Nom de l'entreprise"])}
    </View>
  )}
        {/* Section DEMANDEUR */}
        <View style={styles.section}>
          {renderField("Adresse", data["Adresse"])}
        </View>

        {/* Section TERRAIN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TERRAIN</Text>
          {renderField("Situation", data["Situation terrain"])}
          {renderField("Cadastre, section numéro des parcelles", data["Cadastre"])}
          {renderField("Nom du propriétaire (s'il est autre que demandeur)", data["Propriétaire si différent"])}
          {renderField("Le terrain est-il dans un lotissement ? (oui ou non)", data["Dans lotissement"])}
          {renderField("Servitudes publiques ou privées grevant le terrain", data["Servitudes"])}
        </View>

        {/* Section NATURE DES TRAVAUX */}
        <View style={styles.section}>
  <Text style={styles.sectionTitle}>NATURE DES TRAVAUX</Text>
  
  {renderCheckboxField("", [
    "Construction", 
    "Surélévation", 
    "Addition",
    "Modification",
    "Distribution",
    "Façade",
    "Annexe",
    "Clôture",
    "Usage d'habitation",
    "Industrie",
    "Commerce",
    "Bureau",
    "Agricole",
    "Bâtiment",
    "Public"
  ], natureTravaux)}
   <Text style={{ marginTop: 5 }}>Je sollicite : </Text>

  {renderField("Le permis de construire en matériaux", data["Matériaux"])}
  {renderField("D'après accord préalable n°", data["Accord préalable"])}
  {renderField("Je décide formuler cette demande en qualité de (propriétaires, mandataires, locataires)", data["Qualité demandeur"])}
  <Text style={{ marginTop: 5 }}>Joindre pièces justificatives, mandats ou bail avec autorisation écrite du propriétaire.</Text>
</View>

        {/* Section Lotissement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I - Si le terrain est compris dans le lotissement</Text>
          {renderField("Appellation du lotissement", data["Appellation lotissement"])}
          {renderField("Numéro et date du texte autorisant le lotissement", data["Texte autorisation lotissement"])}
          {renderField("Numéro du lot dans le lotissement", data["Numéro lot"])}
          {renderField("Date de délivrance du certification mentionnant l'accomplissement des formules d'approbation du lotissement", data["Date approbation lotissement"])}
        </View>

        {/* Section Montant travaux */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>II - Montant approximatif des travaux</Text>
          {renderField("(non compris, achat de terrain, voirie, branchement, honoraires d'architectes)", data["Montant travaux"])}
        </View>

        {/* Section Architecte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>III - Nom et adresse de l'Architecte responsable des travaux</Text>
          {renderField("", data["Architecte responsable"])}
        </View>

        {/* Section Financement */}
        <View style={styles.section}>
  <Text style={styles.sectionTitle}>IV - Mode de financement</Text>
  <View style={styles.fieldRow}>
    <View style={styles.checkboxContainer}>
      <View style={[
        styles.checkbox,
        data["Mode financement"] === "personnel" ? { backgroundColor: 'black' } : {}
      ]}>
        {data["Mode financement"] === "personnel" && <Text style={{ color: 'white', fontSize: 8 }}>X</Text>}
      </View>
      <Text style={styles.fieldText}>personnel</Text>
    </View>
    <View style={styles.checkboxContainer}>
      <View style={[
        styles.checkbox,
        data["Mode financement"] === "prêt" ? { backgroundColor: 'black' } : {}
      ]}>
        {data["Mode financement"] === "prêt" && <Text style={{ color: 'white', fontSize: 8 }}>X</Text>}
      </View>
      <Text style={styles.fieldText}>avec prêt (organisme préteur): {data["Organisme prêteur"] || '......'}</Text>
    </View>
  </View>
</View>

        {/* Signature demandeur */}
        <View style={styles.signatureSection}>
          {renderField("Fait à", data["Lieu date signature"])}
          <Text>Signature,</Text>
        </View>

        {/* Cadre Mairie */}
        <View style={{ marginTop: 30, border: '1px solid #000', padding: 10 }}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>CADRE A REMPLIR PAR LE MAIRE</Text>
          {renderField("La présente demande a été reçue à la Mairie de", "Mbouda")}
          {renderField("Le (date de délivrance du récépissé)", data["Date réception mairie"])}
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            {renderCheckbox("Transmis avec avis favorable", data["Avis mairie"] === "favorable")}
            {renderCheckbox("Défavorable (pour motifs exprimés dans la note jointe)", data["Avis mairie"] === "défavorable")}
          </View>
          {renderField("Motifs", data["Motifs avis"])}
          <View style={styles.signatureSection}>
            {renderField("Fait à", "Mbouda")}
            <Text>Le Maire,</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PermisConstruireTemplate;