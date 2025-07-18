import {useEffect, useState} from "react";

import styles from "./ProjectForm.module.css"
import Input from "../form/Input.jsx";
import Select from "../form/Select.jsx";
import SubmitButton from "../form/SubmitButton.jsx";

function ProjectForm({handleSubmit, btnText, projectData}){
    const[categories, setCategories] = useState([])
    const[project, setProject] = useState([])

    useEffect(() => {
        fetch("http://localhost:5050/categories", {
            method: "GET",
            headers:{
                'Content-type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data)
            })
            .catch((err) => console.log(err))
    }, [])


    const submit = (e) => {
        e.preventDefault()
        //console.log(project)
        handleSubmit(project)
    }

    function handleOnChange(e){
        setProject({ ...project,[e.target.name]: e.target.value })
    }

    function handleCategory(e){
        setProject({ ...project, category:{
            id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        })
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <div>
                <Input type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleOnChange}
                value={project.name ? project.name : ""}
                />
            </div>
            <div>
                <Input type="number"
                 text="Orçamento do projeto"
                 name="budget"
                 placeholder="Insira o orçamento total"
                 handleOnChange={handleOnChange}
                 value={project.budget ? project.budget : ""}
                />
            </div>
            <div>
                <Select name="category_id" text="Selecione a categoria" options={categories}
                        handleOnChange={handleCategory}
                        value={project.category ? project.category.id : ""}
                />
            </div>
            <div>
                <SubmitButton text={btnText}/>
            </div>
        </form>
    )
}
export default ProjectForm