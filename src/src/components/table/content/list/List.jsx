import { useState, useEffect } from "react"
import styles from "./List.module.css"
import { priceundefined } from "../../../../data/references.json"

const parseJsxElements = (elements) => {
    const lines = [];
    elements.rows.forEach((element, i) => {
        lines.push(
            <div key={i} className={styles.element_container}>
                <p className={styles.element_name}>{element[0]}</p>
                <div className={styles.element_prices}>{parseJsxPrices(elements.columns, element)}</div>
                <hr style={{marginTop: '1rem'}}/>
            </div>
        )
    })
    return lines;
}

const parseJsxPrices = (headers, prices) => {
    const vars = []
    for (const i in prices) {
        const value = prices[i] == '' ? priceundefined : prices[i];
        if (i != 0) vars.push( // name omited
            <p key={i}>{headers[i]}: {value}</p>
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
        { elements === undefined ?
            <div>
                <p>Cargando...</p>
            </div> 
        : elements === null ?
            <div>
                <p>No hay datos</p>
            </div>
        : <div className={styles.list}>
            <hr style={{marginTop: '1rem', marginBottom: '1rem'}}/>
            <>{rows}</>
        </div>
        }
    </>)
}