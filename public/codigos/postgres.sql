CREATE OR REPLACE FUNCTION fn_calcula_dv_cnpj(p_cnpj VARCHAR) RETURNS VARCHAR AS $$
DECLARE
    v_cnpj_base VARCHAR(12);
    v_soma1 INTEGER := 0;
    v_soma2 INTEGER := 0;
    v_dv1 INTEGER;
    v_dv2 INTEGER;
    v_resto INTEGER;
    v_ascii INTEGER;
    i INTEGER;
    v_pesos_dv1 INTEGER[] := ARRAY[5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    v_pesos_dv2 INTEGER[] := ARRAY[6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
BEGIN
    v_cnpj_base := UPPER(SUBSTRING(REGEXP_REPLACE(p_cnpj, '[^A-Za-z0-9]', '', 'g') FROM 1 FOR 12));
    
    IF LENGTH(v_cnpj_base) < 12 THEN
        RETURN NULL;
    END IF;
    
    FOR i IN 1..12 LOOP
        v_ascii := ASCII(SUBSTRING(v_cnpj_base FROM i FOR 1)) - 48;
        v_soma1 := v_soma1 + (v_ascii * v_pesos_dv1[i]);
        v_soma2 := v_soma2 + (v_ascii * v_pesos_dv2[i]);
    END LOOP;
    
    v_resto := v_soma1 % 11;
    IF v_resto < 2 THEN v_dv1 := 0; ELSE v_dv1 := 11 - v_resto; END IF;
    
    v_soma2 := v_soma2 + (v_dv1 * v_pesos_dv2[13]);
    
    v_resto := v_soma2 % 11;
    IF v_resto < 2 THEN v_dv2 := 0; ELSE v_dv2 := 11 - v_resto; END IF;
    
    RETURN v_dv1::VARCHAR || v_dv2::VARCHAR;
END;
$$ LANGUAGE plpgsql;
