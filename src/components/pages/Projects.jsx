import Message from "../layout/Message.jsx";
import {useLocation} from "react-router-dom";
import styles from "./Projects.module.css"
import Container from "../layout/Container.jsx";
import LinkButton from "../layout/LinkButton.jsx";
import ProjectCard from "../project/ProjectCard.jsx";
import {useState, useEffect} from "react";
import Loading from "../layout/Loading.jsx";

function Projects() {

    const location = useLocation()
    let message = location.state?.message

    const [projects,setProjects] = useState([])
    const [removeLoading,setRemoveLoading] = useState(false)

    useEffect(() => {
        fetch("http://localhost:5050/projects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(resp => resp.json())
            .then((data) => {
                console.log(data)
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch(err => console.log(err))
    }, []);

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Projects</h1>
                <LinkButton text={"Crie um projeto agora"} to={"/newproject"}></LinkButton>
            </div>
            {message && <Message msg={message} type={"success"}/>}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                    <ProjectCard
                        name={project.name}
                        id={project.id}
                        budget={project.budget}
                        category={project.category?.name}
                        key={project.id}
                    />
                    ))}
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 &&(
                    <p>Não há projetos cadastrados! </p>
                )}
            </Container>
        </div>
    )
}

export default Projects