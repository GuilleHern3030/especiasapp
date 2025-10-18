import styles from "./Rows.module.css"
import useTable, { useSelection } from "../../../../hooks/useTables"

export default function({content, columns}) {

    return <div 
        className={`${styles.cell} ${styles.longcell}`}
        style={{gridColumn:`1 / ${columns + 1}`}}
        >
            <p className={`${styles.celltext} ${styles.longcelltext}`}>{content}</p>
    </div>
}