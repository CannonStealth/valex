/**
 * @param {string} text - Should be a string
 */

function caps(text: string) {
    if (typeof text != 'string') throw new Error('Param should be a string')
    return text.toLowerCase().replace(/_/g, ' ').replace(/\b[a-zA-Z]/g, m => m.toUpperCase())
}

export { caps }