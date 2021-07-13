import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/HttpException";
import { IDeveloperRepository } from "../interface/IDeveloperRepository";
import developerValidator from "../validators/developer_validator";

export class DeveloperController {

    constructor(private developerRepository: IDeveloperRepository) { }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const developers = await this.developerRepository.findAll() || [];
            return res.send(developers);
        } catch (error) {
            return next(new HttpException());
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const developer = await this.developerRepository.findById(req.params.id);
            if (!developer) {
                return next(new HttpException(404, 'Desenvolvedor não encontrado'));
            }
            res.send(developer);
        } catch (error) {
            return next(new HttpException());
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const validateMessage = developerValidator(req.body);
            if (validateMessage != null) {
                return next(new HttpException(400, validateMessage));
            }
            const developer = await this.developerRepository.create(req.body);
            return res.status(201).send(developer);
        } catch (error) {
            return next(new HttpException());
        }

    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name, age, sex, hobby, birthDate } = req.body;
            const validateMessage = developerValidator(req.body);
            if (validateMessage != null) {
                return next(new HttpException(400, validateMessage));
            }

            const developer = await this.developerRepository.findById(id);
            
            if (!developer) {
                return next(new HttpException(400, 'Desenvolvedor não encontrado'));
            }
            developer.name = name;
            developer.age = age;
            developer.sex = sex;
            developer.hobby = hobby;
            developer.birthDate = birthDate;
            const updatedDeveloper = await this.developerRepository.update(developer);
            return res.status(200).send(updatedDeveloper);

        } catch (error) {
            next(new HttpException());
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const dev = await this.developerRepository.findById(id);
            if (!dev) {
                return next(new HttpException(400, 'Desenvolvedor não encontrado'));
            }

            await this.developerRepository.delete(id);
            return res.status(204).send();
        } catch (error) {
            console.log('aqui deu erro');
            return next(new HttpException());
        }
    }

}