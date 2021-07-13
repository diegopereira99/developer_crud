import { DeveloperController } from "../../controller/DeveloperController";
import { Developer } from "../../entity/Developer";
import { getMockReq, getMockRes } from '@jest-mock/express';
import { NextFunction, Request, Response } from "express";
import { IDeveloperRepository } from "../../interface/IDeveloperRepository";


let mockedRepository: jest.Mocked<IDeveloperRepository>;
let req: Request;
let res: Response;
let next: NextFunction;

beforeEach(() => {
    jest.clearAllMocks();
    req = getMockReq();
    res = getMockRes().res;
    next = getMockRes().next;
    mockedRepository = {
        create: jest.fn(),
        delete: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        update: jest.fn()
    };
});


describe('Testando DeveloperController.update', () => {
    test('Deve retornar um erro 400 caso passe um id de desenvolvedor inválido', async () => {
        req.params = {
            "id": "123-456-123"
        };
        req.body = {
            "name": "Diego",
            "age": 12,
            "sex": "male",
            "hobby": "play games",
            "birthDate": "09-09-1999"
        }
        mockedRepository.findById.mockResolvedValueOnce(undefined);
        const controller = new DeveloperController(mockedRepository);
        await controller.update(req, res, next);
        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({
                "status": 400,
                "message": "Desenvolvedor não encontrado"
            }),
        );
    });
    test('Deve validar o body da requisição e retornar a exceção correta quando não enviar o parâmetro obrigatório', async () => {

        const controller = new DeveloperController(mockedRepository);
        req.params = {
            "id": "123-456-123"
        };
        req.body = {
            "age": 12,
            "sex": "male",
            "hobby": "play games",
            "birthDate": "09-09-1999"
        };
        const { res, next } = getMockRes();

        await controller.create(req, res, next);
        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({
                "status": 400,
                "message": "Informe os campos (name) para criar ou alterar um desenvolvedor"
            }),
        );

        req.body = { "name": "Diego", "sex": "Female", "hobby": "Play football", "birthDate": "2001-07-11" };
        await controller.create(req, res, next);
        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({
                "status": 400,
                "message": "Informe os campos (age) para criar ou alterar um desenvolvedor"
            }),
        );

        req.body = { "name": "Diego", "age": 12, "hobby": "Play football", "birthDate": "2001-07-11" };
        await controller.create(req, res, next);
        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({
                "status": 400,
                "message": "Informe os campos (sex) para criar ou alterar um desenvolvedor"
            }),
        );

        req.body = { "name": "Diego", "age": 12, "sex": "Female", "birthDate": "2001-07-11" };
        await controller.create(req, res, next);
        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({
                "status": 400,
                "message": "Informe os campos (hobby) para criar ou alterar um desenvolvedor"
            }),
        );

        req.body = { "name": "Diego", "age": 12, "sex": "Female", "hobby": "Play football" };
        await controller.create(req, res, next);
        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({
                "status": 400,
                "message": "Informe os campos (birth date) para criar ou alterar um desenvolvedor"
            }),
        );
    });

    test('Deve retornar um 200 e o desenvolvedor alterado', async () => {

        req.params = {
            "id": "123-456-123"
        };
        req.body = {
            "name": "Diego",
            "age": 12,
            "sex": "male",
            "hobby": "play games",
            "birthDate": "09-09-1999",
        };
        mockedRepository.findById.mockResolvedValueOnce(new Developer("Diego", "male", 24, "play fotball", "2001-02-02", "123-456-123"));
        mockedRepository.update.mockResolvedValueOnce(new Developer("Diego", "male", 12, "play games", "09-09-1999", "123-456-123"));
        
        const controller = new DeveloperController(mockedRepository);
        await controller.update(req, res, next);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                "name": "Diego",
                "age": 12,
                "sex": "male",
                "hobby": "play games",
                "birthDate": "09-09-1999",
                "id": "123-456-123"
            })
        );
        expect(res.status).toHaveBeenCalledWith(200)
    });
});

describe('Testando DeveloperController.delete', () => {
    test('Deve retornar um erro 400 caso passe um id de desenvolvedor inválido', async () => {
        mockedRepository.findById.mockResolvedValueOnce(undefined);
        const controller = new DeveloperController(mockedRepository);
        await controller.delete(req, res, next);
        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({
                "status": 400,
                "message": "Desenvolvedor não encontrado"
            }),
        );
    });

    test('Deve retornar um 204 (no content) quando deletar um desenvolvedor', async () => {
        req.params = {
            "id": "123-456-929"
        };
        mockedRepository.findById.mockResolvedValueOnce({} as Developer);
        const controller = new DeveloperController(mockedRepository);
        await controller.delete(req, res, next);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalledWith();
    });
});



describe('Testando DeveloperController.findAll', () => {
    test('Deve retornar todos os desenvolvedores cadastrados', async () => {
        mockedRepository.findAll.mockResolvedValueOnce([new Developer('Diego', 'male', 12, 'play games', '09-09-1999', '123-456-769'),
        new Developer('Maria', 'female', 21, 'play fotball', '09-09-1999', '999-111-333')]);
        const controller = new DeveloperController(mockedRepository);
        await controller.findAll(req, res, next);
        expect(res.send).toHaveBeenCalledWith([
            {
                "name": "Diego",
                "sex": "male",
                "age": 12,
                "hobby": "play games",
                "birthDate": "09-09-1999",
                "id": "123-456-769"
            },
            {
                "name": "Maria",
                "sex": "female",
                "age": 21,
                "hobby": "play fotball",
                "birthDate": "09-09-1999",
                "id": "999-111-333"
            },
        ])

    });

    test('Deve retornar um array vazio caso não tenha nenhum desenvolvedor cadastrado', async () => {
        mockedRepository.findAll.mockResolvedValueOnce([]);
        const controller = new DeveloperController(mockedRepository);
        await controller.findAll(req, res, next);
        expect(res.send).toHaveBeenCalledWith([]);
    });
});

describe('Testando DeveloperController.findById', () => {
    test('Deve retornar um unico desenvolvedor', async () => {
        mockedRepository.findById.mockResolvedValueOnce(new Developer('Diego', 'male', 12, 'play games', '09-09-1999', '123-456-769'));
        const controller = new DeveloperController(mockedRepository);
        await controller.findById(req, res, next);
        expect(res.send).toHaveBeenCalledWith({
            "name": "Diego",
            "sex": "male",
            "age": 12,
            "hobby": "play games",
            "birthDate": "09-09-1999",
            "id": "123-456-769"
        });
    });

    test('Deve retornar um 404 e uma mensagem de erro caso não encontre o desenvolvedor especifico', async () => {
        mockedRepository.findById.mockResolvedValueOnce(undefined);
        const controller = new DeveloperController(mockedRepository);
        await controller.findById(req, res, next);
        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({
                "status": 404,
                "message": "Desenvolvedor não encontrado"
            }),
        );
    });
});

describe('Testando DeveloperController.create', () => {
    test('Deve validar o body da requisição e retornar a exceção correta quando não enviar o parâmetro obrigatório', async () => {

        const controller = new DeveloperController(mockedRepository);

        req.body = { "age": 12, "sex": "Female", "hobby": "Play football", "birthDate": "2001-07-11" };
        await controller.create(req, res, next);
        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({
                "status": 400,
                "message": "Informe os campos (name) para criar ou alterar um desenvolvedor"
            }),
        );

        req.body = { "name": "Diego", "sex": "Female", "hobby": "Play football", "birthDate": "2001-07-11" };
        await controller.create(req, res, next);
        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({
                "status": 400,
                "message": "Informe os campos (age) para criar ou alterar um desenvolvedor"
            }),
        );

        req.body = { "name": "Diego", "age": 12, "hobby": "Play football", "birthDate": "2001-07-11" };
        await controller.create(req, res, next);
        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({
                "status": 400,
                "message": "Informe os campos (sex) para criar ou alterar um desenvolvedor"
            }),
        );

        req.body = { "name": "Diego", "age": 12, "sex": "Female", "birthDate": "2001-07-11" };
        await controller.create(req, res, next);
        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({
                "status": 400,
                "message": "Informe os campos (hobby) para criar ou alterar um desenvolvedor"
            }),
        );

        req.body = { "name": "Diego", "age": 12, "sex": "Female", "hobby": "Play football" };
        await controller.create(req, res, next);
        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({
                "status": 400,
                "message": "Informe os campos (birth date) para criar ou alterar um desenvolvedor"
            }),
        );
    });

    test('Deve retornar um desenvolvedor criado', async () => {
        mockedRepository.create.mockResolvedValueOnce(new Developer('Diego', 'male', 12, 'play games', '09-09-1999', '123-456-769'));
        req.body = {
            "name": "Diego",
            "age": 12,
            "sex": "male",
            "hobby": "play games",
            "birthDate": "09-09-1999"
        };
        const controller = new DeveloperController(mockedRepository);
        await controller.create(req, res, next);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                "name": "Diego",
                "age": 12,
                "sex": "male",
                "hobby": "play games",
                "birthDate": "09-09-1999",
                "id": "123-456-769"
            }),
        );

    });

    test('Deve retornar uma expection de erro inesperado', async () => {
        mockedRepository.create.mockRejectedValueOnce(new Error());
        req.body = {
            "name": "Diego",
            "age": 12,
            "sex": "male",
            "hobby": "play games",
            "birthDate": "09-09-1999"
        };
        const controller = new DeveloperController(mockedRepository);
        await controller.create(req, res, next);
        expect(next).toHaveBeenCalledWith(
            expect.objectContaining({
                "status": 500,
                "message": "Erro inesperado"
            }),
        );
    });
});