import styles from "./Projects.module.css"
import ProjectForm from "../project/ProjectForm.jsx";

function Projects() {
    return(
        <div className={styles.newproject_container}>
            <h1>Projects</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm btnText="Criar Projeto"/>
        </div>
    )
}

export default Projects