/**
 * Leerá un archivo CSV estructurado de la siguiente forma
 * 
 * "NOMBRE_COLUMNA_1" , "PRECIO_POR_100g", "PRECIO_POR_250g", ...
 * "NOMBRE_PRODUCTO_1", "     PRECIO    ", "     PRECIO    ", ...
 * "NOMBRE_PRODUCTO_2", "     PRECIO    ", "     PRECIO    ", ...
 * "NOMBRE_PRODUCTO_3", "     PRECIO    ", "     PRECIO    ", ...
 * 
 */

const SEPARATOR = ",";
const ELEMENT_CONTAINER = '"';
const NEWLINE = "\n";

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

export const readElements = (csv) => {
    console.log("Reading elements")
    
    const content = csv.split(NEWLINE);
    const headers = getArrayLine((content).shift());
    const columns = headers.length;
    const rows = getRows(content, columns);

    return {
        "headers": headers,
        "columns": columns,
        "elements": rows,
        "rows": rows.length
    }
    
}