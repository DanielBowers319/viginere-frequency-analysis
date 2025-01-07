function letterToShift(letter) {
    let charVal = letter.charCodeAt(0)
    //console.log('charVal: ', charVal)
    charVal = ((charVal - 97 - 5 + 27) % 26) + 97 //its +27 instead of +26 because a = 0
    //console.log('charValpost: ', charVal)
    return String.fromCharCode(charVal)
}

export default letterToShift