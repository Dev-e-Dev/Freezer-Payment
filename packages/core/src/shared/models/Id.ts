import { v4 as uuid, validate } from 'uuid';
import { ValidationError } from '../errors';
import { errors } from '../constants';

export default class Id {
    readonly value: string
    readonly new: boolean

    constructor(value?: string) {
        this.value = value ?? uuid()
        this.new = !value

        if(!validate(this.value)) {
            ValidationError.throw(errors.INVALID_ID, this.value)
        }
    }

    static get newId(): Id {
        return new Id()
    }

    equal(otherId: Id): boolean {
        return this.value === otherId.value
    }

    different(otherId: Id): boolean {
        return this.value !== otherId.value
    }
}