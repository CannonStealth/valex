import { evaluate } from "mathjs";

/**
 * 
 * @param {string} text Got to be a string
 *
 *  Valid Formats: d, h, m, s, 
 */

const format = (text: string) => {

    if(typeof text !== 'string') throw new Error (`Invalid Type! Should be a string. Received ${typeof text}.`)

        let cd = '( ' + text.replace('m', ' * 60 + ').replace('h', ' * 60 * 60 + ').replace('d', ' * 24 * 60 * 60 + ').replace('s',' + 0 + ') + '0 ) * 1000'

        cd = evaluate(cd)

        return cd
}

export default format
