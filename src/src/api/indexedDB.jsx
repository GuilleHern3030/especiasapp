import { maxminutesondb } from '../data/references.json'

const DB_NAME = "CenitEspeciasDB"
const TABLE_NAME = "tables"

const addTableToIDB = (tableName, csv, IDBrequest=window.indexedDB.open(DB_NAME, 1)) => {
    if (!(tableName == undefined || csv == null)) try {
        const now = new Date();
        const IDBtransaction = IDBrequest.result.transaction(TABLE_NAME, "readwrite")
        const objectStore = IDBtransaction.objectStore(TABLE_NAME)
        objectStore.put({ name: tableName, content: csv, savedAt: now.toISOString() })
        IDBtransaction.addEventListener("complete", () => {
            //console.log("CSV has been added to " + tableName)
        })
    } catch(exception) {
        console.error(exception)
    }
    return csv;
}

const getTableFromIDB = (tableName, IDBrequest=window.indexedDB.open(DB_NAME, 1)) => {
    return new Promise((resolve, reject) => {
        try {
            const transaction = IDBrequest.result.transaction(TABLE_NAME, "readonly");
            const objectStore = transaction.objectStore(TABLE_NAME);
            const request = objectStore.get(tableName)
            request.onsuccess = () => {
                if (request.result != undefined) {
                    const now = new Date();
                    const saved = new Date(request.result.savedAt);
                    const diffMinutes = Math.floor((now - saved) / 60000);
                    resolve(diffMinutes < maxminutesondb ? request.result.content : null)
                } else reject()
            }
        } catch (err) {
            reject(err);
        }
    });
}

export default async function IndexedDB() {

    const result = request => {
        const getTable = tableName => getTableFromIDB(tableName, request)
        const addTable = (tableName, csv) => addTableToIDB(tableName, csv, request)
        return { getTable, addTable }
    }

    return new Promise((resolve, reject) => {
        try {
            const request = window.indexedDB.open(DB_NAME, 1)
            request.onupgradeneeded = event => {
                const db = event.target.result
                if (!db.objectStoreNames.contains(TABLE_NAME))
                    db.createObjectStore(TABLE_NAME, { keyPath: "name" })
                resolve(result(request))
            }
                
            request.onsuccess = () => { resolve(result(request)) }
            request.onerror = (event) => { reject(event.target) }
        } catch(exception) {
            reject(exception)
        }
    })
}