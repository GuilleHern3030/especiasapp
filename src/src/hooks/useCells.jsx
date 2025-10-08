import { useEffect, useState } from "react";
import fetchTable from "../api/dataBase";
import useTables from "./useTables";
import { useParams, getParamRoute, getParamCell } from "./useSelection";
import { getSelections } from "../api/sessionStorage";


export default function useCells() {

    const [ items, setItems ] = useState()
    const { tables, getLinkTo } = useTables()
    const params = useParams()

    useEffect(() => {

        const fetching = async() => {
            if (tables != undefined) {

                const array = params.length > 0 ? params : getSelections()

                if (array.length > 0) {
                    const items = []

                    for (let i = 0; i < array.length; i++) {
                        const param = array[i]
                        const route = getParamRoute(param)
                        const cellID = getParamCell(param)
                        const link = getLinkTo(route)
                        const item = await fetchTable(link).then(table => table.getCell(cellID[0], cellID[1]))
                        items.push(item)
                    }

                    setItems({
                        params,
                        items,
                        keys: array
                    })
                }

            }
        }

        fetching(items)

    }, [tables])

    return items

}