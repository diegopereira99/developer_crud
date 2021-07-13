import { DeveloperController } from './controller/DeveloperController';

export const Routes = [{
    method: "get",
    route: "/developers",
    controller: DeveloperController,
    action: "findAll"
}, {
    method: "get",
    route: "/developers/:id",
    controller: DeveloperController,
    action: "findOne"
}, {
    method: "post",
    route: "/developers",
    controller: DeveloperController,
    action: "create"
}, {
    method: "delete",
    route: "/developers/:id",
    controller: DeveloperController,
    action: "delete",
},
{
    method: "put",
    route: "/developers/:id",
    controller: DeveloperController,
    action: "update",
}];