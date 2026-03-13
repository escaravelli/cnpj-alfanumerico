// ===========================================
// Validador de CNPJ Alfanumérico em MongoDB
// Pode ser usado num Aggregation Pipeline com $function
// ===========================================

db.empresas.aggregate([
  {
    $addFields: {
      isCnpjValid: {
        $function: {
          body: function(cnpj) {
            if (!cnpj) return false;
            let limpo = cnpj.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
            if (limpo.length !== 14 || limpo.substring(0, 12) === "000000000000") return false;

            let base = limpo.substring(0, 12);
            let dv = limpo.substring(12, 14);
            let pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            let soma1 = 0, soma2 = 0;

            for (let i = 0; i < 12; i++) {
              let v = base.charCodeAt(i) - 48;
              soma1 += v * pesos[i + 1];
              soma2 += v * pesos[i];
            }

            let r1 = soma1 % 11;
            let dv1 = r1 < 2 ? 0 : 11 - r1;
            
            soma2 += dv1 * pesos[12];
            let r2 = soma2 % 11;
            let dv2 = r2 < 2 ? 0 : 11 - r2;

            return dv === (dv1.toString() + dv2.toString());
          },
          args: ["$cnpj"],    // <-- Substitua "$cnpj" pelo nome fiel do seu campo
          lang: "js"
        }
      }
    }
  },
  { // Opcional: Filtrar apenas os CNPJs válidos
    $match: {
      isCnpjValid: true
    }
  }
])
