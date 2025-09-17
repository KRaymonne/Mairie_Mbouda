import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface AccessibiliteProps {
  data: {
    "Nom de l'entreprise"?: string;
    "nom et prenom du demandeur"?: string;
    "Superficie"?: string;
    "Lieu "?: string;
    "Date de delivrance"?: string;
    "Nom du projet"?: string;
    "Description du projet d'accessibilité"?: string;
    "Budget estimé"?: string;
    "Nom de l'architecte responsable du projet"?: string;
    "Mode de financement"?: string;
   };
   formType:"civil" | "Service";
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    lineHeight: 1.4,
    fontFamily: 'Times-Roman',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
    lineHeight: 1.5,
  },
  fieldLine: {
    marginBottom: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  fieldText: {
    fontWeight: 'normal',
  },
  underlinedText: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
    minWidth: 200,
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
  department: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  ville: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  destinataire: {
    marginBottom: 20,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bulletPoint: {
    width: 10,
  },
  listText: {
    flex: 1,
  },
});

const AccessibiliteTemplate: React.FC<AccessibiliteProps> = ({ data, formType }) => {
  const isCivilForm = formType === "civil";
  const currentDate = new Date().toLocaleDateString('fr-FR');
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête bilingue */}
        <View style={styles.header}>
          <View style={styles.bilingualText}>
            <Text>REPUBLIQUE DU CAMEROUN</Text>
            <Text>Paix - Travail - Patrie</Text>
            <Text>********</Text>
            <Text>REGION DE L'OUEST</Text>
            <Text>********</Text>
            <Text>DEPARTEMENT DES BAMBOUTOS</Text>
            <Text>********</Text>
            <Text>COMMUNE DE MBOUDA</Text>
            <Text>********</Text>
            <Text>SECRETARIAT GENERAL</Text>
            <Text>********</Text>
            <Text>SERVICE TECHNIQUE</Text>
            <Text>*********</Text>
          </View>
          <View style={styles.bilingualText}>
            <Text>REPUBLIC OF CAMEROON</Text>
            <Text>Peace - Work - Fatherland</Text>
            <Text>*********</Text>
            <Text>WEST REGION</Text>
            <Text>********</Text>
            <Text>BAMBOUTOS DIVISION</Text>
            <Text>********</Text>
            <Text>MBOUDA COUNCIL</Text>
            <Text>********</Text>
            <Text>GENERAL SECRETARIAT</Text>
            <Text>********</Text>
            <Text>TECHNICAL SERVICE</Text>
            <Text>********</Text>
          </View>
        </View>

        {/* Titre principal */}
        <Text style={styles.title}>
          CERTIFICAT D'ACCESSIBILITE N°{'__'}/CA/C/MDA/SG/ST
        </Text>

        {/* Département et ville */}
        <Text style={styles.department}>Département des Bamboutos</Text>
        <Text style={styles.ville}>Ville de Mbouda</Text>

        {/* Destinataire */}
        {isCivilForm &&(
            <View>
              <Text style={styles.destinataire}>Madame / Monsieur {data["nom et prenom du demandeur"] || '__________'}</Text>

            </View>
          )}
          {!isCivilForm &&(
            <View>
                  <Text style={styles.destinataire}>A l'attention de {data["Nom du projet"] || '__________'}</Text>
                  </View>
          )}
        {/* Contenu */}
        <View style={styles.content}>
          <Text>
            Comme suite à votre demande et au vue des documents présentés concernant l'immeuble rural bâti d'une superficie d'environ {data["Superficie"] || '______'}m² en voie d'immatriculation dans le livre foncier du Département des Bamboutos et dont votre terrain en fait partie au lieu dit {data["Lieu "] || '__________'} et vous appartenant.
          </Text>

          <Text style={{ marginTop: 15 }}>
            J'ai l'honneur de vous faire connaître que conformément à la circulaire N°..007/Y5/MINUH/D000 du 03 Mai 1986, votre terrain est bien accessible et se trouve à l'intérieur du périmètre règlementé par les règlements généraux d'Urbanisme.
          </Text>

          <Text style={{ marginTop: 15, fontWeight: 'bold' }}>
            SERVITUDE GREVANT LE TERRAIN :
          </Text>

          <View style={{ marginLeft: 10 }}>
            <View style={styles.listItem}>
              <Text style={styles.bulletPoint}>-</Text>
              <Text style={styles.listText}>Deux routes non dénommées de largeurs 6m chacune</Text>
            </View>
          </View>

          <Text style={{ marginTop: 10, fontWeight: 'bold' }}>
            LE DIT TERRAIN EST CONSTRUCTIBLE
          </Text>

          <Text style={{ marginTop: 15 }}>
            En foi de quoi le présent certificat d'accessibilité lui est délivré pour servir et valoir ce que de droit. 
          </Text>
        </View>

        {/* Signature */}
        <View style={styles.signatureSection}>
          <Text>
            Mbouda le {currentDate}
          </Text>
          <Text>Le Maire,</Text>
        </View>
        
      </Page>
    </Document>
  );
};

export default AccessibiliteTemplate;