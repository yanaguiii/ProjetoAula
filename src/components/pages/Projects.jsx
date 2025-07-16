import Message from "../layout/Message.jsx";
import {useLocation} from "react-router-dom";
import styles from "./Projects.module.css"
import Container from "../layout/Container.jsx";
import LinkButton from "../layout/LinkButton.jsx";

function Projects() {

    const location = useLocation()
    let message = location.state?.message

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Projects</h1>
                <LinkButton text={"Crie um projeto agora"} to={"/newproject"}></LinkButton>
            </div>
            {message && <Message msg={message} type={"success"}/>}
            <Container customClass="start">
                <p>Projetos..</p>
            </Container>
        </div>
    )
}

export default Projects