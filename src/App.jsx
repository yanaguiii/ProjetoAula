import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import Sobre from "./components/pages/Sobre.jsx";
import Contato from "./components/pages/Contato.jsx";
import Funcao from "./components/pages/Funcao.jsx";
import Container from "./components/layout/Container.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Projects from "./components/pages/Projects.jsx";


function App() {
  return (
        <Router>
            <Navbar></Navbar>
            <Container customClass='min-height'>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/sobre" element={<Sobre/>} />
                        <Route path="/contato" element={<Contato/>} />
                        <Route path="/funcao" element={<Funcao/>} />
                        <Route path="/projects" element={<Projects/>}/>

                    </Routes>
            </Container>
            <Footer></Footer>
        </Router>

  )
}

export default App
