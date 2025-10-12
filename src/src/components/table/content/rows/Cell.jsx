import styles from "./Rows.module.css"
import useTable, { useSelection } from "../../../../hooks/useTables"

export default function cell({id, name, header, content}) {
    
    const { getKey } = useTable()
    const cellId = getKey(id)

    const { handleClick, selected } = useSelection(cellId)

    return <div 
        id={cellId} 
        className={`${styles.cell} ${selected?styles.cellselected:styles.cellunselected}`} 
        onClick={() => handleClick(cellId, name, header, content)}
        >
            <p className={styles.celltext}>{content}</p>
    </div>
}
