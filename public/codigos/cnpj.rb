def calcula_cnpj_dv(cnpj)
  cnpj = cnpj.gsub(/[^A-Za-z0-9]/, '').upcase
  raise "CNPJ com tamanho incorreto" if cnpj.length < 12

  cnpj_base = cnpj[0, 12]
  pesos_dv = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  somatorio_dv1 = 0
  somatorio_dv2 = 0

  (0..11).each do |i|
    ascii_digito = cnpj_base[i].ord - 48
    somatorio_dv1 += ascii_digito * pesos_dv[i + 1]
    somatorio_dv2 += ascii_digito * pesos_dv[i]
  end

  resto_dv1 = somatorio_dv1 % 11
  dv1 = resto_dv1 < 2 ? 0 : 11 - resto_dv1

  somatorio_dv2 += dv1 * pesos_dv[12]

  resto_dv2 = somatorio_dv2 % 11
  dv2 = resto_dv2 < 2 ? 0 : 11 - resto_dv2

  "#{dv1}#{dv2}"
end

def valida_cnpj(cnpj)
  cnpj = cnpj.gsub(/[^A-Za-z0-9]/, '').upcase
  return false if cnpj.length != 14 || cnpj[0, 12] == "000000000000"

  cnpj_base = cnpj[0, 12]
  dv_fornecido = cnpj[12, 2]

  begin
    dv_calculado = calcula_cnpj_dv(cnpj_base)
    dv_fornecido == dv_calculado
  rescue
    false
  end
end
