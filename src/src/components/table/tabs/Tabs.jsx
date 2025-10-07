import useTable from '../../../hooks/useTables';
import styles from './Tabs.module.css'
import { useEffect } from 'react';
import Tab from './Tab'

const generateCells = (route, subRoutes) => subRoutes.map((name, index) => 
    <Tab key={index} route={route} name={name}/>
)

const generateTabs = (tabSelected, getSubRoutes) => {
    if (tabSelected == undefined) return null;
    
    const tabs = []
    for (let row = 0; row <= tabSelected.length; row++) {
        const route = tabSelected.slice(0, row);
        const { subRoutes, final } = getSubRoutes(route)
        if (final != true) tabs.push(
            <div className={styles.tab} key={row}>
                { generateCells(route, subRoutes) }
            </div>)
    }

    return tabs;

}

export default function Tabs(children) {

    const { tabSelected, getSubRoutes } = useTable()

    return <>
        <div className={styles.tabs}>
            {
                generateTabs(tabSelected, getSubRoutes)
            }
        </div>
    </>
}