import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Interface pour les props du template
interface TemplateProps {
  data: {
    // Informations officier d'état civil
    "Nom de l'officier d'état civil"?: string;
    "Lieu de l'état civil"?: string;
    
    // Informations déclarant (père)
    "Nom du déclarant"?: string;
    "Date de naissance du déclarant"?: string;
    "Lieu de naissance du déclarant"?: string;
    "Nom du père du déclarant"?: string;
    "Nom de la mère du déclarant"?: string;
    "Document de référence (CNI / passeport / acte de naissance)"?: string;
    "Profession du déclarant"?: string;
    "Téléphone du déclarant"?: string;
    
    // Informations enfant
    "Nom de l'enfant"?: string;
    'sexe'?: string;
    "Date de naissance de l'enfant"?: string;
    "Lieu de naissance de l'enfant"?: string;
    "Nom du père"?: string;
    "Nom de la mère"?: string;
    
    // Informations mère
    "Date de naissance de la mère"?: string;
    "Lieu de naissance de la mère"?: string;
    "Nationalité de la mère"?: string;
    "Profession de la mère"?: string;
    "Document de référence de la mère (CNI / passeport / acte de naissance)"?: string;
    
    // Informations grands-parents
    'Nom du pere de la fille '?: string;
    'Nationalité'?: string;
    'Nom de la mère de la fille'?: string;
    'Nationalité '?: string;
    
    // Témoins
    "Nom du témoin 1"?: string;
    "Date de naissance du témoin 1"?: string;
    "Lieu de naissance du témoin 1"?: string;
    "Profession du témoin 1"?: string;
    "Nationalité du témoin 1"?: string;
    "CNI du témoin 1"?: string;
    "Nom du témoin 2"?: string;
    "Date de naissance du témoin 2"?: string;
    "Lieu de naissance du témoin 2"?: string;
    "Profession du témoin 2"?: string;
    "Nationalité du témoin 2"?: string;
    "CNI du témoin 2"?: string;
    
    // Date
    "Date de déclaration"?: string;
  };
  previewMode?: boolean;
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 8,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  fieldLabel: {
    width: '30%',
    textAlign: 'left',
  },
  fieldValue: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'dotted',
    paddingBottom: 3,
  },
  centeredText: {
    textAlign: 'center',
    marginVertical: 5,
  },
  signatureSection: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signature: {
    width: '40%',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 5,
  },
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.4,
    fontFamily: 'Times-Roman',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
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
    marginVertical: 8,
    textDecoration: 'underline',
  },
  content: {
    marginTop: 6,
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
  
  signatureLine: {
    width: 200,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 5,
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
  
});

const RecognitionTemplate: React.FC<TemplateProps> = ({ data, previewMode = false }) => {
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

  const renderCombinedField = (label: string, value1?: string, connector: string = 'et de', value2?: string) => (
    <View style={styles.fieldLine}>
      <Text style={styles.fieldText}>{label}</Text>
      <View style={styles.dottedUnderlines}>
        <Text style={styles.fieldText}>{value1 || ' '}</Text>
      </View>
      <Text style={styles.fieldText}>{connector}</Text>
      <View style={styles.dottedUnderlines}>
        <Text style={styles.fieldText}>{value2 || ' '}</Text>
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
              <Text>Paix - Travail - Patrie</Text>
              <Text>******</Text>
              <Text>REGION</Text>
              <Text>****</Text>
              <Text>DÉPARTEMENT</Text>
              <Text>******</Text>
              <Text>ARRONDISSEMENT</Text>
              <Text>********</Text>
              <Text>Centre d'état civil</Text>
              <Text>******</Text>
            </View>
            <View style={styles.bilingualText}>
              <Text>REPUBLIC OF CAMEROON</Text>
              <Text>Peace - Work - Fatherland</Text>
              <Text>******</Text>
              <Text>REGION</Text>
              <Text>****</Text>
              <Text>DIVISION</Text>
              <Text>******</Text>
              <Text>SUB-DIVISION</Text>
              <Text>********</Text>
              <Text>Civil status center</Text>
              <Text>******</Text>
            </View>
          </View>

          {/* Titre principal */}
          <Text style={styles.title}>
            DECLARATION DE RECONNAISSANCE D'ENFANT NÉ HORS MARIAGE
          </Text>

          {/* Contenu */}
          <View style={styles.content}>
            {renderField("Le", formatDate(data["Date de déclaration"]))}
            {renderField("Ont comparu par devant nous", data["Nom de l'officier d'état civil"])}
            {renderField("Officier du Centre d'état civil de", data["Lieu de l'état civil"])}

            {/* Section Déclarant */}
            {renderField("Le nommé", data["Nom du déclarant"])}
            {renderFields("Né le", formatDate(data["Date de naissance du déclarant"]), "à", data["Lieu de naissance du déclarant"])}
            {renderCombinedField("Fils de", data["Nom du père du déclarant"], "et de", data["Nom de la mère du déclarant"])}
            {renderField("Document de référence :", data["Document de référence (CNI / passeport / acte de naissance)"])}
            {renderField("Profession", data["Profession du déclarant"])}
            {renderField("Téléphone", data["Téléphone du déclarant"])}
            {renderField("Qui déclare être le père naturel de l'enfant", data["Nom de l'enfant"])}
            {renderField("De sexe", data['sexe'])}

            {/* Section Enfant */}
            {renderFields("né(e) le", formatDate(data["Date de naissance de l'enfant"]), "à", data["Lieu de naissance de l'enfant"])}
            {renderCombinedField("Fils ou fille de", data["Nom du père"], "et de", data["Nom de la mère"])}

            {/* Section Mère */}
            {renderFields("Mère de l'enfant, né(e) le", formatDate(data["Date de naissance de la mère"]), "à", data["Lieu de naissance de la mère"])}
            {renderField("nationalité", data["Nationalité de la mère"])}
            {renderField("Profession", data["Profession de la mère"])}
            {renderField("Document de référence :", data["Document de référence de la mère (CNI / passeport / acte de naissance)"])}

            {/* Section Grands-parents */}
            {renderFields( "Fille de", formatDate(data['Nom du pere de la fille ']), "nationalité", data['Nationalité'])}
            {renderFields(  "et de", formatDate(data['Nom de la mère de la fille']), "nationalité", data['Nationalité '])}

            <Text>
              Qui déclare que son enfant susnommé(e) a été conçu(e) des œuvres du déclarant, et qu'elle accepte librement la reconnaissance dudit enfant par son père naturel.
            </Text>

            {/* Section Témoins */}
            <Text style={styles.centeredText}>Ont confirmé ces déclarations :</Text>
            {renderField("1er Témoin :", data["Nom du témoin 1"])}
            {renderFields("Né(e) le", formatDate(data["Date de naissance du témoin 1"]), "à", data["Lieu de naissance du témoin 1"])}
            {renderField("Profession", data["Profession du témoin 1"])}
            {renderField("Nationalité", data["Nationalité du témoin 1"])}
            {renderField("CNI n°", data["CNI du témoin 1"])}
            
            {renderField("2ème Témoin :", data["Nom du témoin 2"])}
            {renderFields("Né(e) le", formatDate(data["Date de naissance du témoin 2"]), "à", data["Lieu de naissance du témoin 2"])}
            {renderField("Profession", data["Profession du témoin 2"])}
            {renderField("Nationalité", data["Nationalité du témoin 2"])}
            {renderField("CNI n°", data["CNI du témoin 2"])}

          {/* Section finale */}
          <View style={styles.section}>
            <Text style={styles.centeredText}>
              En foi de quoi les présentes déclarations sont reçues et enregistrées conformément aux dispositions de l'article 44 de l'ordonnance n°81/02 du 29 juin 1981 modifiée et complétée par la loi n°2011/011 du 06 mai 2011.
            </Text>
          </View>

          {/* Signatures */}
          <Text style={styles.title}>
            Signature:
          </Text>
          <View style={styles.signatureSection}>
            <View style={styles.signature}>
              <Text>Père de l'enfant:</Text>
            </View>
            <View style={styles.signature}>
              <Text>1er Témoin :</Text>
            </View>
          </View>
          <View style={styles.signatureSection}>
            <View style={styles.signature}>
              <Text>Mère de l'enfant :</Text>
            </View>
            <View style={styles.signature}>
              <Text>2ème Témoin :</Text>
            </View>
          </View>
          <View style={[styles.signature, { width: '40%', marginLeft: 'auto', marginRight: 'auto' }]}>
            <Text>L'officier de l'état civil :</Text>
          </View>
          </View>
        </Page>
      </Document>
    );
  }

  // Rendu pour la prévisualisation HTML (optionnel)
  return (
    <div className="template-preview">
      {/* Implémentez ici le rendu HTML si nécessaire */}
    </div>
  );
};

export default RecognitionTemplate;