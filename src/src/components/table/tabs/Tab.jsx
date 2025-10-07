import useTable from "../../../hooks/useTables"
import styles from "./Tab.module.css"

export default function Tab({route, name}) {

    const { onTabSelected, tabSelected } = useTable()

    const fullRoute = route.length == 0 ? name : route.join("¬") + "¬" + name
    const isSelected = (tabSelected.join("¬")).includes(fullRoute)

    return <div 
        id={fullRoute} 
        onClick={() => onTabSelected(fullRoute.split("¬"))}
        className={ isSelected ? `${styles.cell} ${styles.tabSelected}` : `${styles.cell}` }
        >
            <p className={styles.unselect}>{name}</p>
    </div>
}