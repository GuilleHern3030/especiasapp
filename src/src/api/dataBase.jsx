import IndexedDB from "./indexedDB";
import fetchGoogleSheets from "./googleSheets";
import { parseArrayToJSON, parseCSVToArray } from "./csv";

// Gets a Table from a DataBase (GoogleSheets or IndexedDB)
export default async function fetchTable(table, route=undefined) {

    try {
        const { getTable, addTable } = await IndexedDB()

        let csv = await getTable(table).catch(() => null)

        if (csv == null) {
            csv = await fetchGoogleSheets(table)
            console.log("HTTP request launched")
            addTable(table, csv);
        } else console.warn("Table loaded from cache")

        const array = parseCSVToArray(csv)
        const json = parseArrayToJSON(array)
        
        if (json != null)
            json.route = route

        return json

    } catch (err) {
        console.error(err)
        return null;
    }

        

    /*const csv = await getTable(link)
        .catch(() => fetchGoogleSheets(link))
        .then(csv => addTable(csv))

    addTable("Test", '"Total","Asd"')
    
    return parseCSVtoJSON(csv)*/
    
}