import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface DeathCertificateProps {
  data: {
    // Section 1 - Défunt
    "Noms du défunt"?: string;
    "Prénoms du défunt"?: string;
    "Sexe du défunt"?: string;
    "Date de naissance du défunt"?: string;
    "Age du défunt"?: string;
    "Lieu de naissance du défunt"?: string;
    "Nationalité du défunt"?: string;
    "Numéro CNI du défunt"?: string;
    "Profession du défunt"?: string;
    "Domicile du défunt"?: string;
    "Statut matrimonial du défunt"?: string;

    // Section 2 - Décès
    "Date de décès"?: string;
    "Heure de décès"?: string;
    "Lieu du décès"?: string;
    "Site du décès"?: string;
    "Circonstances du décès"?: string;

    // Section 3 - Déclarant
    "Noms et prénoms du déclarant"?: string;
    "Qualité du déclarant"?: string;
    "Contact du déclarant"?: string;
    "Signature du déclarant"?: string;
    "Date de déclaration"?: string;

    // Section 4 - Officier
    "Nom de l'officier d'état civil"?: string;
    "Qualité de l'officier"?: string;
    "Centre d'état civil"?: string;
    "Numéro de déclaration"?: string;
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
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  fieldLabel: {
    width: '30%',
    fontWeight: 'bold',
  },
  fieldValue: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    paddingBottom: 3,
    marginLeft: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  checkboxGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 8,
    width: '45%',
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
  centeredText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  signatureSection: {
    marginTop: 20,
    textAlign: 'right',
  },
  signature: {
    width: '40%',
    marginTop: 30,
    borderTopWidth: 0.5,
    borderTopColor: '#000',
    paddingTop: 5,
    textAlign:'right',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
  },
});

const DeathCertificateTemplate: React.FC<DeathCertificateProps> = ({ data, previewMode = false }) => {
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

  const renderCheckboxField = (label: string, options: string[], selectedValue?: string) => (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.checkboxContainer}>
        {options.map((option) => {
          const optionValue = option.split('/')[0].trim();
          const isSelected = selectedValue?.includes(optionValue);
          
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

  if (!previewMode) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* En-tête bilingue */}
          <View style={styles.header}>
            <View style={styles.bilingualText}>
              <Text>REPUBLIQUE DU CAMEROUN</Text>
              <Text>Paix-Travail-Patrie</Text>
              <Text>Region : ______</Text>
              <Text>Departement : ______</Text>
              <Text>Arrondissement : ______</Text>
              <Text>District de Santé : ______</Text>
              <Text>Aire de santé : ______</Text>
              <Text>Formation Sanitaire : ______</Text>
              <Text>Ville ou Village ou Quartier : ______</Text>
            </View>
            <View style={styles.bilingualText}>
              <Text>REPUBLIC OF CAMEROON</Text>
              <Text>Peace-Work-Fatherland</Text>
              <Text>Region: ______</Text>
              <Text>Division: ______</Text>
              <Text>Subdivision : ______</Text>
              <Text>Health District : ______</Text>
              <Text>Health Facility: ______</Text>
              <Text>Town or Village or Quartier : ______</Text>
            </View>
          </View>

          {/* Titre principal */}
          <Text style={styles.title}>
            DECLARATION DE DECES/DEATH DECLARATION N° {data["Numéro de déclaration"] || '______'} /20___
          </Text>

          <Text style={{ fontSize: 8, marginBottom: 10, fontStyle: 'italic' }}>
            *Parties à détailler et à commettre au centre d'état civil/Section ID se détachant and transmitted to the civil status registro.
          </Text>

          {/* Section 1 - Défunt */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Section 1 : INFORMATIONS SUR LE DEFUNT/DECEASE INFORMATION (Instruction n° 1)
            </Text>
            
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '50%' }}>
                {renderField("*Noms / Name", data["Noms du défunt"])}
              </View>
              <View style={{ width: '50%' }}>
                {renderField("*Prénoms / Surname", data["Prénoms du défunt"])}
              </View>
            </View>

            {renderCheckboxField("*Sexe / Sex", ["Masculin / Male", "Féminin / Female"], data["Sexe du défunt"])}

            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '50%' }}>
                {renderField("Date de naissance / Date of birth", formatDate(data["Date de naissance du défunt"]))}
              </View>
              <View style={{ width: '50%' }}>
                {renderField("Age/Age", data["Age du défunt"])}
              </View>
            </View>

            {renderField("Lieu de naissance / Place of birth", data["Lieu de naissance du défunt"])}
            {renderField("Nationalité / Nationality", data["Nationalité du défunt"])}
            {renderField("N°CNI ou autres/N°NIC or Others", data["Numéro CNI du défunt"])}
            {renderField("Profession / Profession", data["Profession du défunt"])}
            {renderField("Domicile/Domicile", data["Domicile du défunt"])}

            {renderCheckboxField("Statut matrimonial / Marital status", [
              "Célibataire/Single", 
              "Marié(e) / Married", 
              "Divorcé(e)/Divorced", 
              "Veuf(ve)/Widow"
            ], data["Statut matrimonial du défunt"])}
          </View>

          {/* Section 2 - Décès */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Section 2 : INFORMATIONS SUR LE DECES / INFORMATION ON DEATH (Instruction n° 2)
            </Text>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '50%' }}>
                {renderField("*Date de décès / Date of death", formatDate(data["Date de décès"]))}
              </View>
              <View style={{ width: '50%' }}>
                {renderField("Heure du décès / Time of death", data["Heure de décès"])}
              </View>
            </View>

            {renderField("*Lieu du décès / place of death", data["Lieu du décès"])}

            {renderCheckboxField("Site du décès/death site", [
              "Hôpital/hospital", 
              "Communauté/community", 
              "Prison", 
              "Voie publique/road place",
              "Lieu de travail/work place",
              "Autre/others"
            ], data["Site du décès"])}

            {renderCheckboxField("Circonstances du décès / Circumstances of death", [
              "Maladie / Illness", 
              "Accident/Accident", 
              "Agression physique/Assault", 
              "Suicide/Suicide",
              "Guerre/War",
              "catastrophe naturelle/natural disaster",
              "Autre (à préciser)/others (please specify)"
            ], data["Circonstances du décès"])}
          </View>

          {/* Section 3 - Déclarant */}
          <View style={styles.section}>
          <Text style={{ marginTop: 10, fontSize: 9 }}>
            </Text>
            <Text style={{ marginTop: 10, fontSize: 9 }}>
            </Text>
            <Text style={{ marginTop: 10, fontSize: 9 }}>
            </Text>
            <Text style={styles.sectionTitle}>

              Section 3 : INFORMATIONS SUR LE DECLARANT / NOTIFIER INFORMATION (Instruction n° 3)
            </Text>

            {renderField("*Noms et Prenoms / Name and Surname", data["Noms et prénoms du déclarant"])}
            {renderField("*Qualité / Status", data["Qualité du déclarant"])}
            {renderField("Contact / Phone number", data["Contact du déclarant"])}

            <Text style={{ marginTop: 10, fontSize: 9 }}>
              Nous attestons que les informations contenues dans ce formulaire sont exactes.
            </Text>
            <Text style={{ fontSize: 9, marginBottom: 10 }}>
              Signature : (Père / Mère / Enfant/Conjoint/Personne en charge du défunt.) / Father / Mother / Child/Spouse/Person in charge of the deceased/
            </Text>

            {renderField("Signature du déclarant / Notifier signature", data["Signature du déclarant"])}
            {renderField("Date (jj/mm/aaaa-dd/mm/yyyy)", formatDate(data["Date de déclaration"]))}
          </View>

          {/* Section 4 - Officier */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Section 4 : PARTIE RÉSERVÉE À L'OFFICIER D'ÉTAT CIVIL / RESERVED SECTION OF THE CIVIL STATUS REGISTRAR
            </Text>

            <View style={{...styles.fieldRow, alignItems: 'flex-start'}}>
              <View style={{ width: '60%' }}>
              <Text style={{ fontSize: 9, marginBottom: 10 }}>
              J'atteste avoir reçu cette déclaration de décès / I testify to have received this birth declaration.
            </Text>
              </View>
              <View style={{ width: '40%' }}>
                {renderField("Signature", "")}
                {renderField("Date de réception (jj/mm/aaaa)/ réception date (dd/mm/yyyy)", currentDate)}
              </View>
            </View>
            
            {renderField("Nom et prénom / Name and Surname", data["Nom de l'officier d'état civil"])}
            {renderField("Qualité/Status", data["Qualité de l'officier"])}
            {renderField("Centre d'état civil/ Civil Status Registrar Office", data["Centre d'état civil"])}
          </View>
          {/* Pied de page */}
          
          <Text style={styles.footer}>
            
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

export default DeathCertificateTemplate;