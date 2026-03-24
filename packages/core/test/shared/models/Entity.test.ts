import { Entity, EntityProps, Id } from "@core/shared"

interface EntityTestProps extends EntityProps {
    name?: string
    age?: number
}

class EntityTest extends Entity<EntityTest, EntityTestProps> {
    readonly name: string
    readonly age: number

    constructor(props: EntityTestProps) {
        super(props)
        this.name = props.name ?? ''
        this.age = props.age ?? 0
    }
}

test('should compare two different entitys', () => {
    const e1 = new EntityTest({name: 'Jhon', age: 25})
    const e2 = new EntityTest({name: 'Carlos', age: 30})

    expect(e1.different(e2)).toBeTruthy()
    expect(e1.equal(e2)).toBeFalsy()
})


test('should compare two different entitys with the same id and different attributes', () => {
    const id = Id.newId.value
    const e1 = new EntityTest({id, name: 'Jhon', age: 25})
    const e2 = new EntityTest({id, name: 'Carlos', age: 30})

    expect(e1.different(e2)).toBeFalsy()
    expect(e1.equal(e2)).toBeTruthy()
})

test('should compare with undefined and null', () => {
    const e1 = new EntityTest({name: 'Jhon', age: 25})
    expect(e1.equal(undefined as any)).toBeFalsy()
    expect(e1.equal(null as any)).toBeFalsy()
    expect(e1.different(undefined as any)).toBeTruthy()
    expect(e1.different(null as any)).toBeTruthy()
})

test('shoud clone one entity with different ids', () => {
    const e1 = new EntityTest({name: 'Jhon', age: 25})
    const e2 = e1.clone({id: Id.newId.value})
    expect(e1.equal(e2)).toBeFalsy()
    expect(e1.different(e2)).toBeTruthy()
    expect(e2.different(e1)).toBeTruthy()
    expect(e2.equal(e1)).toBeFalsy()
})