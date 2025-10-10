import { useContext } from 'react'
import { TablesContext } from '../context/TablesContext'

export default function useTable() {

  const { tableLinks, tabSelected, setTabSelected, table, loadTable, areThereSelections, isLoading } = useContext(TablesContext)

    const onTabSelected = rawRoute => {
        if (!isLoading) {
            const route = typeof(rawRoute) === "string" ? rawRoute.split("¬") : rawRoute.slice()
            if (route.join(",") != tabSelected.join(",")) {
                setTabSelected(route)
                const { link } = getSubRoutes(tableLinks, route)
                if (link != null)
                    loadTable(link, route)
            }
        }
    }

    const subRoutes = tab => {
        const route = typeof(tab) === "string" ? tab.split("¬") : tab
        return getSubRoutes(tableLinks, route)
    }

    const getKey = id => id != undefined ? "ITEM:" + table.route.join("¬") + "¬" + id : id
    const getKeys = () => { // keysSelected
        const selected = []
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i)
            if (key != null && key.startsWith("ITEM:"))
                selected.push(key)
        }
        return selected
    }

    const getSelected = () => { // keysSelected values
        const selected = []
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i)
            if (key != null && key.startsWith("ITEM:"))
                selected.push(sessionStorage.getItem(key))
        }
        return selected
    }

    const getLinkTo = fullRoute => {
        if (fullRoute != undefined) {
            const recursiveAccess = (json, route) => 
                route.length > 0 ? recursiveAccess(json[route.shift()], route) : json
            return recursiveAccess(tableLinks, fullRoute.slice())
        }
    }

    return {
        onTabSelected,
        getSubRoutes: subRoutes,
        tables: tableLinks, // Json
        tabSelected, // Array
        areThereSelections,
        table, // String (link)
        getKey, // Array
        getKeys, // Array
        getSelected, // Array
        getLinkTo, // String (link)
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