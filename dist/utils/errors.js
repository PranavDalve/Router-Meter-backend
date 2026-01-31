export class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConflictError";
    }
}
export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedError";
    }
}
