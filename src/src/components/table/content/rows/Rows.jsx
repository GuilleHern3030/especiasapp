import { useState, useEffect } from "react"
import styles from "./Rows.module.css"
import Cell from './Cell'
import { LongRow, EmptyRow } from './Row'


const templateColumns = columns => {
    let value = "3fr";
    for (let c = 1; c < columns; c++)
        value += " 1fr"
    return value;
}

const parseJsxRows = (table) => {
    const cells = [];
    let key = Number(table.rows.length) + 1;
    table.rows.forEach((row, i) => {
        if (table.isLongRow(i)) {
            key ++
            cells.push(
                <LongRow 
                    key={key} 
                    content={row[0]} 
                    row={1} 
                    columns={table.columns.length}
                />
            )
        }
        else if (table.isEmptyRow(i)) {
            key +=2
            cells.push(
                <EmptyRow
                    key={key}
                    k={key}
                    row={i} 
                    name={row[0]} 
                    content={row[1]} 
                    header={table.columns[1]} 
                    columns={table.columns.length}
                />
            )
        }
        else {
            const name = row[0]
            row.forEach((content, k) => { key ++;
                const header = table.columns[k]
                const id = k != 0 ? `${i}-${k}` : undefined
                cells.push(
                    <Cell 
                        key={key} 
                        id={id} 
                        header={header} 
                        name={name} 
                        content={content}
                    />
                )
            })
        }
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

export default function Rows({table}) {

    const [ rows , setRows ] = useState()
    const [ headers , setHeaders ] = useState()

    useEffect(() => { 
        console.log("Tabla:", table)
        if (table != undefined && table != null) {
            setHeaders(parseJsxHeaders(table.columns))
            setRows(parseJsxRows(table))
        }
     }, [table]);

    return (<>
        <div className={styles.table} style={{
            gridTemplateColumns: templateColumns(table.columns.length)
        }}>
            <>{headers}</>
            <>{rows}</>
        </div>
    </>)
}