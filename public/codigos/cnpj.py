import re

def calcula_cnpj_dv(cnpj: str) -> str:
    # Remove a máscara e passa para maiúsculo
    cnpj = re.sub(r'[^A-Za-z0-9]', '', cnpj).upper()
    
    if len(cnpj) < 12:
        raise ValueError("CNPJ com tamanho incorreto.")
        
    cnpj_base = cnpj[:12]
    pesos_dv = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    
    somatorio_dv1 = 0
    somatorio_dv2 = 0
    
    for i in range(12):
        ascii_digito = ord(cnpj_base[i]) - 48
        somatorio_dv1 += ascii_digito * pesos_dv[i + 1]
        somatorio_dv2 += ascii_digito * pesos_dv[i]
        
    resto_dv1 = somatorio_dv1 % 11
    dv1 = 0 if resto_dv1 < 2 else 11 - resto_dv1
    
    somatorio_dv2 += dv1 * pesos_dv[12]
    
    resto_dv2 = somatorio_dv2 % 11
    dv2 = 0 if resto_dv2 < 2 else 11 - resto_dv2
    
    return f"{dv1}{dv2}"

def valida_cnpj(cnpj: str) -> bool:
    cnpj = re.sub(r'[^A-Za-z0-9]', '', cnpj).upper()
    
    if len(cnpj) != 14:
        return False
        
    cnpj_base = cnpj[:12]
    if cnpj_base == "000000000000":
        return False
        
    dv_fornecido = cnpj[12:]
    
    try:
        dv_calculado = calcula_cnpj_dv(cnpj_base)
        return dv_fornecido == dv_calculado
    except Exception:
        return False
