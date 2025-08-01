import styles from "./Select.module.css"

function Select({text,name,options,handleOnChange,value}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select
                onChange={handleOnChange}
                value={value || ""}
                name={name}
                id={name}>
                    <option>Selecione uma opção</option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Select