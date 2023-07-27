const removeNonAlphabetCharToLowCaseString = (str: string) => {
  const cleanedString = str.replace(/[^a-zA-Z]/g, "")
  const lowercaseString = cleanedString.toLowerCase()
  return lowercaseString
}

const findAndRemoveRepetedChar = (str: string) => {
  const charCount: Record<string, number> = {}
  const newStr: string[] = []
  for (let char of str) {
    charCount[char] = (charCount[char] || 0) + 1
  }
  for (let char of str) {
    if (charCount[char] === 1) {
      newStr.push(char)
    }
  }
  return newStr.join("")[0]
}

const firstNonRepeted = (str: string) => {
  const newStr: string = removeNonAlphabetCharToLowCaseString(str)
  return findAndRemoveRepetedChar(newStr)
}

console.log(firstNonRepeted("hello, hi"))
console.log(firstNonRepeted("aabcc"))
console.log(firstNonRepeted("aabbcc"))
