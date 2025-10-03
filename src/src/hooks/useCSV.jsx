import { useContext, useEffect } from 'react'
import { ArticlesContext } from '../context/ArticlesContext'

async function getCSV(uri) {
  try {
    const csvURL = await fetch(uri)
      .then(res => res.json())
      .then(json => json.csv)
    const csv = await fetch(csvURL).then(res => res.text())
    console.log(csv)
    return csv;
  } catch (e) {
    console.error(e)
    return null
  }
}

export default function useCSV(uri) {
    const { processCSV } = useContext(ArticlesContext)

    // Get CSV data
    useEffect( () => {
        const fetchData = async () => {
            const result = await getCSV(uri)
            processCSV(result)
        }
        fetchData();
    }, []);
}
