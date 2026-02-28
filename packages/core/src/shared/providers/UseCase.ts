export interface UseCase<input, exit> {
    execute(input: input, ...args: any): Promise<exit>
}