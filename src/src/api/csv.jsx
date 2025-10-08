// Constants
const NEWLINE = "\n";
const ELEMENT_CONTAINER = '"';

// Parse an Array from API GoogleSheetsV4 to CSV
const parseArrayV4ToCSV = array => {
  const headers = array[0]
  let csv = ""
  array.forEach((row, r) => {
    const columns = row.length
    csv += (r == 0 ? '"' : '\n"') + row.map(str => str.replaceAll('"', '')).join('","') + '"'
    if (headers.length > columns)
      for (let i = 0; i < (headers.length - columns); i++)
        csv += ',""'
  });
  return csv
}

// Parse a row from a CSV into an Array
const getArrayLine = line => {
    const arrayLine = [];
        let l = 0;
        while(l < line.length) {
            if (line.substring(l, l+1).includes(ELEMENT_CONTAINER)) {
                const end = line.substring(l+1).indexOf(ELEMENT_CONTAINER) + l + 1;
                arrayLine.push(line.substring(l+1, end));
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
    while(content.length > 0) {
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

// Parse CSV content into Articles object
export const parseCSVtoJSON = csv => {
  if (csv == null) return null;
  if (Array.isArray(csv))
    csv = parseArrayV4ToCSV(csv)

  const lines = csv.split(NEWLINE)
  const columns = getArrayLine(lines.shift()) // first row is headers
  const rows = getRows(lines, columns.length);

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

  /*const get = (row) => {
    return row >= 0 && row < rows.length ?
    {
      name: rows[row][0],
      prices: rows[row].slice(1)
    } : null
  }*/

  return {
    columns,
    rows,
    getCell,
    //get
  };
}

/**
 * Parse a CSV file into a JSON
 * @param {String} csv CSV file
 * @returns 
 */
export default function useCSV(csv) {
    return parseCSVtoJSON(csv)
}
