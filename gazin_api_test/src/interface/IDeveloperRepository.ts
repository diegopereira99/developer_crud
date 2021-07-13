import { Developer } from "../entity/Developer";

export interface IDeveloperRepository {
    findAll (): Promise<Developer[]>,
    findById (id:string): Promise<Developer>,
    update (developer: Developer): Promise<Developer>,
    delete (id: String): Promise<void>,
    create (developer: Developer): Promise<Developer>
}
