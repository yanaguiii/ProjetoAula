import styles from "./Message.module.css";
import {useState, useEffect} from "react";


function Message({ msg, type }) {

    const[visible,setVisible] = useState(false)

    useEffect(() => {
        if(!msg){
            setVisible(false)
            return
        }
        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [msg])


    return (
        // Usando crases para combinar a classe base com a classe dinâmica
        <>
            {visible && (
                <div className={`${styles.msg} ${styles[type]}`}>
                    {msg}
                </div>
            )}
        </>
    );
}

export default Message;