import styles from "./Rows.module.css"
import Cell from "./Cell"

export const LongRow = ({ content, columns }) => {

    return <div 
        className={`${styles.cell} ${styles.longcell}`}
        style={{gridColumn:`1 / ${columns + 1}`}}
        >
            <p className={`${styles.celltext} ${styles.longcelltext}`}>{content}</p>
    </div>
}

export const EmptyRow = ({ k, row, name, header, content, columns }) => {

    const hasNumbers = (str) => /\d/.test(str)

    return <>
        <div key={k} className={`${styles.cell}`}>
            <p className={styles.celltext}>{name}</p>
        </div>
        { hasNumbers(content) ? 
            <Cell
                key={k+1} 
                id={`${row}-1`} 
                name={name} 
                header={header} 
                content={content}
                gridColumn={`2 / ${columns + 1}`}
            />
            :
            <div 
                key={k+1} 
                className={`${styles.cell} ${styles.emptycell}`}
                style={{gridColumn:`2 / ${columns + 1}`}}>
                <p className={styles.celltext}>{content}</p>
            </div>
        }
    </>
}