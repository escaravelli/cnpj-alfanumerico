/* Para MySQL / MariaDB */
DELIMITER $$

CREATE FUNCTION fn_calcula_dv_cnpj(p_cnpj VARCHAR(20)) RETURNS VARCHAR(2) DETERMINISTIC
BEGIN
    DECLARE v_cnpj_base VARCHAR(12);
    DECLARE v_soma1 INT DEFAULT 0;
    DECLARE v_soma2 INT DEFAULT 0;
    DECLARE v_dv1 INT;
    DECLARE v_dv2 INT;
    DECLARE v_resto INT;
    DECLARE i INT DEFAULT 1;
    DECLARE v_ascii INT;
    
    -- Exemplo de lógica simplificada para extrair apenas alfanuméricos com REGEXP_REPLACE se disponível
    -- Como workaround genérico, assume-se que foi passado limpo ou com máscara fixa.
    SET v_cnpj_base = UPPER(SUBSTRING(REPLACE(REPLACE(REPLACE(p_cnpj, '.', ''), '-', ''), '/', ''), 1, 12));
    
    IF LENGTH(v_cnpj_base) < 12 THEN
        RETURN NULL;
    END IF;
    
    -- Pesos: offset +1 para dv1 e offset 0 para dv2.
    -- Arrays não existem nativamente no MySQL sem JSON, usaremos cases.
    WHILE i <= 12 DO
        SET v_ascii = ASCII(SUBSTRING(v_cnpj_base, i, 1)) - 48;
        
        -- soma1
        SET v_soma1 = v_soma1 + (v_ascii * CASE 
            WHEN i=1 THEN 5 WHEN i=2 THEN 4 WHEN i=3 THEN 3 WHEN i=4 THEN 2
            WHEN i=5 THEN 9 WHEN i=6 THEN 8 WHEN i=7 THEN 7 WHEN i=8 THEN 6 
            WHEN i=9 THEN 5 WHEN i=10 THEN 4 WHEN i=11 THEN 3 WHEN i=12 THEN 2 END);
            
        -- soma2
        SET v_soma2 = v_soma2 + (v_ascii * CASE 
            WHEN i=1 THEN 6 WHEN i=2 THEN 5 WHEN i=3 THEN 4 WHEN i=4 THEN 3
            WHEN i=5 THEN 2 WHEN i=6 THEN 9 WHEN i=7 THEN 8 WHEN i=8 THEN 7 
            WHEN i=9 THEN 6 WHEN i=10 THEN 5 WHEN i=11 THEN 4 WHEN i=12 THEN 3 END);
            
        SET i = i + 1;
    END WHILE;
    
    SET v_resto = v_soma1 % 11;
    IF v_resto < 2 THEN SET v_dv1 = 0; ELSE SET v_dv1 = 11 - v_resto; END IF;
    
    SET v_soma2 = v_soma2 + (v_dv1 * 2);
    
    SET v_resto = v_soma2 % 11;
    IF v_resto < 2 THEN SET v_dv2 = 0; ELSE SET v_dv2 = 11 - v_resto; END IF;
    
    RETURN CONCAT(v_dv1, v_dv2);
END$$

DELIMITER ;
