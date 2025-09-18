import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface BirthDeclarationProps {
  data: {
    // Section 1 - Enfant
    "Nom de l'enfant"?: string;
    "Prénoms de l'enfant"?: string;
    "Date de naissance"?: string;
    "Lieu de naissance"?: string;
    "Sexe"?: string;
    "Type de naissance"?: string;
    "Rang de naissance"?: string;
    "Poids"?: string;
    "Taille"?: string;
    "Assistant à l'accouchement"?: string;

    // Section 2 - Mère
    "Nom et prénoms de la mère"?: string;
    "Lieu de naissance mère"?: string;
    "Date de naissance mère"?: string;
    "Domicile mère"?: string;
    "Durée résidence mère"?: string;
    "Profession mère"?: string;
    "Contact mère"?: string;
    "Situation matrimoniale mère"?: string;
    "Niveau scolaire mère"?: string;
    "Nationalité mère"?: string;
    "CNI mère"?: string;
    "Nombre enfants vivants"?: string;
    "Nombre décès foetaux"?: string;
    "Date dernier décès"?: string;

    // Section 3 - Père
    "Nom et prénoms du père"?: string;
    "Date de naissance père"?: string;
    "Lieu de naissance père"?: string;
    "Domicile père"?: string;
    "Contact père"?: string;
    "Profession père"?: string;
    "Niveau scolaire père"?: string;
    "Nationalité père"?: string;
    "CNI père"?: string;

    // Section 4 - Déclarant
    "Nom et prénoms déclarant"?: string;
    "Qualité déclarant"?: string;
    "Contact déclarant"?: string;
    "Signature déclarant"?: string;
    "Date déclaration"?: string;

    // Section 5 - Officier
    "Nom officier"?: string;
    "Qualité officier"?: string;
    "Centre état civil"?: string;
    "Numéro déclaration"?: string;
    "Date réception"?: string;
  };
  previewMode?: boolean;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    lineHeight: 1.1,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signature: {
    width: '40%',
    marginTop: 30,
    borderTopWidth: 0.5,
    borderTopColor: '#000',
    paddingTop: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
  },
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
  },
  instructionText: {
    fontSize: 8,
    marginBottom: 10,
    fontStyle: 'italic',
  },
});

const BirthDeclarationTemplate: React.FC<BirthDeclarationProps> = ({ data, previewMode = false }) => {
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

  const renderTwoColumnField = (leftLabel: string, leftValue: string | undefined, rightLabel: string, rightValue: string | undefined) => (
    <View style={styles.fieldRow}>
      <View style={{ width: '48%', flexDirection: 'row' }}>
        <Text style={styles.fieldLabel}>{leftLabel}</Text>
        <Text style={styles.fieldValue}>{leftValue || '......'}</Text>
      </View>
      <View style={{ width: '48%', flexDirection: 'row' }}>
        <Text style={styles.fieldLabel}>{rightLabel}</Text>
        <Text style={styles.fieldValue}>{rightValue || '......'}</Text>
      </View>
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
              <Text>Région : ______</Text>
              <Text>Département : ______</Text>
              <Text>Arrondissement : ______</Text>
              <Text>District de Santé : ______</Text>
              <Text>Aire de santé : ______</Text>
              <Text>Formation Sanitaire : ______</Text>
              <Text>Ville ou Village ou Quartier : ______</Text>
            </View>
            <View style={styles.bilingualText}>
              <Text>REPUBLIC OF CAMEROON</Text>
              <Text>Peace-Work-Fatherland</Text>
              <Text>Région : ______</Text>
              <Text>Division : ______</Text>
              <Text>Subdivision : ______</Text>
              <Text>Health District : ______</Text>
              <Text>Health Facility : ______</Text>
              <Text>Town or Village or Quartier : ______</Text>
            </View>
          </View>

          {/* Titre principal */}
          <Text style={styles.title}>
            DECLARATION DE NAISSANCE / BIRTH DECLARATION NO. {data["Numéro déclaration"] || '______'}
          </Text>

          <Text style={styles.instructionText}>
            Bien vouloir lire attentivement les instructions avant de remplir le formulaire/Kindly read the instructions before completing this form
          </Text>

          {/* Section 1 - Enfant */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Section 1 : Renseignements sur l'enfant / Child's informations (instruction N24)
            </Text>
            
            {renderTwoColumnField("Nom/Name :", data["Nom de l'enfant"], "Prénoms/Surname", data["Prénoms de l'enfant"])}
            {renderTwoColumnField(
              "*Date de naissance/Date of Birth :", 
              formatDate(data["Date de naissance"]), 
              "*Lieu de naissance/Place of Birth :", 
              data["Lieu de naissance"]
            )}
            
            {renderCheckboxField("*Sexe/Sex :", ["Masculin/Male", "Féminin/Female"], data["Sexe"])}
            
            {renderTwoColumnField(
              "Type de naissance / Type of birth :", 
              data["Type de naissance"], 
              "Rang de naissance / Rank of birth :", 
              data["Rang de naissance"]
            )}
            
            {renderTwoColumnField(
              "Poids de l'enfant / Weight of child :", 
              data["Poids"], 
              "Taille de l'enfant / Height of child :", 
              data["Taille"]
            )}
            
            <Text style={{...styles.fieldLabel, marginBottom: 5}}>
              Personne ayant assisté la mère au moment de l'accouchement :
            </Text>
            {renderCheckboxField("", [
              "Médecin/Doctor", 
              "Sage femme/Midwife", 
              "Infirmière/Nurse", 
              "Accouchement à domicile/Home birth",
              "Aucune/None"
            ], data["Assistant à l'accouchement"])}
          </View>

          {/* Section 2 - Mère */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Section 2 : Renseignements sur la mère / Mother's Information (instruction N22)
            </Text>
            
            {renderField("Nom et Prénoms / Name and Surname :", data["Nom et prénoms de la mère"])}
            {renderTwoColumnField(
              "Date de naissance / Date of birth :", 
              data["Date de naissance mère"], 
              "Lieu de naissance /Place of birth :", 
              data["Lieu de naissance mère"]
            )}
            {renderTwoColumnField(
              "Domicile / Domicile :", 
              data["Domicile mère"], 
              "Durée de la résidence / Duration of residence :", 
              data["Durée résidence mère"]
            )}
            
            {renderTwoColumnField(
              "Profession / Profession :", 
              data["Profession mère"], 
              "Contact / Phone number :", 
              data["Contact mère"]
            )}
            
            {renderCheckboxField("Situation matrimoniale / Marital Status :", [
              "Mariée/Maried", 
              "Divorcée/Divorced", 
              "Veuve/Widow",
              "Célibataire/Single"
            ], data["Situation matrimoniale mère"])}
            
            {renderCheckboxField("Niveau de scolarité / Level of education :", [
              "Primaire/Primary", 
              "Secondaire/Secondary", 
              "Supérieur/Higher",
              "Sans/None"
            ], data["Niveau scolaire mère"])}
            
            {renderTwoColumnField(
              "Nationalité / Nationality :", 
              data["Nationalité mère"], 
              "N°CNI ou autres/N°NIC or Others :", 
              data["CNI mère"]
            )}
            
            {renderTwoColumnField(
              "Nombre d'enfants vivant durant sa vie :", 
              data["Nombre enfants vivants"], 
              "Nombre de décès foetaux :", 
              data["Nombre décès foetaux"]
            )}
            
            {renderField("Date dernier décès vivant :", formatDate(data["Date dernier décès"])||"    ")}
          </View>

          {/* Section 3 - Père */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Section 3 : Renseignements sur le père / Father's information (instruction n6-3)
            </Text>
            
            {renderField("Nom et Prénoms / Name and Surname :", data["Nom et prénoms du père"])}
            {renderTwoColumnField(
              "Date de naissance / Date of birth :", 
              data["Date de naissance père"], 
              "Lieu de naissance / Place of birth :", 
              data["Lieu de naissance père"]
            )}
            {renderTwoColumnField(
              "Domicile / Domicile :", 
              data["Domicile père"], 
              "Contact / Phone number :", 
              data["Contact père"]
            )}
            
            {renderTwoColumnField(
              "Profession / Profession :", 
              data["Profession père"], 
              "Contact / Phone number :", 
              data["Contact père"]
            )}
            
            {renderCheckboxField("Niveau de scolarité / Level of education :", [
              "Primaire/Primary", 
              "Secondaire/Secondary", 
              "Supérieur/Higher",
              "Sans/None"
            ], data["Niveau scolaire père"])}
            
            {renderTwoColumnField(
              "Nationalité / Nationality :", 
              data["Nationalité père"], 
              "N°CNI ou autres/N°NIC or Others :", 
              data["CNI père"]
            )}
          </View>

          {/* Section 4 - Déclarant */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Section 4 : Renseignements sur le déclarant / Declarant's information
            </Text>
            
            {renderField("Nom et Prénoms / Name and Surname :", data["Nom et prénoms déclarant"])}
            {renderField("*Qualité / Status :", data["Qualité déclarant"])}
            {renderField("Contact / Phone number :", data["Contact déclarant"])}
            
            <View style={{...styles.fieldRow, marginTop: 10}}>
              <View style={{ width: '60%' }}>
                <Text style={{ fontSize: 9 }}>
                  Nous attestons que les informations contenues dans ce formulaire sont exactes. / 
                  We testify that the information provided in this form are valid.
                </Text>
              </View>
              <View style={{ width: '40%' }}>
                {renderField("Signature du déclarant / Declarant signature", data["Signature déclarant"])}
                {renderField("Date (jj/mm/aaaa-dd/mm/yyyy)", formatDate(data["Date déclaration"]))}
              </View>
            </View>
          </View>

          {/* Section 5 - Officier */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Section 5 : Accusé de réception de l'Office d'état civil : Acknowledgement et receipt of the Civil Status Registrar
            </Text>
            
            <View style={{...styles.fieldRow, alignItems: 'flex-start'}}>
              <View style={{ width: '60%' }}>
                <Text style={{ fontSize: 9 }}>
                  Atteste avoir reçu cette déclaration de naissance / 
                  I testify to have received this birth declaration.
                </Text>
              </View>
              <View style={{ width: '40%' }}>
                {renderField("Signature", "")}
                {renderField("Date de réception (jj/mm/aaaa)/ réception date (dd/mm/yyyy)", currentDate)}
              </View>
            </View>
            
            {renderField("Nom et prénom / Name and Surname :", data["Nom officier"])}
            {renderField("Qualité/Status :", data["Qualité officier"])}
            {renderField("Centre d'état civil/ Civil Status Registrar Office", data["Centre état civil"])}
          </View>

          {/* Pied de page */}
          
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

export default BirthDeclarationTemplate;