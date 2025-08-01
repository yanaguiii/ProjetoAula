import {Link} from "react-router-dom";

import Container from "./Container"
import styles from "./Navbar.module.css"
import logo from "../../img/costs_logo.png"


function Navbar(){
    return(
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                    <img src={logo} alt="logo"/>
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to="/">Home</Link></li>
                    <li className={styles.item}><Link to="/newproject">New Project</Link></li>
                    <li className={styles.item}><Link to="/sobre">Sobre</Link></li>
                    <li className={styles.item}><Link to="/contato">Contato</Link></li>
                    <li className={styles.item}><Link to="/projects">Projects</Link></li>
                </ul>
            </Container>
        </nav>
    )
}
export default Navbar