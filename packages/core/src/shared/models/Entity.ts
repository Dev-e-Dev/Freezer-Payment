import Id from "./Id";

interface EntityProps {
    id?: string
}

export default abstract class Entity<EntityType, Props extends EntityProps> {

    readonly id: Id
    readonly props: Props

    constructor(props: Props) {
        this.id = new Id(props.id)
        this.props = {...props, id: this.id.value}
    }

    equal(entity: Entity<EntityType, Props>): boolean {
        return this.id.equal(entity?.id)
    }

    different(entity: Entity<EntityType, Props>): boolean {
        return this.id.different(entity?.id)
    }

    clone(newProps: Props): EntityType {
        return new (this.constructor as any)({...this.props, newProps})
    }

}