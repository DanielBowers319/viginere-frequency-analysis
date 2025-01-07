import setData from "./setData";
import setMap from "./setMap";

function initializeNestedData(numberOfKeys) {
    const initialMap = new Map()

    for(let i = 1; i < numberOfKeys + 1; i++) {
      setMap(initialMap, i)
      for(let j = 1; j < i + 1; j++) {
        let tempMap = initialMap.get(i)
        setData(tempMap, j)
      }
    }
    return initialMap

}

export default initializeNestedData