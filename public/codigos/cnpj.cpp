#include <string>
#include <vector>
#include <algorithm>
#include <stdexcept>
#include <cctype>

class CNPJ {
public:
    static std::string CalculaCnpjDv(std::string cnpj) {
        std::string cnpjClean = "";
        for (char c : cnpj) {
            if (std::isalnum(c)) {
                cnpjClean += std::toupper(c);
            }
        }

        if (cnpjClean.length() < 12) {
            throw std::invalid_argument("CNPJ com tamanho incorreto");
        }
        
        cnpjClean = cnpjClean.substr(0, 12);
        int pesosDV[13] = {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
        
        int somatorioDV1 = 0;
        int somatorioDV2 = 0;
        
        for (int i = 0; i < 12; i++) {
            int asciiDigito = cnpjClean[i] - 48;
            somatorioDV1 += asciiDigito * pesosDV[i + 1];
            somatorioDV2 += asciiDigito * pesosDV[i];
        }
        
        int restoDV1 = somatorioDV1 % 11;
        int dv1 = restoDV1 < 2 ? 0 : 11 - restoDV1;
        
        somatorioDV2 += dv1 * pesosDV[12];
        
        int restoDV2 = somatorioDV2 % 11;
        int dv2 = restoDV2 < 2 ? 0 : 11 - restoDV2;
        
        return std::to_string(dv1) + std::to_string(dv2);
    }

    static bool ValidaCnpj(std::string cnpj) {
        std::string cnpjClean = "";
        for (char c : cnpj) {
            if (std::isalnum(c)) {
                cnpjClean += std::toupper(c);
            }
        }
        
        if (cnpjClean.length() != 14 || cnpjClean.substr(0, 12) == "000000000000") {
            return false;
        }
        
        std::string cnpjBase = cnpjClean.substr(0, 12);
        std::string dvFornecido = cnpjClean.substr(12, 2);
        
        try {
            std::string dvCalculado = CalculaCnpjDv(cnpjBase);
            return dvFornecido == dvCalculado;
        } catch (...) {
            return false;
        }
    }
};
