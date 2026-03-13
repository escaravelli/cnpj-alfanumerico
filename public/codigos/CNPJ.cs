using System;
using System.Text.RegularExpressions;

namespace CnpjUtils
{
    public static class CnpjValidador
    {
        public static string CalculaCnpjDv(string cnpj)
        {
            cnpj = Regex.Replace(cnpj, "[^A-Za-z0-9]", "").ToUpper();

            if (cnpj.Length < 12)
            {
                throw new ArgumentException("CNPJ inválido (tamanho incorreto)");
            }

            string cnpjBase = cnpj.Substring(0, 12);
            int[] pesosDV = { 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };

            int somatorioDV1 = 0;
            int somatorioDV2 = 0;

            for (int i = 0; i < 12; i++)
            {
                int asciiDigito = cnpjBase[i] - 48;
                somatorioDV1 += asciiDigito * pesosDV[i + 1];
                somatorioDV2 += asciiDigito * pesosDV[i];
            }

            int restoDV1 = somatorioDV1 % 11;
            int dv1 = restoDV1 < 2 ? 0 : 11 - restoDV1;

            somatorioDV2 += dv1 * pesosDV[12];

            int restoDV2 = somatorioDV2 % 11;
            int dv2 = restoDV2 < 2 ? 0 : 11 - restoDV2;

            return $"{dv1}{dv2}";
        }

        public static bool ValidaCnpj(string cnpj)
        {
            cnpj = Regex.Replace(cnpj, "[^A-Za-z0-9]", "").ToUpper();

            if (cnpj.Length != 14 || cnpj.Substring(0, 12) == "000000000000")
            {
                return false;
            }

            string cnpjBase = cnpj.Substring(0, 12);
            string dvFornecido = cnpj.Substring(12, 2);

            try
            {
                string dvCalculado = CalculaCnpjDv(cnpjBase);
                return dvFornecido == dvCalculado;
            }
            catch
            {
                return false;
            }
        }
    }
}
