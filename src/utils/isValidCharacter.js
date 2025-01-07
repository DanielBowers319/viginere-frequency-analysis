function isValidCharacter(ourChar) {
    return /^[A-Za-z]$/.test(ourChar)
}

export default isValidCharacter