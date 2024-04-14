import { useState } from "react";
import { Button } from "react-bootstrap";



export default function  TelaCadastroCadidato() {
    const [validado, setValidado] = useState(false);
    const [candidato, setCandidato] = useState({
        codigo: 0,
        cpf: "",
        nome: "",
        endereco: "",
        telefone: "",
      });

      function gravarCandidato() {
        fetch("http://localhost:4000/candidatos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cpf: candidato.cpf,
            nome: candidato.nome,
            endereco: candidato.endereco,
            telefone: candidato.telefone,
          }),
        })
          .then((resposta) => {
            return resposta.json();
          })
          .then((dados) => {
            if (dados.status) {
                setCandidato({ ...candidato, codigo: dados.codigo });
            }
            alert(dados.mensagem);
          })
          .catch((erro) => alert(erro.message));
      }


    function manipularMudanca(e) {
        const alvo = e.target.id;
        
        if (e.target.type === "checkbox") {
          //spread operator = operador de espalhamento
          setCandidato({ ...candidato, [alvo]: e.target.checked });
        } else {
          //spread operator = operador de espalhamento
          setCandidato({ ...candidato, [alvo]: e.target.value });
        }
      }

    const manipulaSubmissao = (event) => {
    
        const form = event.currentTarget;
        
        if (form.checkValidity()) {
          setValidado(false);
          gravarCandidato();
        } else {
          setValidado(true);
        }
        event.preventDefault();
        event.stopPropagation();
      };

    return (
    <>
                    
 
                    <div className="container border border-white border-3 rounded ">
                    
                        <form validate={validado} onSubmit={manipulaSubmissao}>
                        <div class="alert alert-light mt-4" role="alert">Cadastro de Candidato</div>
                            
                            <div className="row justify-content-evenly">
                                <div className="mb-3 col-3">
                                    <label htmlFor="codigo" className="text-white">Código</label>
                                    <input type="text" 
                                    className="form-control" 
                                    id="codigo" 
                                    aria-describedby="emailHelp"
                                    value={candidato.codigo}
                                    onChange={manipularMudanca}
                                    placeholder="0"
                                    defaultValue="0"
                                    disabled
                                     />
                                </div>
                                <div className="mb-3 col-3">
                                    <label htmlFor="cpf" className="text-white">CPF:</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="cpf" 
                                    aria-describedby="emailHelp" 
                                    value={candidato.cpf}
                                    onChange={manipularMudanca}
                                    />
                                </div>
                            </div>
                            <div className="row justify-content-evenly">
                                <div className="mb-3 col-3">
                                    <label htmlFor="nome" className="text-white">Nome Completo:</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="nome" 
                                    aria-describedby="emailHelp" 
                                    value={candidato.nome}
                                    onChange={manipularMudanca}
                                    />
                                </div>
                                <div className="mb-3 col-3">
                                    <label htmlFor="endereco" className="text-white">Endereço:</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="endereco" 
                                    aria-describedby="emailHelp" 
                                    value={candidato.endereco}
                                    onChange={manipularMudanca}
                                    />
                                </div>
                            </div>
                            <div className="row justify-content-evenly">
                            <div className="mb-3 col-3">
                                    <label htmlFor="telefone" className="text-white">Telefone:</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="telefone" 
                                    aria-describedby="emailHelp" 
                                    value={candidato.telefone}
                                    onChange={manipularMudanca}
                                    />
                                </div>
                            </div>
                            <Button className="btn btn-success" type="submit">Cadastrar-se</Button>
                        </form>
                    </div>
    
    
    
    
    
    
    
    </>)
}