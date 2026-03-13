<?php

function calculaCnpjDv(string $cnpj): string {
    // Remove qualquer máscara
    $cnpj = preg_replace('/[^A-Za-z0-9]/', '', $cnpj);
    
    if (strlen($cnpj) < 12) {
        throw new Exception("CNPJ inválido (tamanho incorreto)");
    }
    
    // Apenas os 12 primeiros caracteres
    $cnpjSemMascara = strtoupper(substr($cnpj, 0, 12));
    
    $pesosDV = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    $somatorioDV1 = 0;
    $somatorioDV2 = 0;
    
    for ($i = 0; $i < 12; $i++) {
        $asciiDigito = ord($cnpjSemMascara[$i]) - 48;
        $somatorioDV1 += $asciiDigito * $pesosDV[$i + 1];
        $somatorioDV2 += $asciiDigito * $pesosDV[$i];
    }
    
    $restoDV1 = $somatorioDV1 % 11;
    $dv1 = $restoDV1 < 2 ? 0 : 11 - $restoDV1;
    
    $somatorioDV2 += $dv1 * $pesosDV[12];
    
    $restoDV2 = $somatorioDV2 % 11;
    $dv2 = $restoDV2 < 2 ? 0 : 11 - $restoDV2;
    
    return $dv1 . $dv2;
}

function validaCnpj(string $cnpj): bool {
    // Remove máscara
    $cnpj = preg_replace('/[^A-Za-z0-9]/', '', $cnpj);
    
    if (strlen($cnpj) !== 14) {
        return false;
    }
    
    $cnpjBase = substr($cnpj, 0, 12);
    $dvFornecido = substr($cnpj, 12, 2);
    
    try {
        $dvCalculado = calculaCnpjDv($cnpjBase);
        return $dvFornecido === $dvCalculado && $cnpjBase !== str_repeat('0', 12);
    } catch (Exception $e) {
        return false;
    }
}
