import { useContext } from "react"
import { ArticlesContext } from "../../context/ArticlesContext"

import Table from '../../components/table/Table'


export default function Home() {

    const { csv } = useContext(ArticlesContext)

    return <>
        <Table csv={csv}/>
    </>

}