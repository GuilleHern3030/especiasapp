import { useEffect, useLayoutEffect, useState } from "react";
import { columnwidth } from "../../../data/references.json"
import useTable from "../../../hooks/useTables";

import List from "./list/List"
import Rows from "./rows/Rows"

export default function ListManager() {

  const { table } = useTable()

  
  const isBigger = useIsTableBigger(table)
  
  return <div>
    {
      table === null ?
        <div>
          <p>No hay datos</p>
        </div>
      : table === undefined ?
        <div>
          <p>Cargando...</p>
        </div> 
      : isBigger ? 
        <List elements={table}/> :
        <Rows elements={table}/> 
    }
  </div>
}


const useIsTableBigger = table => {
  const [isBigger, setIsBigger] = useState(false);

  useLayoutEffect(() => {
    const check = () => {
      try {
        const columnWidth = table.columns.length * columnwidth;
        const screenWidth = window.innerWidth;
        const isBigger = columnWidth > screenWidth;
        //console.log(columnWidth + " < " + screenWidth)
        setIsBigger(isBigger);
      } catch(exception) { }
    }

    check(); // primera comprobación
    window.addEventListener("resize", check);

    window.addEventListener("load", check);

    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("load", check);
    };
  }, [table])

  return isBigger;
}