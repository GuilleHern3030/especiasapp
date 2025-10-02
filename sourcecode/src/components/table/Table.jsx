import styles from "./Table.module.css"

export default function Table({children, csv}) {
    return <>
        { csv === undefined ?
            <div>
                <p>Cargando...</p>
            </div> 
        : csv === null ?
            <div>
                <p>No hay datos</p>
            </div>
        : <div>
            <p>{csv}</p>
        </div>
        }
    </>
}