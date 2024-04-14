import { Button, Container, Table } from "react-bootstrap";


export default function TabelaVagas(props) {
   
    return (
        <Container className="m-3 border">
        <Table striped bordered hover className="table-dark">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome Vaga</th>
                    <th>Salário</th>
                    <th>cidade</th>
                    <th>quantidade</th>
                    <th>Ação</th>
                    
                </tr>
            </thead>
            <tbody>
                {
                    props.listaVagas?.map((vaga, indice) => {
                        
                        /*salario: vagasSelecionado?.salario, 
                        cidade: vagasSelecionado?.cidade, 
                        quantidade: vagasSelecionado?.quantidade*/
                        console.log(vaga)
                        return <tr key={indice}>
                            <td>{vaga.codigo}</td>
                            <td>{vaga.nome}</td>
                            <td>{vaga.salario}</td>
                            <td>{vaga.cidade}</td>
                            <td>{vaga.quantidade}</td>
                            
                            <td>
                                
                                <Button className="btn btn-danger" onClick={()=>{
                                    const lista = props.listaVagas.filter((prod) => prod.codigo !== vaga.codigo); 
                                    props.setInscricoes({...props.dadosInscricao, vagas:lista});
                                }}>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-dash-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"/>
                                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                    </svg>
                                </Button>

                            </td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
        
        </Container>
        
    )
    console.log()
}