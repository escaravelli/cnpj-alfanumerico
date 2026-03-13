fn calcula_cnpj_dv(cnpj: &str) -> Result<String, &'static str> {
    let mut cnpj_base: String = cnpj.chars()
        .filter(|c| c.is_ascii_alphanumeric())
        .collect();
    cnpj_base = cnpj_base.to_uppercase();

    if cnpj_base.len() < 12 {
        return Err("CNPJ com tamanho incorreto");
    }
    
    cnpj_base.truncate(12);
    let pesos_dv = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    
    let mut somatorio_dv1 = 0;
    let mut somatorio_dv2 = 0;
    
    let bytes = cnpj_base.as_bytes();
    for i in 0..12 {
        let ascii_digito = (bytes[i] as i32) - 48;
        somatorio_dv1 += ascii_digito * pesos_dv[i + 1];
        somatorio_dv2 += ascii_digito * pesos_dv[i];
    }
    
    let resto_dv1 = somatorio_dv1 % 11;
    let dv1 = if resto_dv1 < 2 { 0 } else { 11 - resto_dv1 };
    
    somatorio_dv2 += dv1 * pesos_dv[12];
    
    let resto_dv2 = somatorio_dv2 % 11;
    let dv2 = if resto_dv2 < 2 { 0 } else { 11 - resto_dv2 };
    
    Ok(format!("{}{}", dv1, dv2))
}

pub fn valida_cnpj(cnpj: &str) -> bool {
    let mut cnpj_clean: String = cnpj.chars()
        .filter(|c| c.is_ascii_alphanumeric())
        .collect();
    cnpj_clean = cnpj_clean.to_uppercase();
        
    if cnpj_clean.len() != 14 || cnpj_clean[..12] == *"000000000000" {
        return false;
    }
    
    let dv_fornecido = &cnpj_clean[12..14];
    
    match calcula_cnpj_dv(&cnpj_clean[..12]) {
        Ok(dv_calculado) => dv_fornecido == dv_calculado,
        Err(_) => false
    }
}
