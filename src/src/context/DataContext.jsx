import { createContext, useState, useEffect } from "react";
import { data_uri, basename } from '../data/references.json'
const LINKS_URI = basename+data_uri

export const DataContext = createContext();

/**
 * Carga data.json el cual contiene datos del dueño del website
 * {
 *      contactLink: link al whatsapp del local
 *      contactNumber: número escrito del local
 *      email: email del local
 *      instagram: link del instagram del local
 *      address: dirección escrita de la ubicación del local
 *      googlemaps: link a la ubicación del local en google maps
 * } 
 */
export function DataContextProvider(props) {

    const [ data, setData ] = useState()

    useEffect( () => {
      fetch(LINKS_URI)
        .then(res => res.json())
        .then(json => setData(json))
        .catch(err => setData(null))
    }, []);

    return (<>
        <DataContext.Provider value = {{ data }}>
            {props.children}
        </DataContext.Provider>
    </>)
}
