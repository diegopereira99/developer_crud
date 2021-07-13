class HttpException extends Error {
    status: number;
    message: string;
    constructor(status?: number, message?: string) {
        super(message || 'Erro inesperado');
        this.status = status || 500;
        this.message = message || 'Erro inesperado';
    }
}

export default HttpException;