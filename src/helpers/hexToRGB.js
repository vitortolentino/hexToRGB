const hexToRGB = ( hex ) => {
  if(!hex) {
    throw new Error('parameter is required');
  }

  const isString = typeof hex === 'string';
  if(!isString) {
    throw new Error('parameter must be a string');
  }

  if(!isAValidHex(hex)) {
    throw new Error('parameter must be a hex with hash');
  }

  const hexWithoutHash = removeHashFromHex(hex);
  const splitted = hexToArray(hexWithoutHash);

  const RGBObject = parseHexToRGB(splitted);

  return RGBObject;
};

const isAValidHex = (text) => {
  const regex = new RegExp(/^#(?:[0-9a-fA-F]{6}){1,2}$/);
  return regex.test(text);
}

const removeHashFromHex = (hex) => {
  const isString = typeof hex === 'string';
  if(!isString) {
    throw new Error('parameter must be a string');
  }

  return hex.replace(/^#/, '');
}

const hexToArray = (hex) => {
  const isString = typeof hex === 'string';
  if(!isString) {
    throw new Error('parameter must be a string');
  }

  const splitted = [];
  for(let index = 0; index < hex.length; index += 2) {
    const char = hex[index];
    const nextChar = hex[index + 1];
    splitted.push(char + nextChar);
  }

  return splitted;
}

const parseHexToRGB = (hexAsArray) => {
  const isArray = Array.isArray(hexAsArray);
  if(!isArray) throw new Error('parameter must be a array');

  const mappedIndexes = {
    0: 'r',
    1: 'g',
    2: 'b',
  };

  return hexAsArray.reduce((rgbObject, actualValue, index) => {
    const actualKey = mappedIndexes[index];
    rgbObject[actualKey] = parseInt(actualValue, 16);

    return rgbObject;
  }, {})
};

module.exports = hexToRGB;

module.exports.removeHashFromHex = removeHashFromHex;

module.exports.hexToArray = hexToArray;

module.exports.parseHexToRGB = parseHexToRGB;