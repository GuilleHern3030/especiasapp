import { basename } from '../data/references.json'
export default async function useContactLink() {
    fetch(`${basename}/data/data.json`)
    .then(res => res.json())
    .then(json => window.open(json.contactlink, "_blank"))
}