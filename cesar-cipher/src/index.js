const ALPHABET = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ ";

/**
 *
 * @param {String} text
 * @param {Number} offset
 * @returns {String}
 */
export function decode(text, offset) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const letterIndex = ALPHABET.indexOf(text[i]);
    if (letterIndex === -1) throw new Error("Message does not fit alphabet");
    const index = (letterIndex - offset) % ALPHABET.length;
    result += ALPHABET[index < 0 ? ALPHABET.length + index : index];
  }
  return result;
}

/**
 *
 * @param {String} text
 * @param {Number} offset
 * @returns {String}
 */
export function encode(text, offset) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const letterIndex = ALPHABET.indexOf(text[i]);
    if (letterIndex === -1) throw new Error("Message does not fit alphabet");
    result += ALPHABET[(letterIndex + offset) % ALPHABET.length];
  }
  return result;
}
