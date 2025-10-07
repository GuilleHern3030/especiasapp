const DB_NAME = "tables"


const IDBrequest = window.indexedDB.open(DB_NAME, 1)

export const addTable = (json, ...tablenames) => {
    const tableName = tablenames.join("¬")
    const IDBtransaction = IDBrequest.result.transaction(DB_NAME, "readwrite")
    const objectStore = IDBtransaction.objectStore(tableName)
    objectStore.add(json)
    IDBtransaction.addEventListener("complete", () => {
        console.log(json + " has been added to " + tableName)
    })
}

export const getTable = (...tablenames) => {
    const tableName = tablenames.join("¬")
    const IDBtransaction = IDBrequest.result.transaction(DB_NAME, "readonly")
    const objectStore = IDBtransaction.objectStore(tableName)
    const cursor = objectStore.openCursor()
    cursor.addEventListener("success", () => {
        if (cursor.result) {
            console.log(cursor.result.value)
        } else {
            console.log("Todos los datos fueron leidos")
        }
    })
}

export const createIndexedDB = () => {
    const request = window.indexedDB.deleteDatabase("tables")
    request.onsuccess = function() {
        window.indexedDB.open("tables", 1)
    }
}

export default function useIndexedDB() {
    return IDBrequest;
}