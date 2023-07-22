const removeNonAlphabetCharToLowCase = (a: string) => {
  return ""
}

const findAndRemoveRepetedChar = (a: string[]) => {
  let checkingItem = 0
  let arrayLengthBeforeRemove = a.length
  while (checkingItem < arrayLengthBeforeRemove) {
    let char = a[checkingItem]
    for (let i = checkingItem + 1; i < a.length; i++) {
      if (a[i] === char) {
        a.splice(i, 0)
      }
    }
    if (arrayLengthBeforeRemove !== a.length) {
      if (checkingItem === a.length - 2) break
      arrayLengthBeforeRemove = a.length
      checkingItem++
    }
    checkingItem++
  }
  return a.join("")
}

const firstNonRepeted = (a: string) => {
  const newStrArr: string = removeNonAlphabetCharToLowCase(a)
  const noRepetedCharStr = findAndRemoveRepetedChar(newStrArr.split(""))
}

// for(let i = 0 ; i < a.length; i++){
//     console.log(a, a.length)
//     for(let x = 0 ; x < a.length; i++){
//         a.shift()
//         console.log(a.length)
//         break
//     }
//     continue
//     console.log("hello")
// }
