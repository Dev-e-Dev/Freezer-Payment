import { ValidationError } from "../errors";

export default class Validator {

    static combineErrors(...errors: (ValidationError | null)[]): ValidationError[] | null {
        const filteredErrors = errors.filter(err => err !== null) as ValidationError[]
        return filteredErrors.length > 0 ? filteredErrors : null
    }

    static isNullOrUndefined(value: any, error: string): ValidationError | null {
        return value === null || value === undefined ? ValidationError.new(error, value) : null 
    }

    static isEmpty(value: string | null | undefined, error: string): ValidationError | null {
        if(Validator.isNullOrUndefined(value, error)) return ValidationError.new(error, value)
        return value!.trim() === '' ? ValidationError.new(error, value) : null
    }

    static lessThan(value: string | any[], maximumSize: number, error: string): ValidationError | null {
        return value.length < maximumSize ? null : ValidationError.new(error, value, {max: maximumSize})
    }

    static lessThanOrEqual(value: string | any[], maximumSize: number, error: string): ValidationError | null {
        return value.length <= maximumSize ? null : ValidationError.new(error, value, {max: maximumSize})
    }

    static greaterThan(value: string | any[], minimumSize: number, error: string): ValidationError | null {
        return value.length > minimumSize ? null : ValidationError.new(error, value, {min: minimumSize})
    }

    static greaterThanOrEqual(value: string | any[], minimumSize: number, error: string): ValidationError | null {
        return value.length >= minimumSize ? null : ValidationError.new(error, value, {min: minimumSize})
    }

    static regex(value: string, regex: RegExp, error: string): ValidationError | null {
        return regex.test(value) ? null : ValidationError.new(error, value)
    }
}