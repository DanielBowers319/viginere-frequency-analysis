

function letterShift(letter, shiftAmt) {

    let charVal = letter.charCodeAt(0)

    switch(true) {
        case charVal <= 122 && charVal >= 97:
            charVal = (charVal - 97 + shiftAmt) % 26 + 97
            return(String.fromCharCode(charVal))
            //lowercase block
        case charVal <= 90 && charVal >= 65:
            //uppercase block
            charVal = (charVal - 65 + shiftAmt) % 26 + 65
            return(String.fromCharCode(charVal))
        default:
            console.log('Outside of letterShift Scope')
            return 0;
    }

}

function letterToNum (letter) {

    let charVal = letter.charCodeAt(0)

    switch(true) {
        case charVal <= 122 && charVal >= 97:
            //lowercase block
            return(charVal - 97)
        case charVal <= 90 && charVal >= 65:
            //uppercase block
            return(charVal - 65)
        default:
            console.log('Outside of letterShift Scope')
            return -1;
    }

}

function isValidCharacter(ourChar) {
    return /^[A-Za-z]$/.test(ourChar)
}

function keyIndCheck(key, idx) {
    if(key.length == idx) {
        return true
    }
    else {
        return false
    }
}

function viginereCipher(ourString, key) {
    let ourLetter
    let result = ''
    let keyInd = 0
    for(let i = 0; i < ourString.length; i++) {
        ourLetter = ourString[i]
        if(isValidCharacter(ourLetter)) {
            result += letterShift(ourLetter, letterToNum(key[keyInd]))
            keyInd++
            if(keyIndCheck(key, keyInd)) {
                keyInd = 0
            }
        }
        else {
            result += ourLetter
        }
    }

    return result

}

export default viginereCipher
