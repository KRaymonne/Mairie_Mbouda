import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface NaissanceActeProps {
  data: {
    // Informations sur l'enfant
    "Nom du centre"?: string;
    "Nom de l'enfant"?: string;
    "Date de naissance"?: string;
    "Lieu de naissance"?: string;
    "Sexe"?: string;
    
    // Informations sur le père
    "Nom du père"?: string;
    "Date de naissance père"?: string;
    "Lieu de naissance père"?: string;
    "Domicile père"?: string;
    "Profession père"?: string;
    
    // Informations sur la mère
    "Nom de la mère"?: string;
    "Date de naissance mère"?: string;
    "Lieu de naissance mère"?: string;
    "Domicile mère"?: string;
    "Profession mère"?: string;
    
    // Informations sur la déclaration
    "Date de déclaration"?: string;
    "Nom du déclarant"?: string;
    "Nom de l'officier"?: string;
    "Lieu de l'état civil"?: string;
    "Nom du secrétaire"?: string;
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
  fieldLine: {
    marginBottom: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  fieldLin: {
    marginBottom: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  fieldText: {
    fontWeight: 'normal',
  },
  content: {
    marginTop: 20,
    lineHeight: 0.7,
  },
  dottedUnderline: {
    borderBottomWidth: 1,
    borderBottomStyle: 'dotted',
    borderBottomColor: '#000',
    minWidth: 300,
    paddingBottom: 3,
    marginLeft: 4,
    marginRight: 4,
  },
  dottedUnderlines: {
    borderBottomWidth: 1,
    borderBottomStyle: 'dotted',
    borderBottomColor: '#000',
    minWidth: 150,
    paddingBottom: 3,
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
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 5,
    textAlign: 'center',
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

const NaissanceActeTemplate: React.FC<NaissanceActeProps> = ({ data }) => {
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
            <Text>**********</Text>
            <Text>PROVINCE</Text>
            <Text>*****</Text>
            <Text>DEPARTEMENT</Text>
            <Text>******</Text>
            <Text>ARRONDISSEMENT</Text>
            <Text>**********</Text>
          </View>
          <View style={styles.bilingualText}>
            <Text>REPUBLIC OF CAMEROON</Text>
            <Text>Peace - Work - Fatherland</Text>
            <Text>***********</Text>
            <Text>PROVINCE</Text>
            <Text>****</Text>
            <Text>DIVISION</Text>
            <Text>*****</Text>
            <Text>SUBDIVISION</Text>
            <Text>********</Text>
          </View>
        </View>

          <View style={styles.title}>
            <Text>CENTRE D'ETAT CIVIL</Text>
            <Text>CIVIL STATUS REGISTRATION CENTRE</Text>
          </View>
          {renderField("De - Of", data["Lieu de l'état civil"] || '......')}

        {/* Titre principal */}
        <Text style={styles.title}>
          ACTE DE NAISSANCE N° {'_____'}
        </Text>
        <View style={styles.content}>
        {/* Informations sur l'enfant */}
        {renderFielde("Nom de l'enfant :", data["Nom de l'enfant"])}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8  }]}>{"Name of the child"}</Text>
        
        {renderField("Le / On the : ", formatDate(data["Date de naissance"]))}
        {renderFielde("Est né à : ", data["Lieu de naissance"])}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8  }]}>{"Was born at"}</Text>  
        {renderFielde("Nom de l'enfant : ", data["Nom de l'enfant"])}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8  }]}>{"Name of the child"}</Text>  
        {renderField("De sexe - Sex : ", data["Sexe"])}
          
        {/* Informations sur le père */}
        {renderField("De - Of : ", data["Nom du père"])}
        {renderField("Né à - Born at : ", data["Lieu de naissance père"])}
        {renderField("Le / On the : ", data["Date de naissance père"])}
        {renderFielde("Domicilié à : ", data["Domicile père"])}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8  }]}>{"Resident at"}</Text>  
        {renderFielde("Profession : ", data["Profession père"])}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8  }]}>{"Occupation"}</Text>  

        {/* Informations sur la mère */}
        {renderField("Et de / And of : ", data["Nom de la mère"])}
        {renderField("Né à - Born at : ", data["Lieu de naissance mère"])}
        {renderField("Le / On the : ", data["Date de naissance mère"])}
        {renderFielde("Domicilié à : ", data["Domicile mère"])}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8  }]}>{"Resident at"}</Text>  
        {renderFielde("Profession : ", data["Profession mère"])}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8  }]}>{"Occupation"}</Text>  

        {/* Informations sur la déclaration */}
        {renderFielde("Dressé le : ", formatDate(data["Date de déclaration"]))}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8  }]}>{"Drawn up on the"}</Text>  
        {renderFielde("Sur la déclaration de : ", data["Nom du déclarant"])}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8  }]}>{"In accordance with the declaration of"}</Text>  
         
        <Text style={{ marginTop: 15 }}>
          Lesquels ont certifié la sincérité de la présente déclaration,
        </Text>
        <Text>Who attested to the truth of this declaration,</Text>

        
        {renderFielde("Par Nous : ", ".....")}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8  }]}>{"By us,"}</Text>  
        {renderFielde("Officier de l'état civil de : ", data["Lieu de l'état civil"])}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8  }]}>{"Civil status Registrar for"}</Text>  
        {renderFielde("Assisté de : ", data["Nom du secrétaire"] || '......')}
          <Text style={[styles.fieldText, { marginLeft: 10, marginBottom:8  }]}>{"In the presence of"}</Text>  

        {/* Signature */}
        <View style={styles.signatureSection}>
            <View style={{textAlign:"center"}}>
              <Text>Secretaire d'état civil</Text>
              <Text style={{textAlign:"center"}}>Civil status Registrar-</Text>
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

export default NaissanceActeTemplate;