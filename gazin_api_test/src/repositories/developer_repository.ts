import { getConnection  } from "typeorm";
import { Developer } from "../entity/Developer"
import { IDeveloperRepository } from "../interface/IDeveloperRepository";

export class DeveloperRepositoryImplementation implements IDeveloperRepository {

    private repository = getConnection().getRepository(Developer);

    findAll(): Promise<Developer[]> {
        return this.repository.find();
    }

    findById(id: string): Promise<Developer> {
        return this.repository.findOne({ id });
    }
    create(developer: Developer): Promise<Developer> {
        return this.repository.save(developer);
    }

    update(developer: Developer): Promise<Developer> {
        return this.repository.save(developer);
    }

    delete(id: String):Promise<void> {
        return this.repository.query("delete from developer where id = ?", [id]);
    }


}