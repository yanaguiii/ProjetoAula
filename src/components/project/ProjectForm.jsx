import {useEffect, useState} from "react";

import styles from "./ProjectForm.module.css"
import Input from "../form/Input.jsx";
import Select from "../form/Select.jsx";
import SubmitButton from "../form/SubmitButton.jsx";

function ProjectForm({btnText}){
    const[categories, setCategories] = useState([])


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
    }, []);
    return(
        <form className={styles.form}>
            <div>
                <Input type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                />
            </div>
            <div>
                <Input type="number"
                       text="Orçamento do projeto"
                       name="budget"
                       placeholder="Insira o orçamento total"
                />
            </div>
            <div>
                <Select name="category_id" text="Selecione a cartegoria" options={categories}/>
            </div>
            <div>
                <SubmitButton text={btnText}/>
            </div>
        </form>
    )
}
export default ProjectForm