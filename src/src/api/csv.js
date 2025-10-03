export default async function getCSV(uri) {
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