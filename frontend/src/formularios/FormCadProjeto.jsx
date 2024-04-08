import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import BarraBusca from "../meusComponentes/busca/BarraBusca";
import CaixaSelecao from "../meusComponentes/busca/CaixaSelecao";
import TabelaFuncionario from "../tabelas/TabelaItensProjeto";
import "./Formulario.css"

export default function FormCadVenda(props) {
  const [validado, setValidado] = useState(false);
  const [listaClientes, setListaClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState({});
  const [funcSelecionado, setFuncSelecionado] = useState({});
  const [qtdItem, setQtdItem] = useState(0);
  const [funcinarioProjeto, setSubFuncinarioProjeto] = useState({
    dataAtribuicao: "",
    fp_descricao: "",
  });

  //O estado venda possui correlação com a venda gerenciada no backend
  const [projeto, setProjeto] = useState({
    id: 0,
    nomeProjeto: "",
    descricao: "",
    dataInicio: "",
    dataFinal: "",
    orcamento: 0,
    cliente: clienteSelecionado,
    funcs: [],
  });

  //manipulando o ciclo de vida do componente FormCadVenda
  useEffect(() => {
    fetch("http://localhost:3001/cliente", { method: "GET" })
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaClientes) => {
        setListaClientes(listaClientes);
      })
      .catch((erro) => {
        //Informar o erro em um componente do tipo Mensagem
        alert("Não foi possível recuperar os clientes do backend.");
      });
  }, []); //willMount
    
    const handleSubmit = (event) => {
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
    };
    function changeProjeto() {
      setProjeto({
        ...projeto,
        funcs: [
          ...projeto.funcs,
          {
            id: funcSelecionado?.id,
            nome: funcSelecionado?.nome,
            dataAtribuicao: funcinarioProjeto?.dataAtribuicao, // Adicionando dataAtribuicao
            fp_descricao: funcinarioProjeto?.fp_descricao, // Adicionando fp_descricao
          },
        ],
      });
    }

  function manipularMudanca(e) {
    const alvo = e.target.name;
    if (e.target.type === "checkbox") {
      //spread operator = operador de espalhamento
      setProjeto({ ...projeto, [alvo]: e.target.checked });
    } else {
      //spread operator = operador de espalhamento
      setProjeto({ ...projeto, [alvo]: e.target.value });
    }
  }

  

  function gravarVenda() {
    fetch("http://localhost:3001/projeto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeProjeto: projeto.nomeProjeto,
        descricao: projeto.descricao,
        dataInicio: projeto.dataInicio,
        dataFinal: projeto.dataFinal,
        orcamento: projeto.orcamento,
        cliente: clienteSelecionado,
        funcs: projeto.funcs,
      }),
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (dados.status) {
          setProjeto({ ...projeto, id: dados.id });
        }
        alert(dados.mensagem);
      })
      .catch((erro) => alert(erro.message));
  }

  const manipulaSubmissao = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      setValidado(false);
      gravarVenda();
    } else {
      setValidado(true);
    }
    event.preventDefault();
    event.stopPropagation();
  };

  function manipularTodosDados(event) {
    manipulaSubmissao(event); // Chama a função manipulaSubmissao passando o evento
    handleSubmit(event);
  }
  
  

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
          <div className="container-fluid text-center">
            <a className="navbar-brand text-center">Seleção de funcionario para projeto</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  
                  <ul className="dropdown-menu dropdown-menu-dark">
                    
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      <div className="border-top border-white"></div>/
      <Form className="container text-bg-dark p-3" noValidate validated={validado} onSubmit={manipularTodosDados}>
        <div  className="container text-bg-dark p-3">
          <Row className="mb-3 ">
            <Form.Group as={Col} md="4" controlId="idVenda">
              <Form.Label>Funcionario nº</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="0"
                defaultValue="0"
                disabled
                name="id"
                value={projeto.id}
                onChange={manipularMudanca}
              />
            </Form.Group>
          </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="nomeProjeto">
              <Form.Label>Nome do Projeto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome:"
                value={projeto.nomeProjeto}
                name="nomeProjeto"
                onChange={manipularMudanca}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o valor total do pedido
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="descricao">
              <Form.Label>Descrição do projeto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descrição:"
                value={projeto.descricao}
                name="descricao"
                onChange={manipularMudanca}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o valor total do pedido
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="dataInicio">
              <Form.Label>Data Inicial</Form.Label>
              <Form.Control
                type="date"
                required
                name="dataInicio"
                value={projeto.dataInicio}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a data da venda.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="dataFinal">
              <Form.Label>Data Final</Form.Label>
              <Form.Control
                type="date"
                required
                name="dataFinal"
                value={projeto.dataFinal}
                onChange={manipularMudanca}
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a data da venda.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="orcamento">
              <Form.Label>Descrição do projeto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Orcamento:"
                value={projeto.orcamento}
                name="orcamento"
                onChange={manipularMudanca}
                required
              />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe o valor total do pedido
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
        </div>
        <div  className="container text-bg-dark p-3">
          <Row>
            <Form.Group as={Col} md="12" controlId="valorTotalTributos">
              <Form.Label>Cliente:</Form.Label>
              <BarraBusca
                campoChave={"id"}
                campoExibicao={"cnpj"}
                campoBusca={"nome"}
                dados={listaClientes}
                funcaoSelecao={setClienteSelecionado}
                placeHolder={"Selecione um cliente"}
                valor={""}
              />
            </Form.Group>
          </Row>
          </div>
        <Row>
          {
            //Seção resposável por permitir que produtos sejam selecionados para a venda
            //Demonstração de relacionamento muitos para muitos
          }
          <div  className="container text-bg-dark p-3">
            <Container className="m-8">
              <Row className="m-3">
                <Col md={2}>
                  <Form.Label>Funcionario responsavel</Form.Label>
                </Col>
                <Col>
                  <CaixaSelecao
                    enderecoFonteDados={"http://localhost:3001/funcionario"}
                    campoChave={"id"}
                    campoExibicao={"nome"}
                    funcaoSelecao={setFuncSelecionado}
                    localLista={"listafuncionario"}
                  />
                </Col>
              </Row>
              <Row>
                {
                  //Seção ficará responsável por detalhar o produto selecionado
                }
                <Col md={10}>
                  <Row>
                    <Col md={1}>
                      <Form.Group>
                        <Form.Label>ID:</Form.Label>
                        <Form.Control
                          type="text"
                          value={funcSelecionado?.id}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Nome Funcinério:</Form.Label>
                        <Form.Control
                          type="text"
                          value={funcSelecionado?.nome}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label>Bater Ponto:</Form.Label>
                        <Form.Control
                          type="date"
                          value={funcinarioProjeto.dataAtribuicao}
                          onChange={handleChange}
                          name="dataAtribuicao"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Função do funcionário:</Form.Label>
                        <Form.Control
                          type="text"
                          value={funcinarioProjeto.fp_descricao}
                          onChange={handleChange}
                          name="fp_descricao"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={1} className="middle">
                      <Form.Group>
                        <Form.Label>Adicionar</Form.Label>
                        <Button onClick={changeProjeto}>
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
              <Row className="mt-3">
                <p>
                  <strong>Lista de Funcinario responsável</strong>
                </p>
                <TabelaFuncionario
                  listaFuncs={projeto.funcs}
                  setProjeto={setProjeto}
                  dadosProjeto={projeto}
                />
              </Row>
            </Container>
          </div>
        </Row>
        <Button className="btn btn-success" type="submit">Confirmar responsável</Button>
      </Form>
    </>
  );
}
