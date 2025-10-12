import { useContext, useState, useEffect } from 'react'
import { TablesContext } from '../context/TablesContext'
import { useLocation } from "react-router-dom";
import { amountOfSelections } from "../api/sessionStorage"

const handleName = (name, header, content) => {
    return `${name} (${header}): $${content}`
}

export function useSelection(key) {

    const { setSelections } = useContext(TablesContext)
    const [ selected, setSelected ] = useState()

    const handleClick = (key, name, header, content) => {
        if (key) {
            if (selected) {
                setSelected(false)
                sessionStorage.removeItem(key)
                setSelections(amountOfSelections())
            } else {
                setSelected(true)
                sessionStorage.setItem(key, handleName(name, header, content))
                setSelections(amountOfSelections())
            }
        }
    }

    useEffect(() => { 
        if (key) {
            setSelected(sessionStorage.getItem(key) != null)
        }
    }, [])

    return { handleClick, selected }
}

export default function useTable() {

  const { tableLinks, tabSelected, setTabSelected, table, loadTable, selections, isLoading } = useContext(TablesContext)

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
        selections,
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
export const getParamRoute = param => param.split("¬").slice(0, -1)
export const getParamCell = param => param.split("¬").slice(-1)[0].split("-")

export const useParams = () => {

    const [ params, setParams ] = useState([])

    const { search } = useLocation(); // Ej: "?id=tres&name=Guille"

    useEffect(() => {
        const query = new URLSearchParams(search)
        let param = undefined
        let params = []
        let index = 1
        do {
            param = query.get(`item${index}`)
            if (param !== null)
                params.push(param)
            index++
        } while(param !== null)

        setParams(params)
        
    }, [])

    return params
}

export const ticketParams = () => {
    const selected = []
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i)
        if (key != null && key.startsWith("ITEM:")) {
            const value = sessionStorage.getItem(key)
            selected.push(`item${i+1}=${key.substring(5)}`)
        }
    }
    if (selected.length > 0) {
        const query = selected.join("&");
        const url = `?${query}`;
        return url
    } return ""
}