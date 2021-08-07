 function theTwistedStick (mode) {
 // Prepare text
 var plaintext = document.getElementById('textarea').value
 var spaceFiller = plaintext.replace(/\s/g, '`')
 // ^ This replace method is necessary for long texts

 var txt = spaceFiller.toUpperCase()
 var slicedText = txt.slice(0, txt.length)
 var ciphertext1 = slicedText.split('')

 var spaceReplacedText = txt.replace(/~/g, '')
 var ciphertext2 = spaceReplacedText.split('')
 var ciphertext2Length = ciphertext2.length

 // Get variables and remove non-digit characters in PIN.
 var pin = document.getElementById('pin').value
 var digitizedPin = pin.replace(/\D/g, '')
 var pinArray = digitizedPin.split('')
 var decimalChecked = pinArray.map(function (x) {return parseInt(x, 10)})
 var maxPinNumber = Math.max.apply(null, decimalChecked)

 // PIN counter
 var pinCounter = 0
 var ciphertextArray = []
 while (pinCounter < ciphertext2Length) {
 for (let i = 0; i < decimalChecked.length; i++) {
 var pinChunk = []
 pinCounter += decimalChecked[i]
 // Split into PIN chunks
 for (let j = 0; j < pin[i]; j++) {
 pinChunk += ciphertext2.shift()
 }
 ciphertextArray.push(pinChunk)
 }
 }
 // Get rid of excess
 var ciphertextArray1 = ciphertextArray.map(function (x) {return x.replace(/undefined/g, '')})
 var ciphertextArray2 = ciphertextArray1.filter(function (x) {return (x !== '')})
 var ciphertextArrayClone = ciphertextArray2.slice(0, ciphertextArray2.length)
 // Fill w/ 0s
 for (let i = 0; i < ciphertextArray2.length; i++) {
 while (ciphertextArray2[i].length < maxPinNumber) {
 ciphertextArray2[i] += '~'
 }
 }
 // Arrange
 var ciphertextArrayChunks = []
 for (let i = 0; i < ciphertextArray2.length; i++) {
 // Break up chunks
 ciphertextArrayChunks.push(ciphertextArray2[i].split(''))
 }
 var ciphertextArrayResult = []
 // Max array length is 9
 for (let i = 0; i < 9; i++) {
 // For each array
 for (let j = 0; j < ciphertextArrayChunks.length; j++) {
 // Access & move array items within another array
 var ciphertextArrayChunkSection = ciphertextArrayChunks[j]
 ciphertextArrayResult.push(ciphertextArrayChunkSection[i])
 }
 }
 var ciphertextString1 = ciphertextArrayResult.toString()
 var ciphertextResult = ciphertextString1.replace(/,/g, '')

 // Dearrange
 var plaintextArray = []
 plaintextArray.length = ciphertextArrayClone.length
 while (ciphertext1.length !== 0) {
 for (let i = 0; i < ciphertextArrayClone.length; i++) {
 var plaintextItem = ciphertext1.shift()
 plaintextArray[i] += plaintextItem
 }
 }
 var plaintextString = plaintextArray.toString()
 var plaintextString2 = plaintextString.replace(/,/g, '')
 var plaintextString3 = plaintextString2.replace(/~/g, '')
 var plaintextString4 = plaintextString3.replace(/undefined/g, '')
 var plaintextResult = plaintextString4.replace(/`/g, ' ')

 if (mode === 'encrypt') {
 document.getElementById('p').innerHTML = ciphertextResult
 } else if (mode === 'decrypt') {
 document.getElementById('p').innerHTML = plaintextResult
 }
}
