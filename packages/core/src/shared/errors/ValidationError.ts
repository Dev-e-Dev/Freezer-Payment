import { errors } from "@core/shared";

export interface ValidationErrorProps {
    message?: string
    code?: number
    value?: any
    extras?: object
}

export class ValidationError extends Error {
    readonly code: number
    readonly value: any
    readonly extras: any

    constructor(readonly props?: ValidationErrorProps) {
        super(props?.message ?? errors.UNKNOWN_ERROR)
        this.code = props?.code ?? 400
        this.value = props?.value
        this.extras = props?.extras ?? {}
    }

    static new(message?: string, value?: any, extras?: any): ValidationError {
        return new ValidationError({message, value, extras})
    }

    static throw(message?: string, value?: any, extras?: any): never {
        throw new ValidationError({message, value, extras})
    }
}