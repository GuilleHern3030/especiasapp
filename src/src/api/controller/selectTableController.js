import IndexedDB from "../indexedDB";
import { googlesheetv4_uri, basename, apikey } from '../../data/references.json'
const V4_URI = basename+googlesheetv4_uri

export default async (table) => {
    
    const { getTable, addTable } = await IndexedDB()
    
    return getTable(table)
    .then(data => {
        console.warn("Table loaded from cache")
        return data
    })
    .catch(async () => { // Si no está actualizado en IndexedDB, se hace fetch
        console.log("HTTP request launched")
        const content = await getGoogleSheets(table)
        await addTable(table, content) // Se agrega a IndexedDB
        return content
    })

}

/**
 * Obtiene una tabla de GoogleSheets
 * @param {string} link Link o Nombre del GoogleSheets
 * @returns {Promise<string[][]>} Contenido de la tabla
 */
const getGoogleSheets = async(link) => {
  try {
    return link.startsWith("https://") ?
      await fetchGoogleSheets(link) :
      await fetchGoogleSheetsV4(link)
  } catch (err) { 
    return null; 
  }
}

const fetchV4 = (sheetName, sheetId) =>  
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apikey}`)

// Gets the GoogleSheets information in CSV format
const fetchGoogleSheets = async url => 
  url == null ? url : fetch(url)
    .then(res => res.json())
    .then(csv => csv.startsWith(ELEMENT_CONTAINER) ? csv : // checks csv format
      errManager("Invalid GoogleSheets link URL?\nDocument obtained doesn't have CSV format\n" + csv))
    .catch(err => errManager("Invalid GoogleSheets link URL?\n" + err))

// Gets the GoogleSheets information with v4 API in CSV format
const fetchGoogleSheetsV4 = async sheetName => 
  sheetName == null ? sheetName : fetch(V4_URI)
    .then(res => res.json())
    .then(json => json.sheetid)
    .then(sheetid => fetchV4(sheetName, sheetid))
    .then(v4Info => v4Info.json()) // Keys: range, majorDimension, values
    .then(v4Json => v4Json.values) // Array of cells
    .catch(err => errManager("Invalid GoogleSheets v4 sheetName?\n" + err))

// Error manager
const errManager = err => {
  console.error(err)
  return null;
}