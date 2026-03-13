public class CNPJ {

    public static String calculaCnpjDv(String cnpj) {
        String cnpjBase = cnpj.replaceAll("[^A-Za-z0-9]", "").toUpperCase();
        if (cnpjBase.length() < 12) {
            throw new IllegalArgumentException("CNPJ inválido (tamanho incorreto)");
        }
        
        cnpjBase = cnpjBase.substring(0, 12);
        int[] pesosDV = {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
        
        int somatorioDV1 = 0;
        int somatorioDV2 = 0;
        
        for (int i = 0; i < 12; i++) {
            int asciiDigito = cnpjBase.charAt(i) - 48;
            somatorioDV1 += asciiDigito * pesosDV[i + 1];
            somatorioDV2 += asciiDigito * pesosDV[i];
        }
        
        int restoDV1 = somatorioDV1 % 11;
        int dv1 = restoDV1 < 2 ? 0 : 11 - restoDV1;
        
        somatorioDV2 += dv1 * pesosDV[12];
        
        int restoDV2 = somatorioDV2 % 11;
        int dv2 = restoDV2 < 2 ? 0 : 11 - restoDV2;
        
        return String.valueOf(dv1) + String.valueOf(dv2);
    }

    public static boolean validaCnpj(String cnpj) {
        String limpo = cnpj.replaceAll("[^A-Za-z0-9]", "").toUpperCase();
        if (limpo.length() != 14 || limpo.startsWith("000000000000")) {
            return false;
        }
        
        String cnpjBase = limpo.substring(0, 12);
        String dvFornecido = limpo.substring(12, 14);
        
        try {
            String dvCalculado = calculaCnpjDv(cnpjBase);
            return dvFornecido.equals(dvCalculado);
        } catch (Exception e) {
            return false;
        }
    }
}
