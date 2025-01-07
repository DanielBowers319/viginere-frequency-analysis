function calcShiftVal(letter) {
    if(letter === 'N/A') {
        return letter
    }
    let charVal = (((letter.charCodeAt(0) - 97) - 4) + 26) % 26
    return charVal
}

export default calcShiftVal