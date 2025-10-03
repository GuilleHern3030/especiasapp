import { createContext, useState } from "react";
import { readElements } from "../scripts/csv-reader";

export const ArticlesContext = createContext();

export function ArticlesContextProvider(props) {

    const [elements, setElements] = useState()
    const [articles, setArticles] = useState()

    const processCSV = (csv) => {
        const elements = readElements(csv);
        console.log(elements)
        setElements(elements)
    }

    return (<>
        <ArticlesContext.Provider
            value = {
                {
                    elements, processCSV, setArticles
                }
            }
        >
            {props.children}
        </ArticlesContext.Provider>
    </>)
}