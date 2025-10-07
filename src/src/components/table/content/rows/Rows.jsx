import { useState, useEffect } from "react"
import styles from "./Rows.module.css"

const templateColumns = columns => {
    let value = "3fr";
    for (let c = 1; c < columns; c++)
        value += " 1fr"
    return value;
}

const parseJsxElements = (elements) => {
    const cells = [];
    let key = Number(elements.length) + 1;
    elements.forEach((element, i) => {
        element.forEach((data, k) => { key ++;
            cells.push(<div key={key} id={`${i}-${k}`} className={styles.cell}><p id={`cell-${key}`} className={styles.celltext}>{data}</p></div>)
        })
    })
    return cells;
}

const parseJsxHeaders = (headers) => {
    const cells = [];
    let key = 0;
    headers.forEach(header => { key++;
        cells.push(<div key={key} className={styles.headercell}><p id={`header-${key}`} className={styles.header}>{header}</p></div>)
    })
    return cells;
}

export default function Rows({elements}) {

    const [ rows , setRows ] = useState()
    const [ headers , setHeaders ] = useState()

    useEffect(() => { 
        if (elements != undefined && elements != null) {
            setHeaders(parseJsxHeaders(elements.columns))
            setRows(parseJsxElements(elements.rows))
        }
     }, [elements]);

    return (<>
        <div className={styles.table} style={{
            gridTemplateColumns: templateColumns(elements.columns.length)
        }}>
            <>{headers}</>
            <>{rows}</>
        </div>
    </>)
}