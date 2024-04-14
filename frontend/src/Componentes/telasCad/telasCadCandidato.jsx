import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import BarraBusca from "../meusComponentes/busca/BarraBusca";
import CaixaSelecao from "../meusComponentes/busca/CaixaSelecao";
import TabelaVagas from "../tabelas/TabelaVagas.jsx";





export default function TlasCadCandidato(props) {



  const [validado, setValidado] = useState(false);
  const [listaCandidato, setListaCandidato] = useState([]);
  const [candidatoSelecionado, setCandidatoSelecionado] = useState({});
  const [vagasSelecionado, setVagasSelecionado] = useState({});
  /*const [funcinarioProjeto, setSubFuncinarioProjeto] = useState({
    dataAtribuicao: "",
    fp_descricao: "",
  });*/
  const [passou, setPassou] = useState(0);
  
  const [Inscricao, setInscricoes] = useState({
    codigo: 0,
    dataInscricao: "",
    HorasInscricao: "",
    cand_Codigo: candidatoSelecionado,
    vagas: [],
  });
  //console.log(Inscricao.vagas)
  function verificarCodigo() {

    if (!(vagasSelecionado && Inscricao.vagas && Array.isArray(Inscricao.vagas))) {
  
      console.error('A lista de vagas não está definida ou não é um array.');
      return false;
    } 

    if (!vagasSelecionado.codigo) {
      console.error('O código da vaga selecionada não está definido.');
      return false;
    } 

    const vagaJaSelecionada = Inscricao.vagas.some((vaga, index) => {
      // Verificar se vagasSelecionado.codigo é igual ao código da vaga atual
      return vagasSelecionado.codigo === vaga.codigo
    });
    if (vagaJaSelecionada) {
      alert("VAGA JÁ SELECIONADA!!! (Não pode se inscrever a mais de uma vez para a mesma vaga.)")
      return false;
    } 
    return true;
  }
  //manipulando o ciclo de vida do componente FormCadVenda
  useEffect(() => {
    
    fetch("http://localhost:4000/candidatos", { method: "GET" })
      .then((resposta) => {
        
        return resposta.json();
      })
      .then((resultado) => {
        setListaCandidato(resultado.listaCandidato);
        
      })
      .catch((erro) => {
        //Informar o erro em um componente do tipo Mensagem
        console.log(erro)
        alert("Não foi possível recuperar os Candidato do backend.");
      });
  }, []); //willMount
    
    /*const handleSubmit = (event) => {
      event.preventDefault();
      // Aqui você pode chamar sua função changeProjeto() se necessário
      console.log("Dados submetidos:", funcinarioProjeto);
      // Se deseja chamar changeProjeto(), descomente a linha abaixo
      // changeProjeto();
    };
    const handleChange = (event) => {
      const { name, value } = event.target;
      setSubFuncinarioProjeto({
        ...funcinarioProjeto,
        [name]: value
      });
    };*/
    
    function changeProjeto() {
      
      console.log(passou)
      if(passou === 0){
        setInscricoes({
          ...Inscricao,
          vagas: [
            ...Inscricao.vagas,
            {
              codigo: vagasSelecionado?.codigo,
              nome: vagasSelecionado?.nome,
              salario: vagasSelecionado?.salario, 
              cidade: vagasSelecionado?.cidade, 
              quantidade: vagasSelecionado?.quantidade
            },
          ],
        });

      }
      else{
        setPassou(0)
        return alert("Código igual")
      }
    }

  function manipularMudanca(e) {
    const alvo = e.target.id;
    
    if (e.target.type === "checkbox") {
      //spread operator = operador de espalhamento
      setInscricoes({ ...Inscricao, [alvo]: e.target.checked });
    } else {
      //spread operator = operador de espalhamento
      setInscricoes({ ...Inscricao, [alvo]: e.target.value });
    }
  }

  

  function gravarInscricao() {
    fetch("http://localhost:4000/inscricoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dataInscricao: Inscricao.dataInscricao,
        HorasInscricao: Inscricao.HorasInscricao,
        cand_Codigo: candidatoSelecionado,
        vagas: Inscricao.vagas,
      }),
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (dados.status) {
          setInscricoes({ ...Inscricao, codigo: dados.codigo });
        }
        alert(dados.mensagem);
      })
      .catch((erro) => alert(erro.message));
  }

  const manipulaSubmissao = (event) => {
    
    const form = event.currentTarget;
    
    if (form.checkValidity()) {
      setValidado(false);
      gravarInscricao();
    } else {
      setValidado(true);
    }
    event.preventDefault();
    event.stopPropagation();
  };

  /*function manipularTodosDados(event) {
    manipulaSubmissao(event); // Chama a função manipulaSubmissao passando o evento
    handleSubmit(event);
  }*/


    return (
                <>
                    
 
                    <div className="container border border-white border-3 rounded ">
                    
                        <form validate={validado} onSubmit={manipulaSubmissao}>
                        <div class="alert alert-light mt-4" role="alert">INSCRIÇÃO</div>
                            
                            <div className="row justify-content-evenly">
                                <div className="mb-3 col-3">
                                    <label htmlFor="codigo" className="text-white">Código</label>
                                    <input type="text" 
                                    className="form-control" 
                                    id="codigo" 
                                    aria-describedby="emailHelp"
                                    value={Inscricao.codigo}
                                    onChange={manipularMudanca}
                                    placeholder="0"
                                    defaultValue="0"
                                    disabled
                                     />
                                </div>
                                <div className="mb-3 col-3">
                                    <label htmlFor="dataInscricao" className="text-white">Data da inscrição:</label>
                                    <input 
                                    type="date" 
                                    className="form-control" 
                                    id="dataInscricao" 
                                    aria-describedby="emailHelp" 
                                    value={Inscricao.dataInscricao}
                                    onChange={manipularMudanca}
                                    />
                                </div>
                                <div className="mb-3 col-3">
                                    <label htmlFor="HorasInscricao" className="text-white">Horario de inscrição:</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="HorasInscricao" 
                                    aria-describedby="emailHelp" 
                                    value={Inscricao.HorasInscricao}
                                    onChange={manipularMudanca}
                                    />
                                </div>
                            </div>
                            <div className="row justify-content-evenly">
                                                <Row>
                                                    <Form.Group as={Col} md="12" controlId="valorTotalTributos">
                                                    <Form.Label>Candidato:</Form.Label>
                                                    <BarraBusca
                                                        campoChave={"codigo"}
                                                        campoBusca={"nome"}
                                                        dados={listaCandidato}
                                                        funcaoSelecao={setCandidatoSelecionado}
                                                        placeHolder={"Selecione um candidato"}
                                                        valor={""}
                                                    />
                                                    </Form.Group>
                                                </Row>
                                                </div>
                                                <div className="row justify-content-evenly">

                                                <Container className="m-8">
                                                    <Row className="m-3">
                                                        <Col md={2}>
                                                        <Form.Label>Vagas de trabalho</Form.Label>
                                                        </Col>
                                                        <Col>
                                                        <CaixaSelecao
                                                            enderecoFonteDados={"http://localhost:4000/vagas"}
                                                            campoChave={"codigo"}
                                                            campoExibicao={"nome"}
                                                            campoSalario={"salario"}
                                                            campoCidade={"cidade"}
                                                            campoQuant={"quantidade"}
                                                            funcaoSelecao={setVagasSelecionado}
                                                            localLista={"listaVagas"}
                                                        />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        {
                                                        //Seção ficará responsável por detalhar o produto selecionado
                                                        }
                                                        <Col md={20} className="justify-content-center">
                                                        <Row className="justify-content-center">
                                                            <Col md={1}>
                                                            <Form.Group>
                                                                <Form.Label>codigo:</Form.Label>
                                                                <Form.Control
                                                                type="text"
                                                                value={vagasSelecionado?.codigo}
                                                                disabled
                                                                />
                                                            </Form.Group>
                                                            </Col>
                                                            <Col md={4}>
                                                            <Form.Group>
                                                                <Form.Label>Nome da vaga:</Form.Label>
                                                                <Form.Control
                                                                type="text"
                                                                value={vagasSelecionado?.nome}
                                                                disabled
                                                                />
                                                            </Form.Group>
                                                            </Col>
                                                            <Col md={2}>
                                                            <Form.Group>
                                                                <Form.Label>salario:</Form.Label>
                                                                <Form.Control
                                                                type="text"
                                                                value={vagasSelecionado?.salario}
                                                                disabled
                                                                />
                                                            </Form.Group>
                                                            </Col>
                                                            <Col md={4}>
                                                            <Form.Group>
                                                                <Form.Label>Cidade:</Form.Label>
                                                                <Form.Control
                                                                type="text"
                                                                value={vagasSelecionado?.cidade}
                                                                disabled
                                                               
                                                                />
                                                            </Form.Group>
                                                            </Col>
                                                            <Col md={2}>
                                                            <Form.Group>
                                                                <Form.Label>Qta de vaga:</Form.Label>
                                                                <Form.Control
                                                                type="text"
                                                                value={vagasSelecionado?.quantidade}
                                                                disabled
                                                                
                                                                />
                                                            </Form.Group>
                                                            </Col>

                                                            <Col md={1} className="middle">
                                                            <Form.Group>
                                                                <Form.Label>Adicionar</Form.Label>
                                                                
                                                                <Button onClick={()=>{
                                                                  if (verificarCodigo()){
                                                                    changeProjeto()
                                                                  }
                                                                  
                                                                  }} >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                                                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                                                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                                                                </svg>
                                                                </Button>
                                                            </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mt-5 col-12">
                                                        <p>
                                                        <strong>Lista de Funcinario responsável</strong>
                                                        </p>
                                                        
                                                        <TabelaVagas
                                                            listaVagas={Inscricao.vagas}
                                                            setInscricoes={setInscricoes}
                                                            dadosProjeto={Inscricao}

                                                        />
                                                    </Row>
                                                    </Container>
                            </div>
                            <Button className="btn btn-success" type="submit">Cadastrar-se</Button>
                        </form>
                    </div>
                </>
    );
}
