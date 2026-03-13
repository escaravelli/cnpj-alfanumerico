-- ===========================================
-- Validador de CNPJ Alfanumérico em Apache Cassandra
-- Utilizando UDF (User Defined Function) em Java
-- ===========================================

-- 1. Certifique-se de que UDFs estão habilitadas no seu cassandra.yaml:
-- enable_user_defined_functions: true
-- enable_user_defined_functions_threads: true

CREATE OR REPLACE FUNCTION valida_cnpj_alfa(cnpj text)
    RETURNS NULL ON NULL INPUT
    RETURNS boolean
    LANGUAGE java
    AS $$
        String limpo = cnpj.replaceAll("[^A-Za-z0-9]", "").toUpperCase();
        
        if (limpo.length() != 14 || limpo.substring(0, 12).equals("000000000000")) {
            return false;
        }
        
        String base = limpo.substring(0, 12);
        String dvEsperado = limpo.substring(12, 14);
        int[] pesos = {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
        
        int soma1 = 0;
        int soma2 = 0;
        
        for (int i = 0; i < 12; i++) {
            int val = (int) base.charAt(i) - 48;
            soma1 += val * pesos[i + 1];
            soma2 += val * pesos[i];
        }
        
        int r1 = soma1 % 11;
        int dv1 = r1 < 2 ? 0 : 11 - r1;
        
        soma2 += dv1 * pesos[12];
        int r2 = soma2 % 11;
        int dv2 = r2 < 2 ? 0 : 11 - r2;
        
        String dvCalculado = String.valueOf(dv1) + String.valueOf(dv2);
        return dvEsperado.equals(dvCalculado);
    $$;

-- Exemplo de Uso:
-- SELECT nome, cnpj, valida_cnpj_alfa(cnpj) AS is_valid FROM system_empresas.fornecedores;
