import { useLayoutEffect, useState, useContext, useEffect } from "react";
import { columnwidth } from "../../data/references.json"
import { ArticlesContext } from "../../context/ArticlesContext"

import List from "./list/List"
import Table from "./table/Table"

export default function ListManager() {
  const { elements } = useContext(ArticlesContext)

  const isBigger = useIsTableBigger(elements)
  
  return <div>
    {
      elements === null ?
        <div>
          <p>No hay datos</p>
        </div>
      : elements === undefined ?
        <div>
          <p>Cargando...</p>
        </div> 
      : isBigger ? 
        <List elements={elements}/> :
        <Table elements={elements}/> 
    }
  </div>
}


const useIsTableBigger = (elements) => {
  const [isBigger, setIsBigger] = useState(false);

  useLayoutEffect(() => {
    const check = () => {
      try {
        const columnWidth = elements.columns * columnwidth;
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
  }, [elements])

  return isBigger;
}