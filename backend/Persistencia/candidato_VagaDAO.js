import Candidato from "../Model/candidato.js";
import CandidatoVagas from "../Model/candidato_Vaga.js";
import Vaga from "../Model/vaga.js";
import conectar from "./conexao.js";

export default class InscicoesDAO{
    async gravar(candVaga) {
        if (candVaga instanceof CandidatoVagas) {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try {
                const sql =`INSERT INTO candidato_vaga(data_inscricao, horario_inscricao, pk_cand_codigo, pk_vaga_codigo) VALUES(str_to_date(?,'%d/%m/%Y'),?,?,?)`;
                for (const vaga of candVaga.vagas) {
                    let parametros = [candVaga.dataInscricao, candVaga.HorasInscricao ,candVaga.candidato.codigo,vaga.codigo];
                    const retorno = await conexao.execute(sql, parametros);
                    candVaga.codigo = retorno[0].insertId;
                }
                await conexao.commit(); 
            }
            catch (error) {
                await conexao.rollback(); 
                throw error; 
            }
        }

    }


    async consultar(termoBusca) {
        const listaCandVagas = [];
        if (!isNaN(termoBusca)) { //assegurando que seja um código de pedido do tipo inteiro
            const conexao = await conectar();
            const sql = `SELECT cv.cvcodigo, cv.data_inscricao, cv.horario_inscricao, cv.pk_cand_codigo,cv.pk_vaga_codigo,
                        c.cand_codigo, c.cand_cpf, c.cand_nome, c.cand_endereco , c.cand_telefone, 
                        v.vaga_codigo,v.vaga_nome,v.vaga_salario,v.vaga_cidade,v.vaga_quantidade
                        FROM candidato_vaga as cv
                        INNER JOIN candidato as c ON cv.pk_cand_codigo = c.cand_codigo
                        INNER JOIN vaga as v ON cv.pk_vaga_codigo = v.vaga_codigo
                        WHERE c.cand_codigo = ?`;
            const [registros, campos] = await conexao.execute(sql, [termoBusca]);
            if (registros.length > 0) {

                // a partir dos registros precisaremos restaurar os objetos
                
                //const projeto = new Projeto(registros[0].pro_id, registros[0].pro_nomeProjeto,registros[0].pro_descricao,registros[0].pro_dataInicio,registros[0].pro_dataFinal,registros[0].pro_orcamento);
                let listaVags = [];
                const candidato = new Candidato(registros[0].cand_codigo, registros[0].cand_cpf, registros[0].cand_nome, registros[0].cand_endereco, registros[0].cand_telefone);
                for (const registro of registros) {
                    const vagas = new Vaga(registro.vaga_codigo	, registro.vaga_nome, registro.vaga_salario, registro.vaga_cidade, registro.vaga_quantidade);
                    listaVags.push(vagas);
                }
                const candidatoVagas = new CandidatoVagas(registros[0].cvcodigo, registros[0].data_inscricao, registros[0].horario_inscricao, candidato, listaVags);
                
                listaCandVagas.push(candidatoVagas);
            }

        }

        return listaCandVagas;

    }


}