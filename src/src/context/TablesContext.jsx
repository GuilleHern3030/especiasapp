import { createContext, useState, useEffect } from "react";

import { createIndexedDB } from "../hooks/useIndexedDB";
import useGoogleSheets from "../hooks/useGoogleSheets";

import { links_uri, basename } from '../data/references.json'
const LINKS_URI = basename+links_uri

export const TablesContext = createContext();

export function TablesContextProvider(props) {

    const [ tableLinks, setTableLinks ] = useState(undefined)
    const [ tabSelected, setTabSelected ] = useState(undefined)
    const [ table, setTable ] = useState(undefined)

    useEffect( () => {
      createIndexedDB()
      fetch(LINKS_URI)
        .then(res => isJSON(res))
        .then(res => res.json())
        .then(json => setRoutes(json))
        .catch(err => setRoutes(null))
    }, []);

    const loadTable = async tableLink => {
      console.log("Loading table from " + tableLink)
      setTable(undefined)
      const jsonTable = await useGoogleSheets(tableLink)
      console.log("Table loaded:\n", jsonTable)
      setTable(jsonTable)
    }

    const setRoutes = json => {
      if (json != null) {
        const { tab, link } = defaultTable(json)
        loadTable(link)
        setTabSelected(tab)
        setTableLinks(json)
        console.log(
          "Links setted:", json, 
          "\nDefault tab selected:", tab,
          "\nDefault table selected:", link)
      } else {
        console.error("Tables not loaded")
        loadTable(null)
        setTabSelected(null)
        setTableLinks(null)
      }
    }

    return (<>
        <TablesContext.Provider
            value = {
                {
                    tableLinks, tabSelected, setTabSelected, table, loadTable
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