unit CNPJUtils;

interface

uses
  SysUtils, RegularExpressions;

type
  TCNPJ = class
  public
    class function CalculaCnpjDv(cnpj: string): string;
    class function ValidaCnpj(cnpj: string): boolean;
  end;

implementation

class function TCNPJ.CalculaCnpjDv(cnpj: string): string;
var
  cnpjBase: string;
  pesosDV: array[0..12] of integer;
  somatorioDV1, somatorioDV2: integer;
  i, asciiDigito, restoDV1, restoDV2, dv1, dv2: integer;
begin
  cnpjBase := TRegEx.Replace(cnpj, '[^A-Za-z0-9]', '');
  cnpjBase := UpperCase(cnpjBase);

  if Length(cnpjBase) < 12 then
    raise Exception.Create('CNPJ invalido (tamanho incorreto)');

  cnpjBase := Copy(cnpjBase, 1, 12);
  
  pesosDV[0] := 6; pesosDV[1] := 5; pesosDV[2] := 4; pesosDV[3] := 3;
  pesosDV[4] := 2; pesosDV[5] := 9; pesosDV[6] := 8; pesosDV[7] := 7;
  pesosDV[8] := 6; pesosDV[9] := 5; pesosDV[10] := 4; pesosDV[11] := 3;
  pesosDV[12] := 2;

  somatorioDV1 := 0;
  somatorioDV2 := 0;

  for i := 0 to 11 do
  begin
    asciiDigito := Ord(cnpjBase[i + 1]) - 48;
    somatorioDV1 := somatorioDV1 + (asciiDigito * pesosDV[i + 1]);
    somatorioDV2 := somatorioDV2 + (asciiDigito * pesosDV[i]);
  end;

  restoDV1 := somatorioDV1 mod 11;
  if restoDV1 < 2 then dv1 := 0 else dv1 := 11 - restoDV1;

  somatorioDV2 := somatorioDV2 + (dv1 * pesosDV[12]);

  restoDV2 := somatorioDV2 mod 11;
  if restoDV2 < 2 then dv2 := 0 else dv2 := 11 - restoDV2;

  Result := IntToStr(dv1) + IntToStr(dv2);
end;

class function TCNPJ.ValidaCnpj(cnpj: string): boolean;
var
  limpo, cnpjBase, dvFornecido, dvCalculado: string;
begin
  Result := False;
  limpo := TRegEx.Replace(cnpj, '[^A-Za-z0-9]', '');
  limpo := UpperCase(limpo);

  if (Length(limpo) <> 14) or (Copy(limpo, 1, 12) = '000000000000') then
    Exit;

  cnpjBase := Copy(limpo, 1, 12);
  dvFornecido := Copy(limpo, 13, 2);

  try
    dvCalculado := CalculaCnpjDv(cnpjBase);
    Result := (dvFornecido = dvCalculado);
  except
    Result := False;
  end;
end;

end.
