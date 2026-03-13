package main

import (
	"errors"
	"regexp"
	"strconv"
	"strings"
)

func CalculaCnpjDv(cnpj string) (string, error) {
	re := regexp.MustCompile(`[^A-Za-z0-9]`)
	cnpjBase := strings.ToUpper(re.ReplaceAllString(cnpj, ""))

	if len(cnpjBase) < 12 {
		return "", errors.New("CNPJ inválido (tamanho incorreto)")
	}

	cnpjBase = cnpjBase[:12]
	pesosDV := []int{6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2}

	somatorioDV1 := 0
	somatorioDV2 := 0

	for i := 0; i < 12; i++ {
		asciiDigito := int(cnpjBase[i]) - 48
		somatorioDV1 += asciiDigito * pesosDV[i+1]
		somatorioDV2 += asciiDigito * pesosDV[i]
	}

	dv1 := 0
	if resto := somatorioDV1 % 11; resto >= 2 {
		dv1 = 11 - resto
	}

	somatorioDV2 += dv1 * pesosDV[12]

	dv2 := 0
	if resto := somatorioDV2 % 11; resto >= 2 {
		dv2 = 11 - resto
	}

	return strconv.Itoa(dv1) + strconv.Itoa(dv2), nil
}

func ValidaCnpj(cnpj string) bool {
	re := regexp.MustCompile(`[^A-Za-z0-9]`)
	limpo := strings.ToUpper(re.ReplaceAllString(cnpj, ""))

	if len(limpo) != 14 || limpo[:12] == "000000000000" {
		return false
	}

	dvFornecido := limpo[12:]
	dvCalculado, err := CalculaCnpjDv(limpo[:12])

	if err != nil {
		return false
	}

	return dvFornecido == dvCalculado
}
