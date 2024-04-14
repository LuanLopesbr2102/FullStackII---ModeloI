import TelasCadCandidato from './Componentes/telasCad/telasCadCandidato';
import CadastroCandidato from './Componentes/telasCadastroCand/telaCadastroCandidato';
import NavBar from './Componentes/NavBar/NavBar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


import './App.css';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <NavBar/>
      <Routes>
      <Route path="/Inscricao">
          <Route path="" element={<TelasCadCandidato></TelasCadCandidato>}/> 
      </Route>
      <Route path="/Candidato">
          <Route path="" element={<CadastroCandidato></CadastroCandidato>}/> 
      </Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
