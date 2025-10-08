import styles from './List.module.css'

import useTable from '../../../../hooks/useTables'
import useSelection from '../../../../hooks/useSelection'

export default function ListItem({id, name, header, price: content}) {

    const { getKey } = useTable()
    const itemId = getKey(id)

    const { handleClick, selected } = useSelection(itemId)

    return <div 
        id={itemId} 
        className={styles.item} 
        onClick={() => handleClick(itemId, name, header, content)}
        >
            <p className={selected ? styles.element_selected : styles.element_unselected}>
                {header}: {content}
            </p>
        </div>
}