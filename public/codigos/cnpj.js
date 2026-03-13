function calculaCnpjDv(cnpj) {
    // Remove máscara
    cnpj = cnpj.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    
    if (cnpj.length < 12) {
        throw new Error("CNPJ inválido (tamanho incorreto)");
    }
    
    const cnpjBase = cnpj.substring(0, 12);
    const pesosDV = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    
    let somatorioDV1 = 0;
    let somatorioDV2 = 0;
    
    for (let i = 0; i < 12; i++) {
        const asciiDigito = cnpjBase.charCodeAt(i) - 48;
        somatorioDV1 += asciiDigito * pesosDV[i + 1];
        somatorioDV2 += asciiDigito * pesosDV[i];
    }
    
    const restoDV1 = somatorioDV1 % 11;
    const dv1 = restoDV1 < 2 ? 0 : 11 - restoDV1;
    
    somatorioDV2 += dv1 * pesosDV[12];
    
    const restoDV2 = somatorioDV2 % 11;
    const dv2 = restoDV2 < 2 ? 0 : 11 - restoDV2;
    
    return `${dv1}${dv2}`;
}

function validaCnpj(cnpj) {
    cnpj = cnpj.replace(/[^A-Za-z0-9]/g, '');
    
    if (cnpj.length !== 14) return false;
    
    const cnpjBase = cnpj.substring(0, 12);
    const dvFornecido = cnpj.substring(12, 14);
    
    if (cnpjBase === '000000000000') return false;
    
    try {
        const dvCalculado = calculaCnpjDv(cnpjBase);
        return dvFornecido === dvCalculado;
    } catch (e) {
        return false;
    }
}

// Para NodeJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculaCnpjDv, validaCnpj };
}
