import styles from "./Project.module.css"
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import Loading from "../layout/Loading.jsx";
import Container from "../layout/Container.jsx";
import ProjectForm from "../project/ProjectForm.jsx";
import Message from "../layout/Message.jsx";
import ServiceForm from "../service/ServiceForm.jsx";

import {parse, v4 as uuidv4} from "uuid"


function Project(){
    const [project,setProject] = useState({})
    const {id} = useParams()

    const [showProjectForm,setShowProjectForm]= useState(false)
    const [showServiceForm,setShowServiceForm]= useState(false)

    const [message,setMessage] = useState("")
    const [type,setType] = useState("")



    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5050/projects/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    function createService(project){
        setMessage("")
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost> parseFloat(project.budget)){
            setMessage("Orçamento ultrapassado, verifique o valor do serviço")
            setType("error")
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5050/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then(resp => resp.json())
            .then((data) => {
                //exibir o servico
                console.log(data)
            })
            .catch(err => console.log(err))
    }


    function editPost(project){
        setMessage("")
        if(project.budget < project.cost){
            setMessage(`O orçamento não pode ser menor que o custo do projeto!`)
            setType("error")
            return false
        }

        fetch(`http://localhost:5050/projects/${project.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project),
        })
            .then(resp => resp.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false)
                setMessage("Projeto alterado com sucesso!")
                setType("success")            })
            .catch(err => console.log(err))
    }


    return(
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message}/>}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? "Editar projeto" : "Fechar projeto"}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span>{project.category?.name}
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
                                    <ProjectForm handleSubmit={editPost}
                                                 btnText="Concluir edição"
                                                 projectData={project}/>
                                </div>
                            )}

                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? "Adicionar serviço" : "Fechar projeto"}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                    btnText="Adicionar serviço"
                                    projectData={project}/>
                                )}
                            </div>
                        </div>
                        <h2>Servicos</h2>
                        <Container customClass="start">
                            <p>Itens de serviços</p>
                        </Container>
                    </Container>
                </div>
            ): (
                <Loading/>
            )}
        </>
    )
}

export default Project