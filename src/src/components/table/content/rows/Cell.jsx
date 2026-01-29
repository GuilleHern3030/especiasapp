import styles from "./Rows.module.css"
import useTable, { useSelection } from "../../../../hooks/useTables"

export default function cell({id, name, header, content, gridColumn}) {
    
    const { getKey } = useTable()
    const cellId = getKey(id)
    const { handleClick, selected } = useSelection(cellId)

    return content?.length > 0 ? 
        <div 
            id={cellId} 
            style={gridColumn ? {gridColumn} : undefined}
            className={`${styles.cell} ${selected?styles.cellselected:styles.cellunselected}`} 
            onClick={() => handleClick(cellId, name, header, content)}>
            <p className={styles.celltext}>{content}</p>
        </div>
        :
        <div 
            id={cellId} 
            style={gridColumn ? {gridColumn} : undefined}
            className={styles.cell}>
            <p className={styles.celltext}>{content}</p>
        </div>

}
