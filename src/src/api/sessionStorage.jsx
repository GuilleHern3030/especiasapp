export const haveSelections = () => {
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i)
        if (key != null && key.startsWith("ITEM:"))
            return true
    }
    return false
}

export const amountOfSelections = () => {
    let amount = 0;
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i)
        if (key != null && key.startsWith("ITEM:"))
            amount++
    }
    return amount
}

export const getSelections = () => { // keysSelected values
    const selected = []
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i)
        if (key != null && key.startsWith("ITEM:"))
            selected.push(sessionStorage.key(i).substring(5))
    }
    return selected
}