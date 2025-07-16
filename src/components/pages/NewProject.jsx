import styles from "./NewProject.module.css"
import ProjectForm from "../project/ProjectForm.jsx";
import {data, useNavigate} from "react-router-dom"

function NewProject() {

    const navigate = useNavigate()

    function createPost(project){
        //initialize costs and services
        project.cost = 0
        project.services = []

        fetch("http://localhost:5050/projects", {
            method: "POST",
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project),
        })
            .then(resp => resp.json())
            .then((data) => {
                    console.log(data)
                    //redirect
                navigate('/projects', { state: { message: 'Projeto criado com sucesso!' } });
            })
            .catch(err => console.log(err))
    }

    return(
        <div className={styles.newproject_container}>
            <h1>Projects</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProject