import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import Sobre from "./components/pages/Sobre.jsx";
import Contato from "./components/pages/Contato.jsx";
import Projects from "./components/pages/Projects.jsx";
import Container from "./components/layout/Container.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import NewProject from "./components/pages/NewProject.jsx";


function App() {
  return (
        <Router>
            <Navbar></Navbar>
            <Container customClass='min-height'>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/sobre" element={<Sobre/>} />
                        <Route path="/contato" element={<Contato/>} />
                        <Route path="/projects" element={<Projects/>} />
                        <Route path="/newproject" element={<NewProject/>}/>

                    </Routes>
            </Container>
            <Footer></Footer>
        </Router>

  )
}

export default App
