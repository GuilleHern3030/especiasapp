import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { haveSelections } from "../api/sessionStorage"
import { TablesContext } from "../context/TablesContext";

const handleName = (name, header, content) => {
    return `${name} (${header}): $${content}`
}

export default function useSelection(key) {

    const { setAreThereSelections } = useContext(TablesContext)
    const [ selected, setSelected ] = useState()

    const handleClick = (key, name, header, content) => {
        if (key) {
            if (selected) {
                setSelected(false)
                sessionStorage.removeItem(key)
                setAreThereSelections(haveSelections())
            } else {
                setSelected(true)
                sessionStorage.setItem(key, handleName(name, header, content))
                setAreThereSelections(true)
            }
        }
    }

    if (key) {
        useEffect(() => { 
            setSelected(sessionStorage.getItem(key) != null)
        }, [])
    }

    return { handleClick, selected }
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