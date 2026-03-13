// ===========================================
// Validador de CNPJ Alfanumérico para Firebase
// Pode ser usado no Cloud Functions ou Frontend
// ===========================================

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

function validaCnpjAlfa(cnpj) {
  if (!cnpj) return false;
  
  // Remove formatação
  const limpo = cnpj.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  
  // Verifica tamanho e se é tudo zero
  if (limpo.length !== 14 || limpo.substring(0, 12) === "000000000000") {
    return false;
  }

  const base = limpo.substring(0, 12);
  const dvEsperado = limpo.substring(12, 14);
  const pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  
  let soma1 = 0;
  let soma2 = 0;

  for (let i = 0; i < 12; i++) {
    const val = base.charCodeAt(i) - 48; // ASCII - 48
    soma1 += val * pesos[i + 1];
    soma2 += val * pesos[i];
  }

  const r1 = soma1 % 11;
  const dv1 = r1 < 2 ? 0 : 11 - r1;
  
  soma2 += dv1 * pesos[12];
  const r2 = soma2 % 11;
  const dv2 = r2 < 2 ? 0 : 11 - r2;

  const dvCalculado = `${dv1}${dv2}`;
  return dvEsperado === dvCalculado;
}

// Exemplo de Cloud Function Http (Callable)
// Uso: firebase functions:shell ou via SDK Client
exports.validarCnpj = functions.https.onCall((data, context) => {
  const cnpjInput = data.cnpj;
  const isValid = validaCnpjAlfa(cnpjInput);
  
  return {
    valido: isValid,
    cnpj: cnpjInput
  };
});
