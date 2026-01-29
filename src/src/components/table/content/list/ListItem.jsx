import styles from './List.module.css'

import useTable, { useSelection } from '../../../../hooks/useTables'

const hasNumbers = (str) => /\d/.test(str)

export default function ListItem({id, name, header, price: content}) {

    const { getKey } = useTable()
    const itemId = getKey(id)

    const { handleClick, selected } = useSelection(itemId)

    return hasNumbers(content) ? 
        <div 
            id={itemId}
            className={styles.item} 
            onClick={() => handleClick(itemId, name, header, content)}>
            <div className={`${styles.element} ${selected ? styles.element_selected : styles.element_unselected}`}>
                <p className={styles.element_header}>{header}:</p> 
                <p>{content}</p>
            </div>
        </div>
        : content?.length > 0 ?
        <div 
            id={itemId}
            className={styles.item}>
                <p className={selected ? styles.element_selected : styles.element_unselected}>
                    {content}
                </p>
        </div> : null
}