import { useContext, useEffect } from 'react'
import { ArticlesContext } from '../context/ArticlesContext'
import { data_uri, basename } from '../data/references.json'

// Constants
const NEWLINE = "\n";
const ELEMENT_CONTAINER = '"';

// Error manager
const errManager = err => {
  console.error(err)
  return null;
}

// Gets the GoogleSheets link from /data/data.json
const getGoogleSheetsLink = async (uri) =>
  fetch(uri)
    .then(res => res.json())
    .then(json => json.googlesheets)
    .catch(err => errManager("Invalid Data.json uri?\n" + err))

// Gets the GoogleSheets information in CSV format
const getCSV = async (url) => {
  return url == null ? url : fetch(url)
    .then(res => res.text())
    .then(csv => csv.startsWith(ELEMENT_CONTAINER) ? csv : // checks csv format
      errManager("Invalid GoogleSheets link URL?\nDocument obtained doesn't have CSV format\n" + csv))
    .catch(err => errManager("Invalid GoogleSheets link URL?\n" + err))
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
const getArticlesFromCSV = csv => {
  const lines = csv.split(NEWLINE)
  const columns = getArrayLine(lines.shift()) // first row is headers
  const rows = getRows(lines, columns.length);

  const cellId = (row, column) => `${row}-${column}`;

  const getCell = (row, column) => {
    return row >= 0 && row < rows.length && column >= 0 && column < columns.length ?
    {
      name: rows[row][0],
      header: columns[column],
      price: column == 0 ? null : rows[row][column] == "" ? undefined : rows[row][column],
      cellId: cellId(row, column)
    } : null
  }


  const get = (row) => {
    return row >= 0 && row < rows.length ?
    {
      name: rows[row][0],
      prices: rows[row].slice(1)
    } : null
  }

  const selected = [];

  const select = (row, column) => {
    if (!selected.includes(cellId(row, column)))
      selected.push(cellId(row, column))
  }

  const unselect = (row, column) => {
    const index = selected.indexOf(cellId(row, column))
    if (index >= 0) selected.splice(index)
  }

  return {
    columns,
    rows,
    selected,
    getCell,
    get,
    select,
    unselect
  };
}

export default function useArticles() {
  const { setArticles } = useContext(ArticlesContext)
  useEffect( () => {

    const processData = async (href) => {
      console.clear();

      console.log("Getting GoogleSheets link from " + href)
      const googleLink = await getGoogleSheetsLink(href)
      console.log("Obtained: " + googleLink)

      console.log("Getting CSV from GoogleSheet link")
      const csv = await getCSV(googleLink)
      console.log("Obtained:\n" + csv)

      const articles = getArticlesFromCSV(csv);
      console.warn(articles)

      setArticles(articles)

    }

    processData(basename+data_uri);
  }, []);
}
