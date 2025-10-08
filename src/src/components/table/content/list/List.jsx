import { useState, useEffect } from "react"
import styles from "./List.module.css"
import ListItem from "./ListItem"

const parseJsxElements = (elements) => {
    const lines = [];
    elements.rows.forEach((element, i) => {
        lines.push(
            <div key={i} className={styles.element_container}>
                <p className={styles.element_name}>{element[0]}</p>
                <div className={styles.element_prices}>{parseJsxPrices(elements.columns, element, i)}</div>
                <hr style={{marginTop: '1rem'}}/>
            </div>
        )
    })
    return lines;
}

const parseJsxPrices = (headers, prices, k) => {
    const vars = []
    const name = prices[0]
    for (const i in prices) {
        const value = prices[i]
        if (i != 0) vars.push( // name omited
            <ListItem key={i} name={name} id={`${k}-${i}`} header={headers[i]} price={value}/>
        )
    }
    return vars;
}

export default function List({elements}) {

    const [ rows , setRows ] = useState()

    useEffect(() => { 
        if (elements != undefined && elements != null) {
            setRows(parseJsxElements(elements))
        }
    }, [elements]);

    return (<>
        <div className={styles.list}>
            <hr style={{marginTop: '1rem', marginBottom: '1rem'}}/>
            <>{rows}</>
        </div>
    </>)
}