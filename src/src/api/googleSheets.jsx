import { apikey } from '../data/references.json'
import { googlesheetv4_uri, basename } from '../data/references.json'

// Constants
const ELEMENT_CONTAINER = '"';
const V4_URI = basename+googlesheetv4_uri

// Error manager
const errManager = err => {
  console.error(err)
  return null;
}

const fetchV4 = (sheetName, sheetId) =>  
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apikey}`)

// Gets the GoogleSheets information in CSV format
export const fetchGoogleSheets = async url => 
  url == null ? url : fetch(url)
    .then(res => res.text())
    .then(csv => csv.startsWith(ELEMENT_CONTAINER) ? csv : // checks csv format
      errManager("Invalid GoogleSheets link URL?\nDocument obtained doesn't have CSV format\n" + csv))
    .catch(err => errManager("Invalid GoogleSheets link URL?\n" + err))

// Gets the GoogleSheets information with v4 API in CSV format
export const fetchGoogleSheetsV4 = async sheetName => 
  sheetName == null ? sheetName : fetch(V4_URI)
    .then(res => res.json())
    .then(json => json.sheetid)
    .then(sheetid => fetchV4(sheetName, sheetid))
    .then(v4Info => v4Info.json()) // Keys: range, majorDimension, values
    .then(v4Json => v4Json.values) // Array of cells
    .catch(err => errManager("Invalid GoogleSheets v4 sheetName?\n" + err))

/**
 * Gets a table from GoogleSheets
 * @param {string} link URL or SheetName to fetch
 * @returns Obtains a CSV file
 */
export default async function useGoogleSheets(link) {
  try {
    return link.startsWith("https://") ?
      await fetchGoogleSheets(link) :
      await fetchGoogleSheetsV4(link)
  } catch (err) { 
    return null; 
  }
}