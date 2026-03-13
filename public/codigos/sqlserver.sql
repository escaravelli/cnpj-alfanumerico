CREATE FUNCTION fn_calcula_dv_cnpj (@p_cnpj VARCHAR(20))
RETURNS VARCHAR(2)
AS
BEGIN
    DECLARE @v_cnpj_base VARCHAR(12);
    DECLARE @v_soma1 INT = 0;
    DECLARE @v_soma2 INT = 0;
    DECLARE @v_dv1 INT;
    DECLARE @v_dv2 INT;
    DECLARE @v_resto INT;
    DECLARE @i INT = 1;
    DECLARE @v_ascii INT;
    
    SET @v_cnpj_base = UPPER(SUBSTRING(
        REPLACE(REPLACE(REPLACE(@p_cnpj, '.', ''), '-', ''), '/', ''), 1, 12));
    
    IF LEN(@v_cnpj_base) < 12
        RETURN NULL;
        
    WHILE @i <= 12
    BEGIN
        SET @v_ascii = ASCII(SUBSTRING(@v_cnpj_base, @i, 1)) - 48;
        
        SET @v_soma1 = @v_soma1 + (@v_ascii * CHOOSE(@i, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2));
        SET @v_soma2 = @v_soma2 + (@v_ascii * CHOOSE(@i, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2));
        
        SET @i = @i + 1;
    END
    
    SET @v_resto = @v_soma1 % 11;
    IF @v_resto < 2 SET @v_dv1 = 0; ELSE SET @v_dv1 = 11 - @v_resto;
    
    SET @v_soma2 = @v_soma2 + (@v_dv1 * 2);
    
    SET @v_resto = @v_soma2 % 11;
    IF @v_resto < 2 SET @v_dv2 = 0; ELSE SET @v_dv2 = 11 - @v_resto;
    
    RETURN CAST(@v_dv1 AS VARCHAR(1)) + CAST(@v_dv2 AS VARCHAR(1));
END;
