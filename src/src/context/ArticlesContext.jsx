import { createContext, useEffect, useState } from "react";

export const ArticlesContext = createContext();

export function ArticlesContextProvider(props) {

    const [csv, setCSV] = useState()

    useEffect(() => {
        console.log(csv)
    }, [csv])

    return (<>
        <ArticlesContext.Provider
            value = {
                {
                    csv, setCSV
                }
            }
        >
            {props.children}
        </ArticlesContext.Provider>
    </>)
}