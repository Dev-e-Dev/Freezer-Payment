import { errors } from "../constants";

export interface ValidationErrorProps {
    code?: string
    value?: any
    extras?: object
}

export class ValidationError extends Error {
    readonly code: string
    readonly value: any
    readonly extras: any

    constructor(readonly props?: ValidationErrorProps) {
        super(props?.code ?? errors.INVALID_ID)
        this.code = props?.code ?? errors.INVALID_ID
        this.value = props?.value
        this.extras = props?.extras ?? {}
    }

    static new(code?: string, value?: any, extras?: any): ValidationError {
        return new ValidationError({code, value, extras})
    }

    static throw(code?: string, value?: any, extras?: any): never {
        throw new ValidationError({code, value, extras})
    }
}