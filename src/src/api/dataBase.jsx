import IndexedDB from "./indexedDB";
import fetchGoogleSheets from "./googleSheets";
import { parseCSVtoJSON } from "./csv";

// Gets a Table from a DataBase (GoogleSheets or IndexedDB)
export default async function fetchTable(table) {

    try {
        const { getTable, addTable } = await IndexedDB()

        let csv = await getTable(table).catch(() => null)

        if (csv == null) {
            csv = await fetchGoogleSheets(table)
            console.log("HTTP request launched")
            addTable(table, csv);
        } else console.warn("Table loaded from cache")
        
        const json = parseCSVtoJSON(csv)

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