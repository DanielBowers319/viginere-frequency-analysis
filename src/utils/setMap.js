function setMap(mapPtr, idx) {
    const newMap = new Map()
    mapPtr.set(idx, newMap)
}

export default setMap