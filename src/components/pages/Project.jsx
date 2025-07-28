import styles from "./Project.module.css"
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import Loading from "../layout/Loading.jsx";
import Container from "../layout/Container.jsx";
import ProjectForm from "../project/ProjectForm.jsx";
import Message from "../layout/Message.jsx";
import ServiceForm from "../service/ServiceForm.jsx";
import ServiceCard from "../service/ServiceCard.jsx";


import {parse, v4 as uuidv4} from "uuid"


function Project(){
    const [project,setProject] = useState({})
    const {id} = useParams()

    const [showProjectForm,setShowProjectForm]= useState(false)
    const [showServiceForm,setShowServiceForm]= useState(false)

    const [message,setMessage] = useState("")
    const [type,setType] = useState("")
    const [services,setServices] = useState([])



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
                    setServices(data.services)
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

    function createService(service) { // 1. A função agora recebe o NOVO serviço do formulário
        setMessage("");

        // 2. Crie um novo objeto de serviço com um ID único
        const newService = {
            ...service,
            id: uuidv4(),
        };

        // 3. Crie uma CÓPIA atualizada do projeto
        const updatedProject = { ...project };
        updatedProject.services = [...project.services, newService];

        // 4. Valide o orçamento com base na CÓPIA
        const newCost = parseFloat(updatedProject.cost) + parseFloat(newService.cost);

        if (newCost > parseFloat(updatedProject.budget)) {
            setMessage("Orçamento ultrapassado, verifique o valor do serviço");
            setType("error");
            // Não precisa mais do .pop(), pois ainda não alteramos o estado principal
            return false;
        }

        updatedProject.cost = newCost;

        // 5. Envie a CÓPIA atualizada para a API
        fetch(`http://localhost:5050/projects/${updatedProject.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProject)
        })
            .then(resp => resp.json())
            .then((data) => {
                // 6. ATUALIZE O ESTADO com a cópia final
                setProject(data);
                setServices(data.services); // Garante que os serviços na tela também atualizem
                setShowServiceForm(false); // Fecha o formulário
            })
            .catch(err => console.log(err));
    }

    function removeService(id,cost){
        const servicesUpdate = project.services.filter((service) => service.id !== id)
        const projectUpdated = project
        projectUpdated.services = servicesUpdate;
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

        fetch(`http://localhost:5050/projects/${projectUpdated.id}`,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectUpdated),
        })
            .then(resp => resp.json())
            .then((data) => {
                setProject(projectUpdated)
                setServices(servicesUpdate)
                setMessage("Serviço removido com sucesso!")
                setType("success")
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
                            {services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.key}
                                    handleRemove={removeService}
                                    />
                                ))
                            }
                            {services.length === 0 && <p>Não há serviços cadastrados.</p>}
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