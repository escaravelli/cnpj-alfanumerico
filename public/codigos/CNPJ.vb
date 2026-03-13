Imports System.Text.RegularExpressions

Public Class CnpjValidador
    Public Shared Function CalculaCnpjDv(cnpj As String) As String
        cnpj = Regex.Replace(cnpj, "[^A-Za-z0-9]", "").ToUpper()

        If cnpj.Length < 12 Then
            Throw New ArgumentException("CNPJ inválido (tamanho incorreto)")
        End If

        Dim cnpjBase As String = cnpj.Substring(0, 12)
        Dim pesosDV() As Integer = {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2}

        Dim somatorioDV1 As Integer = 0
        Dim somatorioDV2 As Integer = 0

        For i As Integer = 0 To 11
            Dim asciiDigito As Integer = Asc(cnpjBase(i)) - 48
            somatorioDV1 += asciiDigito * pesosDV(i + 1)
            somatorioDV2 += asciiDigito * pesosDV(i)
        Next

        Dim restoDV1 As Integer = somatorioDV1 Mod 11
        Dim dv1 As Integer = If(restoDV1 < 2, 0, 11 - restoDV1)

        somatorioDV2 += dv1 * pesosDV(12)

        Dim restoDV2 As Integer = somatorioDV2 Mod 11
        Dim dv2 As Integer = If(restoDV2 < 2, 0, 11 - restoDV2)

        Return dv1.ToString() & dv2.ToString()
    End Function

    Public Shared Function ValidaCnpj(cnpj As String) As Boolean
        cnpj = Regex.Replace(cnpj, "[^A-Za-z0-9]", "").ToUpper()

        If cnpj.Length <> 14 OrElse cnpj.Substring(0, 12) = "000000000000" Then
            Return False
        End If

        Dim cnpjBase As String = cnpj.Substring(0, 12)
        Dim dvFornecido As String = cnpj.Substring(12, 2)

        Try
            Dim dvCalculado As String = CalculaCnpjDv(cnpjBase)
            Return dvFornecido = dvCalculado
        Catch
            Return False
        End Try
    End Function
End Class
