import selectTable from "../controller/selectTableController"

// Gets a Table from a DataBase (GoogleSheets or IndexedDB)
export default async (table, route = undefined) => {

    try {

        const data = await selectTable(table)
        console.log(`Table loaded (${table}):`, data)

        const array = parseCSVToArray(data)
        const json = parseArrayToJSON(array)

        if (json != null)
            json.route = route

        return json

    } catch (err) {
        console.error(err)
        return null;
    }

}


// Parse an Array from API GoogleSheetsV4 to CSV
const parseCSVToArray = csv => {

    const NEWLINE = "\n";
    const ELEMENT_CONTAINER = '"';

    if (csv == null) return null;
    if (Array.isArray(csv)) return csv.slice();
    if (typeof (csv) !== 'string') return null

    // Parse a row from a CSV into an Array
    const getArrayLine = line => {
        const arrayLine = [];
        let l = 0;
        while (l < line.length) {
            if (line.substring(l, l + 1).includes(ELEMENT_CONTAINER)) {
                const end = line.substring(l + 1).indexOf(ELEMENT_CONTAINER) + l + 1;
                arrayLine.push(line.substring(l + 1, end));
                l = end + 2;
            } else { // null
                arrayLine.push(null);
                l += 5;
            }
        }
        return arrayLine;
    }

    // Parse lines from CSV into Rows (Array)
    const getRows = (content, columns) => {
        const rows = []
        while (content.length > 0) {
            const line = content.shift();
            if (typeof line === 'string' && line.length > 0) {
                const arrayLine = getArrayLine(line);
                if (arrayLine.length == columns)
                    rows.push(arrayLine);
                else console.error("En su archivo de datos no debe haber comillas dobles\nLa fila '" + arrayLine + "' fue eliminada");
            }
        }
        return rows;
    }

    const lines = csv.split(NEWLINE)
    const columns = getArrayLine(lines.shift()) // first row is headers
    const rows = getRows(lines, columns.length);

    const array = []
    array.push(columns)
    rows.forEach(row => { array.push(row) })
    return array
}

// Parse CSV content into Articles object
const parseArrayToJSON = array => {
    if (array == null || !Array.isArray(array)) return null;

    const columns = array.shift() // first row is headers

    // rows with columns formated
    const rows = array.map(row => {
        if (row.length > 1) {
            while (row.length < columns.length) row.push("")
            while (row.length > columns.length) row.pop("")
        }
        return row
    })

    //const cellId = (row, column) => `${row}-${column}`;

    const getCell = (row, column) => {
        return row >= 0 && row < rows.length && column >= 0 && column < columns.length ?
            {
                name: rows[row][0],
                header: columns[column],
                price: column == 0 ? null : rows[row][column] == "" ? undefined : rows[row][column],
                //cellId: cellId(row, column)
            } : null
    }

    const isLongRow = (row) => {
        const rowArray = (typeof(row) == 'number') ? rows[row] : row
        const rowsWithContent = rowArray?.filter(row => row.length > 0)
        return rowsWithContent?.length === 1
    }
    const isEmptyRow = (row) => {
        const rowArray = (typeof(row) == 'number') ? rows[row] : row
        const rowsWithContent = rowArray?.filter(row => row.length > 0)
        return rowsWithContent?.length === 2 && columns.length !== 2
    }

    return {
        columns,
        rows,
        getCell,
        isLongRow,
        isEmptyRow
    }
}