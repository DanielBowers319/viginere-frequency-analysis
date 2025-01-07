import setMap from "./setMap"

function initializeNestedMaps(numberOfKeys) {
    const initialMap = new Map()

    for(let i = 1; i < numberOfKeys + 1; i++) {
      setMap(initialMap, i)
      for(let j = 1; j < i + 1; j++) {
        let tempMap = initialMap.get(i)
        setMap(tempMap, j)
      }
    }
    return initialMap

  }

  export default initializeNestedMaps