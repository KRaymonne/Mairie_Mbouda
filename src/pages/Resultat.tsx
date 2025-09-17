import React from 'react';

const proceduresData = [
  {
    nomMairie: 'Mbouda',
    idProcedure: '01',
    nomProcedure: "DECLARATION DE RECONNAISSANCE D\'ENFANT NÉ HORS MARIAGE",
    codeUnique: 'MBDHM0101',
    annee: '2025',
    mois: 'janvier',
    jour: '15',
    statut: 'Terminé'
  },
  {
    nomMairie: 'Mbouda',
    idProcedure: '02',
    nomProcedure: 'DÉCLARATION DE DÉCÈS',
    codeUnique: 'MBDD0201',
    annee: '2025',
    mois: 'avril',
    jour: '03',
    statut: 'En cours'
  },
  {
    nomMairie: 'Mbouda',
    idProcedure: '03',
    nomProcedure: 'DÉCLARATION DE NAISSANCE',
    codeUnique: 'MBDN0301',
    annee: '2025',
    mois: 'mars',
    jour: '22',
    statut: 'Incomplet'
  },
];

const stats = {
  totalProcedures: 3,
  proceduresTerminees: 1,
  proceduresEnCours: 1,
  dossiersIncomplets: 1
};

const App = () => {
  // Couleurs officielles adaptées à une mairie
  const colors = {
    primary: '#145DA0', // Bleu marine officiel
    secondary: '#2E8BC0', // Bleu institutionnel
    accent: '#0C2D48',  // Bleu foncé
    light: '#B1D4E0',   // Bleu clair
    success: '#4CAF50', // Vert administratif
    warning: '#FFC107', // Or
    danger: '#F44336'   // Rouge (pour les alertes)
  };

  return (
    <div style={{
      padding: '30px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
    }}>
      {/* En-tête simplifié */}
      <header style={{
        textAlign: 'center',
        marginBottom: '40px',
        padding: '30px',
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
        borderRadius: '12px',
        color: 'white',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
        borderBottom: `4px solid ${colors.warning}`
      }}>
        <h1 style={{
          fontSize: '2.8rem',
          margin: '0',
          fontWeight: '700',
          letterSpacing: '1px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
        }}>Mairie de Mbouda</h1>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '300',
          margin: '10px 0 0',
          opacity: '0.9',
          fontStyle: 'italic'
        }}>Tableau de Bord Administratif</h2>
      </header>

      {/* Cartes de statistiques */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{
          borderRadius: '12px',
          padding: '25px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          borderTop: `4px solid ${colors.warning}`
        }}>
          <div style={{
            fontSize: '3rem',
            fontWeight: '700',
            margin: '15px 0',
          }}>
            {stats.totalProcedures}
          </div>
          <p style={{
            margin: '0',
            fontSize: '1.2rem',
            fontWeight: '500'
          }}>Procédures enregistrées</p>
          <div style={{
            marginTop: '10px',
            fontSize: '0.9rem',
            opacity: '0.8'
          }}>Ce mois-ci</div>
        </div>

        <div style={{
          borderRadius: '12px',
          padding: '25px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          background: `linear-gradient(135deg, ${colors.success}, #2E7D32)`,
          borderTop: `4px solid ${colors.light}`
        }}>
          <div style={{ fontSize: '3rem', fontWeight: '700', margin: '15px 0' }}>
            {stats.proceduresTerminees}
          </div>
          <p style={{ margin: '0', fontSize: '1.2rem', fontWeight: '500' }}>Procédures terminées</p>
          <div style={{ marginTop: '10px', fontSize: '0.9rem', opacity: '0.8' }}>
            {Math.round((stats.proceduresTerminees / stats.totalProcedures) * 100)}% du total
          </div>
        </div>

        <div style={{
          borderRadius: '12px',
          padding: '25px',
          textAlign: 'center',
          color: colors.accent,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          background: `linear-gradient(135deg, ${colors.light}, #FFFFFF)`,
          borderTop: `4px solid ${colors.secondary}`
        }}>
          <div style={{ fontSize: '3rem', fontWeight: '700', margin: '15px 0' }}>
            {stats.proceduresEnCours}
          </div>
          <p style={{ margin: '0', fontSize: '1.2rem', fontWeight: '500' }}>En cours de traitement</p>
          <div style={{ marginTop: '10px', fontSize: '0.9rem', opacity: '0.8' }}>
            En attente de validation
          </div>
        </div>

        <div style={{
          borderRadius: '12px',
          padding: '25px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          background: `linear-gradient(135deg, ${colors.danger}, #C62828)`,
          borderTop: `4px solid ${colors.warning}`
        }}>
          <div style={{ fontSize: '3rem', fontWeight: '700', margin: '15px 0' }}>
            {stats.dossiersIncomplets}
          </div>
          <p style={{ margin: '0', fontSize: '1.2rem', fontWeight: '500' }}>Dossiers incomplets</p>
          <div style={{ marginTop: '10px', fontSize: '0.9rem', opacity: '0.8' }}>
            Nécessitent une action
          </div>
        </div>
      </div>

      {/* Tableau des procédures avec code incluant jour et mois */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left'
        }}>
          <thead>
            <tr style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              color: 'white'
            }}>
              <th style={{ padding: '18px 20px', fontWeight: '500' }}>Mairie</th>
              <th style={{ padding: '18px 20px', fontWeight: '500' }}>ID</th>
              <th style={{ padding: '18px 20px', fontWeight: '500' }}>Procédure</th>
              <th style={{ padding: '18px 20px', fontWeight: '500' }}>Code</th>
              <th style={{ padding: '18px 20px', fontWeight: '500' }}>Jour</th>
              <th style={{ padding: '18px 20px', fontWeight: '500' }}>Mois</th>
              <th style={{ padding: '18px 20px', fontWeight: '500' }}>Année</th>
              <th style={{ padding: '18px 20px', fontWeight: '500' }}>Statut</th>
            </tr>
          </thead>
          <tbody>
            {proceduresData.map((procedure, index) => (
              <tr key={index} style={{
                borderBottom: '1px solid #eee'
              }}>
                <td style={{ padding: '15px 20px', fontWeight: '500' }}>{procedure.nomMairie}</td>
                <td style={{ padding: '15px 20px', fontWeight: '500' }}>{procedure.idProcedure}</td>
                <td style={{ padding: '15px 20px' }}>{procedure.nomProcedure}</td>
                <td style={{ padding: '15px 20px', color: colors.secondary, fontWeight: '500' }}>{procedure.codeUnique}</td>
                <td style={{ padding: '15px 20px' }}>{procedure.jour}</td>
                <td style={{ padding: '15px 20px' }}>{procedure.mois}</td>
                <td style={{ padding: '15px 20px' }}>{procedure.annee}</td>
                <td style={{ padding: '15px 20px' }}>
                  <span style={{
                    padding: '5px 10px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '500'
                  }}>
                    {procedure.statut}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pied de page institutionnel */}
      <footer style={{
        marginTop: '40px',
        textAlign: 'center',
        padding: '20px',
        color: colors.primary,
        fontSize: '0.9rem'
      }}>
        <p>© {new Date().getFullYear()} Mairie de Mbouda - Tous droits réservés</p>
        <p style={{ marginTop: '5px', opacity: '0.7' }}>
          Service des Administrations Générales - Direction des Affaires Civiles
        </p>
      </footer>
    </div>
  );
};

export default App;