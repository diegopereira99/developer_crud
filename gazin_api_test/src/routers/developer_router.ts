import {Router} from "express";
import { DeveloperController } from "../controller/DeveloperController";
import { DeveloperRepositoryImplementation } from "../repositories/developer_repository";



export default () => {
    const router = Router();
    const controller = new DeveloperController(
        new DeveloperRepositoryImplementation()
    );
    
    router.get("/", controller.findAll.bind(controller));
    router.get("/:id", controller.findById.bind(controller));
    router.post("/", controller.create.bind(controller));
    router.put("/:id", controller.update.bind(controller));
    router.delete("/:id", controller.delete.bind(controller));

    return router;
}

