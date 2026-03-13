-- Oracle PL/SQL Function para CNPJ Alfanumérico
CREATE OR REPLACE FUNCTION VALIDA_CNPJ_ALFA (p_cnpj VARCHAR2) RETURN BOOLEAN IS
    v_cnpj VARCHAR2(14);
    v_base VARCHAR2(12);
    v_dv_informado VARCHAR2(2);
    v_ascii NUMBER;
    v_soma1 NUMBER := 0;
    v_soma2 NUMBER := 0;
    v_resto1 NUMBER;
    v_resto2 NUMBER;
    v_dv1 NUMBER;
    v_dv2 NUMBER;
    
    TYPE t_pesos IS VARRAY(13) OF NUMBER;
    v_pesos t_pesos := t_pesos(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
BEGIN
    -- Limpa pontuacao (usando REGEXP_REPLACE)
    v_cnpj := REGEXP_REPLACE(UPPER(p_cnpj), '[^A-Z0-9]', '');
    
    IF LENGTH(v_cnpj) != 14 THEN
        RETURN FALSE;
    END IF;
    
    -- Se for zerado
    IF v_cnpj = '00000000000000' THEN
        RETURN FALSE;
    END IF;

    v_base := SUBSTR(v_cnpj, 1, 12);
    v_dv_informado := SUBSTR(v_cnpj, 13, 2);

    -- Calculo DV1 e DV2 simulado
    FOR i IN 1..12 LOOP
        v_ascii := ASCII(SUBSTR(v_base, i, 1)) - 48;
        v_soma1 := v_soma1 + (v_ascii * v_pesos(i + 1));
        v_soma2 := v_soma2 + (v_ascii * v_pesos(i));
    END LOOP;

    v_resto1 := MOD(v_soma1, 11);
    IF v_resto1 < 2 THEN
        v_dv1 := 0;
    ELSE
        v_dv1 := 11 - v_resto1;
    END IF;

    v_soma2 := v_soma2 + (v_dv1 * v_pesos(13));
    v_resto2 := MOD(v_soma2, 11);
    
    IF v_resto2 < 2 THEN
        v_dv2 := 0;
    ELSE
        v_dv2 := 11 - v_resto2;
    END IF;

    IF v_dv_informado = (TO_CHAR(v_dv1) || TO_CHAR(v_dv2)) THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END VALIDA_CNPJ_ALFA;
/
