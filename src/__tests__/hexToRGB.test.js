const hexToRGB = require('../helpers/hexToRGB');
const { removeHashFromHex, hexToArray, parseHexToRGB } = require('../helpers/hexToRGB');

const mappedMockTypes = {
  string: 'this is a string',
  object: {},
  array: [],
  int: 1,
  float: 1.2,
  boolean: true,
  function: () => {},
}

const mockInvalidTypes = (acceptedType) => {
  const invalidTypes = Object
    .entries(mappedMockTypes)
    .filter(([type]) => type !== acceptedType);
  
  return invalidTypes;
}

describe('hexToRGB', () => {
  it('should be a function', () => {
    expect(typeof hexToRGB).toBe('function');
  });

  it('should throw an error if parameter is not provided', () => {
    expect(hexToRGB).toThrow('parameter is required');
  })

  it('should throw an error if parameter is not a string', () => {
    const invalidTypes = mockInvalidTypes('string');

    invalidTypes.forEach(([_, value]) => {
      expect(() => hexToRGB(value)).toThrow('parameter must be a string');  
    })
  })

  it('should throw an error if parameter is not a hex with hash', () => {
    expect(() => hexToRGB('#zzz')).toThrow('parameter must be a hex with hash');
    expect(() => hexToRGB('ffffff')).toThrow('parameter must be a hex with hash');
  })
})

describe('removeHashFromHex', () => {
  it('should be a function', () => {
    expect(typeof hexToRGB).toBe('function');
  }); 

  it('should return a hex withot hash', () => {
    expect(removeHashFromHex('#ffffff')).toBe('ffffff');
  })

  it('should throw an error if parameter is not a string', () => {
    const invalidTypes = mockInvalidTypes('string');

    invalidTypes.forEach(([_, value]) => {
      expect(() => removeHashFromHex(value)).toThrow('parameter must be a string');
    })
  })
})

describe('hexToArray', () => {
  it('should be a function', () => {
    expect(typeof hexToArray).toBe('function');
  });
  
  it('should return a array with three entries', () => {
    const expectedValue = ['fa', 'fe', 'fc'];
    expect(hexToArray('fafefc')).toEqual(expectedValue);
  })

  it('should throw an error if parameter is not a string', () => {
    const invalidTypes = mockInvalidTypes('string');

    invalidTypes.forEach(([_, value]) => {
      expect(() => hexToArray(value)).toThrow('parameter must be a string');
    })
  })
})

describe('parseHexToRGB', () => {
  it('should be a function', () => expect(typeof parseHexToRGB).toBe('function'))

  it('should return a object with rgb props', () => {
    expect(parseHexToRGB(['ff', 'ff', 'ff'])).toEqual({ r: 255, g: 255, b: 255 });
    expect(parseHexToRGB(['f2', 'ed', 'ba'])).toEqual({ r: 242, g:237, b: 186 });
    expect(parseHexToRGB(['1d', '1d', '17'])).toEqual({ r: 29, g: 29, b: 23 });
    expect(parseHexToRGB(['58', 'e2', '7c'])).toEqual({ r: 88, g: 226, b: 124 });
    expect(parseHexToRGB(['e2', '58', 'c1'])).toEqual({ r: 226, g: 88, b: 193 });
  })

  it('should throw an error if parameter is not a string', () => {
    const invalidTypes = mockInvalidTypes('array');

    invalidTypes.forEach(([_, value]) => {
      expect(() => parseHexToRGB(value)).toThrow('parameter must be a array');
    })
  })
})