import { createContext, useState, useEffect, useRef } from "react";

import { fetchTable } from "../api/tables";

import { links_uri, basename } from '../data/references.json'
import { amountOfSelections } from "../api/sessionStorage";
const LINKS_URI = basename+links_uri

export const TablesContext = createContext();

/**
 * Carga googlesheets.json el cual contiene los nombres de 
 * las tablas del GoogleSheets, así como de la ubicación en
 * el árbol de tabs del website.
 * Una vez cargado, se selecciona la primer tabla encontrada
 * en el googlesheets.json
 */
export function TablesContextProvider(props) {

    const initialized = useRef(false);

    const [ isLoading, setIsLoading ] = useState(false)
    const [ tableLinks, setTableLinks ] = useState(undefined)
    const [ tabSelected, setTabSelected ] = useState(undefined)
    const [ table, setTable ] = useState(undefined)
    const [ selections, setSelections ] = useState(amountOfSelections())

    useEffect( () => {
      if (initialized.current) return; // evita múltiples ejecuciones
      initialized.current = true;

      // Obtiene los links del GoogleSheets
      fetch(LINKS_URI)
        .then(res => isJSON(res))
        .then(data => data.json())
        .then(json => setRoutes(json))
        .catch(err => setRoutes(null))
    }, []);

    const setRoutes = json => {
      if (json != null) {
        const { tab, link } = defaultTable(json)
        setTabSelected(tab)
        setTableLinks(json)
        loadTable(link, tab)
      } else {
        console.error("Tables not loaded")
        loadTable(null)
        setTabSelected(null)
        setTableLinks(null)
      }
    }

    const loadTable = async (tableLink, tabSelected=undefined) => {
      try {
        setTable(undefined)
        setIsLoading(true)
        const jsonTable = await fetchTable(tableLink, tabSelected)
        setTable(jsonTable)
      } catch(exception) {
        console.error(exception)
        setTable(null)
      } finally {
        setIsLoading(false)
      }
    }

    return (<>
        <TablesContext.Provider
            value = {
                {
                    tableLinks, 
                    tabSelected, 
                    setTabSelected, 
                    table, 
                    loadTable, 
                    isLoading,
                    setSelections, 
                    selections
                }
            }
        >
            {props.children}
        </TablesContext.Provider>
    </>)
}

const isJSON = res => {
  if (res.headers.get("content-type").includes("json"))
    return res
  else throw new Error("Invalid JSON or not found")
}

/**
 * Busca el primer string dentro de un árbol de json
 * @param {Record<string, any>} json árbol de tablas de GoogleSheets
 * @returns 
 */
const defaultTable = json => {
  function recorrer(obj, ruta = []) {
    for (const key in obj) {
      const value = obj[key];

      if (typeof value === "string") {
        return {
          tab: [...ruta, key],
          link: value
        };
      }

      if (typeof value === "object" && value !== null) {
        const result = recorrer(value, [...ruta, key]);
        if (result) return result;
      }
    }
    return null;
  }

  return recorrer(json);
}