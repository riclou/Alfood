import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes';
import AdicionarRestaurante from './paginas/Administracao/Restaurantes/AdicionarRestaurante';
import HeaderAdm from './paginas/Administracao/HeaderAdm';
import AdministracaoPratos from './paginas/Administracao/Pratos/AdministracaoPratos';
import AdicionarPrato from './paginas/Administracao/Pratos/AdicionarPratos';

function App() {

  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />


      <Route path="/admin" element={<HeaderAdm /> }>

        <Route path="restaurantes" element={<AdministracaoRestaurantes/>} />
        <Route path="restaurantes/novo" element={<AdicionarRestaurante/>} />
        <Route path="restaurantes/:id" element={<AdicionarRestaurante/>} />

        <Route path="pratos" element={<AdministracaoPratos/>} />
        <Route path="pratos/novo" element={<AdicionarPrato/>} />

      </Route>

    </Routes>
  );
}

export default App;
