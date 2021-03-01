/**
 * Function by Clefory
 * @param {string} text Got to be a string
 * @param {number} number Number limit
 */
function resume(text: string ,number: number){
    let str = ''
    if(text.length > number) {
        str += text.substring(0,number)
        str+='...'
        return str
    } else {
    str += text
    return str
    }
  }

export default resume