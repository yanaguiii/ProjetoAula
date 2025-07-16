import styles from "./home.module.css"
import savings from "../../img/savings.svg"
import LinkButton from "../layout/LinkButton.jsx";

function Home() {
    return(
        <section className={styles.home_container}>
            <h1>Bem vindo ao <span>Costs</span></h1>
            <p>Comece a usar agora</p>
            <LinkButton text={"Crie um projeto agora"} to={"/newproject"}></LinkButton>
            <img src={savings} alt="costs"/>
        </section>
    )
}

export default Home