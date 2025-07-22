import styles from "./Project.module.css"
import {data, useParams} from "react-router-dom";
import {useState, useEffect, use} from "react";
import Loading from "../layout/Loading.jsx";
import Container from "../layout/Container.jsx";


function Project(){
    const [project,setProject] = useState([])
    const {id} = useParams()

    const [showProjectForm,setShowProjectForm]= useState(false)


    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5050/projects/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "aplication/json",
                },
            })
                .then(resp => resp.json())
                .then((data) => {
                    setProject(data)
                })
                .catch(err => console.log(err))
            },300)
    }, [id])

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }



    return(
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? "Editar projeto" : "Fechar projeto"}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span>{project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento: </span>R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado: </span>R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <p>detalhes do projeto</p>
                                </div>
                            )}

                        </div>
                    </Container>
                </div>
            ): (
                <Loading/>
            )}
        </>
    )
}

export default Project