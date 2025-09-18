import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface PermisConduireProps {
    data: {
        "Nom & Prenom"?:string;
        "Numéro de téléphone"?:string;
        "Adresse email"?:string;
        "Type de permis demandé"?: string;
        "Nationalité"?:string;
        "Numéro de la pièce d'identité"?:string;
    };
    formType:"civil" | "Service";
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
    section: {
        marginBottom: 10,
        lineHeight: 0.7,
      },
    sectionTitle: {
        fontWeight: 'bold',
        textAlign:"center",
        marginBottom: 5,
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
    fieldRow: {
      flexDirection: 'row',
      marginBottom: 5,
      alignItems: 'center',
    },
    fieldLabel: {
      width: '30%',
      fontWeight: 'bold',
    },
    signatureSection: {
      marginTop: 40,
      textAlign: 'right',
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
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 10,
      marginBottom: 5,
      width: '45%', // Pour organiser en 2 colonnes
    },
    checkboxGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
      marginBottom: 8,
      width: '45%',
    },
    checkboxSelected: {
      backgroundColor: '#000',
    },
    checkboxLabel: {
      fontSize: 9,
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
  
  const PermisConduireTemplate: React.FC<PermisConduireProps> = ({ data,formType }) => {
    // Convertit les données "Nature travaux" en tableau si nécessaire
    const isCivilForm = formType === "civil";
    
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
            DEMANDE DE PERMIS DE CONDUIRE N° ______
          </Text>
  
          {/* Contenu */}
          <View style={styles.content}>
            <Text style={styles.fieldLine}>
              Le Maire de la Commune de Mbouda (Officier d'état-civil),
            </Text>
  {!isCivilForm &&(
    <View style={styles.section}>
          <Text style={styles.sectionTitle}>DEMANDEUR</Text>
          {renderField("Mr/mme :", data["Nom & Prenom"])}
    </View>
  )}
            {renderField("Numero de télephone", data["Numéro de téléphone"])}
            {renderField("Adresse email", data["Adresse email"])}
            {renderCheckboxField("Type de permis ", [
              "Permis A",
              "Permis B",
              "Permis C",
            ], data["Type de permis demandé"])}
            {renderField("Nationalité", data["Nationalité"])}
            {renderField("N° CNI", data["Numéro de la pièce d'identité"])}
          </View>
  
  
          {/* Formule de validation */}
  
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
  
  export default PermisConduireTemplate;