import { useContext } from 'react'
import { TablesContext } from '../context/TablesContext'

export default function useTable() {

  const { tableLinks, tabSelected, setTabSelected, table, loadTable } = useContext(TablesContext)

    const onTabSelected = tabSelected => {
        const route = typeof(tabSelected) === "string" ? tabSelected.split("¬") : tabSelected.slice()
        setTabSelected(route)
        const { link } = getSubRoutes(tableLinks, route)
        if (link != null)
            loadTable(link)
    }

    const subRoutes = tab => {
        const route = typeof(tab) === "string" ? tab.split("¬") : tab
        return getSubRoutes(tableLinks, route)
    }

    return {
        onTabSelected,
        getSubRoutes: subRoutes,
        tables: tableLinks, // Json
        tabSelected, // Array
        table // String (link)
    }

}

const getKeys = json => {

    if (typeof(json) === "string")
        return null;

    const keys = []
    for (const key in json)
        keys.push(key)
    return keys;
}

/**
 * Obtain all sub routes from a selected route
 * @param {JSON} json Object with all links and routes of tables
 * @param {Array} keys Route selected (can be empty)
 * @returns 
 */
const getSubRoutes = (json, route=[]) => {

    const subRoutes = (json, route=[]) => {

        if (route.length > 0) {
            const subRoute = route.shift()
            const subJson = json[subRoute]
            return subRoutes(subJson, route)
        }

        const keys = getKeys(json)

        return {
            subRoutes: keys,
            final: keys == null,
            link: keys == null ? json : null
        }
    }

    return subRoutes(json, route.slice())
}