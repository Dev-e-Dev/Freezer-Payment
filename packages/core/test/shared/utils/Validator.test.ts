import { ValidationError, Validator } from '@core/shared'

test('should return null with a non-null value', () => {
    const error = Validator.isNullOrUndefined('Lorem ipsum', 'invalid value')
    expect(error).toBe(null)
})

test('should return an error with a null value', () => {
    const error = Validator.isNullOrUndefined(null, 'invalid value')
    expect(error?.message).toBe('invalid value')
    expect(error?.code).toBe(400)
    expect(error?.value).toBe(null)
    expect(error?.extras).toEqual({})
})

test('should return an error with a undefined value', () => {
    const error = Validator.isNullOrUndefined(undefined, 'invalid value')
    expect(error?.message).toBe('invalid value')
    expect(error?.code).toBe(400)
    expect(error?.value).toBe(undefined)
    expect(error?.extras).toEqual({})
})

test('should return an error with a empty value', () => {
    const error = Validator.isEmpty('', 'empty value')
    expect(error?.message).toBe('empty value')
    expect(error?.code).toBe(400)
    expect(error?.value).toBe('')
    expect(error?.extras).toEqual({})
})

test('should return an error with null value', () => {
    const error = Validator.isEmpty(null, 'invalid value')
    expect(error?.message).toBe('invalid value')
    expect(error?.code).toBe(400)
    expect(error?.value).toBe(null)
    expect(error?.extras).toEqual({})
})

test('should return null with a non-empty value', () => {
    const error = Validator.isEmpty('lorem ipsum', 'empty value')
    expect(error).toBe(null)
})

test('should return an error with a value greather', () => {
    const error = Validator.lessThan([5, 4, 3 ,2 , 1], 3, 'value exceeded')
    expect(error?.message).toBe('value exceeded')
    expect(error?.code).toBe(400)
    expect(error?.value).toEqual([5, 4, 3 ,2 , 1])
    expect(error?.extras).toEqual({max: 3})
})

test('should return null with a value less', () => {
    const error = Validator.lessThan([5, 4], 3, 'value exceeded')
    expect(error).toBe(null)
})

test('should return an error with a value greather or equal', () => {
    const error = Validator.lessThanOrEqual([5, 4, 3 ,2 , 1], 3, 'value exceeded')
    expect(error?.message).toBe('value exceeded')
    expect(error?.code).toBe(400)
    expect(error?.value).toEqual([5, 4, 3 ,2 , 1])
    expect(error?.extras).toEqual({max: 3})
})

test('should return null with a value less or equal', () => {
    const error = Validator.lessThanOrEqual([5, 4, 3], 3, 'value exceeded')
    expect(error).toBe(null)
})

test('should return an error with a value less', () => {
    const error = Validator.greaterThan('test', 5, 'value short')
    expect(error?.message).toBe('value short')
    expect(error?.code).toBe(400)
    expect(error?.value).toEqual('test')
    expect(error?.extras).toEqual({min: 5})
})

test('should return null with a value greather', () => {
    const error = Validator.greaterThan('test', 3, 'value short')
    expect(error).toBe(null)
})

test('should return an error with a value less or equal', () => {
    const error = Validator.greaterThanOrEqual('test', 5, 'value short')
    expect(error?.message).toBe('value short')
    expect(error?.code).toBe(400)
    expect(error?.value).toEqual('test')
    expect(error?.extras).toEqual({min: 5})
})


test('should return null with a value less or equal', () => {
    const error = Validator.greaterThanOrEqual('test', 4, 'value short')
    expect(error).toBe(null)
})

test('should return an error with a value that does not match the regular expression', () => {
    const error = Validator.regex('test', /\d{11}/, 'value not matched')
    expect(error?.message).toBe('value not matched')
    expect(error?.code).toBe(400)
    expect(error?.value).toBe('test')
    expect(error?.extras).toEqual({})
})

test('should return null with a value match the regular expression', () => {
    const error = Validator.regex(12345, /\d{5}/, 'value not matched')
    expect(error).toBe(null)
})

test('should combine errors', () => {
    const errors = Validator.combineErrors(
        Validator.regex('test', /\d{11}/, 'value not matched'),
        Validator.isNullOrUndefined('Lorem ipsum', 'invalid value'),
        Validator.isEmpty('', 'empty value')
    )

    expect(errors).toHaveLength(2)
    expect(errors?.map(e => e.message).join(', ')).toBe('value not matched, empty value')
})

test('should combine null', () => {
    const errors = Validator.combineErrors(
        Validator.isNullOrUndefined('Lorem ipsum', 'invalid value'),
        Validator.isNullOrUndefined('Lorem ipsum', 'invalid value'),
    )

    expect(errors).toBe(null)
})