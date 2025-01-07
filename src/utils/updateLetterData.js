
const updateLetterData = (props) => {
    props.setLetterData(prevData => {
    //   console.log('In updateLetterData:')
    //   console.log('props.letter: ', props.letter)
    //   console.log('props.outerKey: ', props.outerKey)
    //   console.log('props.innerKey: ', props.innerKey)
      const newData = new Map(prevData)
      let currCount
      const outerMap = newData.get(props.outerKey)
      const innerMap = outerMap.get(props.innerKey)
    //   if(props.innerKey == 1) {
    //     console.log('innerKey = 1')
    //   }
    // if(props.outerKey == 3) {
    //     console.log('adding to ', props.letter)
    // }
      if(innerMap.has(props.letter.toLowerCase())) {
        currCount = innerMap.get(props.letter.toLowerCase())
        innerMap.set(props.letter.toLowerCase(), currCount + 1)
      }
      else {
        innerMap.set(props.letter.toLowerCase(), 1)
      }
 
      return newData
    })
}

export default updateLetterData