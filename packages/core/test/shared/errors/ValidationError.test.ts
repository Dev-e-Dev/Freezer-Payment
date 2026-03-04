import { ValidationError, errors } from "@core/shared";

test('should throw a validation exception', () => {
    expect(() => ValidationError.throw('custom error message', 'invalid value')).toThrow('custom error message')
    expect(() => ValidationError.throw()).toThrow(errors.UNKNOWN_ERROR)
})

test('should create an error with message, code, value and extras', () => {
    const error = new ValidationError({
        message: 'short name',
        code: 400,
        value: 'John',
        extras: {min: 5}
    })

    expect(error.message).toBe('short name')
    expect(error.code).toBe(400)
    expect(error.value).toBe('John')
    expect(error.extras).toEqual({min: 5})
})

test('should create an error with no props', () => {
    const error = new ValidationError()
    expect(error.message).toBe(errors.UNKNOWN_ERROR)
    expect(error.code).toBe(400)
})