import { errors, Id } from "@core/shared"

test('should create a valid id', () => {
    const id = Id.newId
    expect(id.value).toHaveLength(36)
    expect(id.new).toBeTruthy()
})

test('should throw an error with invalid id', () => {
    expect(() => new Id('1234')).toThrow(errors.INVALID_ID)
})

test('should create a new id with existing value', () => {
    const id = Id.newId
    const newId = new Id(id.value)
    expect(newId.value).toHaveLength(36)
    expect(newId.new).toBeFalsy()
})

test('should compare two equals ids', () => {
    const e1 = Id.newId
    const e2 = Id.newId
    expect(e1.equal(e2)).toBeFalsy()
    expect(e2.different(e1)).toBeTruthy()
})

test('should compare two equals ids', () => {
    const e1 = Id.newId
    const e2 = new Id(e1.value)
    expect(e1.equal(e2)).toBeTruthy()
    expect(e1.different(e2)).toBeFalsy()
})