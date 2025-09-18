import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface DeathCertificateProps {
  data: {
    // Informations sur le défunt
    "Centre d'etat civil"?:string;
    "Nom du défunt"?: string;
    "Prénom du défunt"?: string;
    "Date de décès"?: string;
    "Lieu de décès"?: string;
    "nom"?: string;
    "Date de naissance"?: string;
    "Lieu de naissance"?: string;
    "Sexe"?: string;
    "Situation matrimoniale"?: string;
    "Profession"?: string;
    "Domicile"?: string;
    "Fils/Fille de"?: string;
    "Et de"?: string;
    
    // Informations sur la déclaration
    "Date de dressage"?: string;
    "Nom du déclarant"?: string;
    "Profession du déclarant"?: string;
    "Qualité du déclarant"?: string;
    
    // Informations sur les témoins
    "Nom témoin 1"?: string;
    "Profession témoin 1"?: string;
    "Résidence témoin 1"?: string;
    "Nom témoin 2"?: string;
    "Profession témoin 2"?: string;
    "Résidence témoin 2"?: string;
    
    // Informations officielles
    "Numéro d'acte"?: string;
    "Officier d'état civil"?: string;
    "Secrétaire d'état civil"?: string;
    "Date d'enregistrement"?: string;
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
  fieldLin: {
    marginBottom: 1,
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
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  column: {
    width: '48%',
  },
});

const DeathCertificateTemplate: React.FC<DeathCertificateProps> = ({ data }) => {
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
  const renderFielde = (label: string, value?: string) => (
    <View style={styles.fieldLin}>
      <Text style={styles.fieldText}>{label}</Text>
      <View style={styles.dottedUnderline}>
        <Text style={styles.fieldText}>{value || ' '}</Text>
      </View>
    </View>
  );

  const renderBilingualField = (labelFr: string, labelEn: string, value?: string) => (
    <View style={styles.fieldLine}>
      <Text style={styles.fieldText}>{labelFr}</Text>
      <View style={styles.dottedUnderline}>
        <Text style={styles.fieldText}>{value || ' '}</Text>
      </View>
      <Text style={[styles.fieldText, { marginLeft: 10 }]}>{labelEn}</Text>
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
            <Text>Paix - Travail - Patrie</Text>
            <Text>*************</Text>
            <Text>REGION DE L'OUEST</Text>
            <Text>*********</Text>
            <Text>DEPARTEMENT DES BAMBOUTOS</Text>
            <Text>*************</Text>
            <Text>COMMUNE DE MBOUDA</Text>
            <Text>*******</Text>
          </View>
          <View style={styles.bilingualText}>
            <Text>REPUBLIC OF CAMEROON</Text>
            <Text>Peace - Work - Fatherland</Text>
            <Text>**************</Text>
            <Text>WEST REGION</Text>
            <Text>*****</Text>
            <Text>BAMBOUTOS DIVISION</Text>
            <Text>*********</Text>
            <Text>MBOUDA COUNCIL</Text>
            <Text>******</Text>
          </View>
        </View>
        <Text style={styles.title}>
          CENTRE D'ETAT CIVIL / CIVIL STATUTS REGISTATION CENTRE 
          </Text>
          {renderField("de - of", data["Centre d'etat civil"])}
          <Text style={{fontSize:12}}>
          Centre d'état civil de rattachement (pour les centres secondaires) 
          </Text>
          <Text style={{fontSize:12}}>
          Main civil status registry of attachment (for secondary civil status registry)
          </Text>
          {renderField("", data["Centre d'etat civil"])}
          
        
        {/* Titre principal */}
        <Text style={styles.title}>
          ACTE DE DECES / DEATH CERTIFICATE N°: /    /      /  /   /
        </Text>

        {/* Contenu */}
        <View style={styles.content}>
          {/* Section 1 - Informations sur le défunt */}
          {renderBilingualField("Nom du (de la) décédé(e) :", "Surname of deceased:", data["Nom du défunt"])}
          {renderBilingualField("Prénom du (de la) décédé(e) :", "Given name of deceased:", data["Prénom du défunt"])}
          {renderFields("Décédé(e) le :", formatDate(data["Date de décès"]), "A - At:", data["Lieu de décès"])}
          
          
          {renderField("De sexe :", data["Sexe"])}
          {renderField("Situation matrimoniale :", data["Situation matrimoniale"])}  
          {renderField("Profession :", data["Profession"])}
          {renderField("Domicilié(e) à :", data["Domicile"])}
            

          {renderField("Fils ou Fille de :", data["Fils/Fille de"])}
          {renderField("Et de :", data["Et de"])}

          {/* Section 2 - Informations sur la déclaration */}
          {renderField("Dressé le :", formatDate(data["Date de dressage"]))}
          {renderField("Sur la déclaration de :", data["Nom du déclarant"])}

          {renderFielde("Nom et prénoms :", data["Nom du déclarant"])}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8  }]}>{"Name and Surname:"}</Text>
          {renderFielde("Profession :", data["Profession du déclarant"])}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8  }]}>{"Occupation:"}</Text>
          
          <Text style={{ marginBottom: 8 }}>
            Qualité (chef de famille, parent du défunt, personne ayant eu connaissance certaine des décès, 
            chef d'établissement hospitalier ou pénitentiaire) / 
            Capacity (Head of the family, relative of the deceased, person who has had full knowledge 
            of the death, head of the medical institution or of the prison):
          </Text>
          <View style={styles.dottedUnderline}>
            <Text style={styles.fieldText}>{data["Qualité du déclarant"] || ' '}</Text>
          </View>

          {/* Section 3 - Témoins */}
          <Text style={{ marginTop: 15, marginBottom: 5 }}>
            Premier témoin - First witness
          </Text>
          {renderFielde("Nom et prénoms :", data["Nom témoin 1"])}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8  }]}>{"Name and Surname:"}</Text>
          {renderFielde("Profession :", data["Profession témoin 1"])}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8  }]}>{"Occupation:"}</Text>
          {renderFielde("Résidence :", data["Résidence témoin 1"])}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8 }]}>{"Place of residence:"}</Text>

          <Text style={{ marginTop: 10, marginBottom: 5 }}>
            Deuxième témoin - Second witness
          </Text>
          {renderFielde("Nom et prénoms :", data["Nom témoin 2"])}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8  }]}>{"Name and Surname:"}</Text>
          {renderFielde("Profession :", data["Profession témoin 2"])}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8  }]}>{"Occupation:"}</Text>
          {renderFielde("Résidence :", data["Résidence témoin 2"])}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8 }]}>{"Place of residence:"}</Text>

          <Text style={{ marginTop: 10 }}>
            Lesquels ont certifié la sincérité de la présente déclaration, / 
            Who attested to the truth of this declaration,
          </Text>
          <Text>
              Par nous : {data["Officier d'état civil"] || '______'}
            </Text>
            <Text>
              Officier d'état civil - Civil status registrar
            </Text>
            <Text>
              Assisté de : {data["Secrétaire d'état civil"] || '______'}
            </Text>
          {/* Section 4 - Officier d'état civil */}
          <Text style={{textAlign:"center"}}>
          {renderField("Le - On the ", formatDate(new Date().toISOString()) || '______')}
          </Text>
          <View style={styles.signatureSection}>
            <View style={{textAlign:"center"}}>
              <Text>Secretaire d'état civil</Text>
              <Text style={{textAlign:"center"}}>Secretary</Text>
            </View>
            <View style={{textAlign:"center"}}>
              <Text>Signature de l'officie d'état civil</Text>
              <Text style={{textAlign:"center"}}>Signature of Registrar</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default DeathCertificateTemplate;