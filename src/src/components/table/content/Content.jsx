import { useLayoutEffect, useState } from "react";
import { columnwidth } from "../../../data/references.json"
import useTable from "../../../hooks/useTables";
import Loading from "../../loading/Loading"

import List from "./list/List"
import Rows from "./rows/Rows"

export default function ListManager() {

  const { table } = useTable()
  
  const isBigger = useIsTableBigger(table)
  
  return <>
    {
      table === null ?
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "1rem",
          fontSize: "1.1rem"
        }}>
          <p style={{textAlign:"center"}}>Esta tabla no está disponible en este momento</p>
          <p style={{textAlign:"center"}}>Disculpe las molestias</p>
        </div>
      : table === undefined ?
        <div>
          <Loading/>
        </div> 
      : isBigger ? 
        <List elements={table}/> 
      :
        <Rows table={table}/> 
    }
  </>
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