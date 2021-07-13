import { Developer } from "../interfaces/Developer";
import axios from "../shared/custom_axios";

export const save = async (developer: Developer): Promise<Developer> => {
    const response = await axios.post("/developers", developer);
    const savedDeveloper = response.data;
    return savedDeveloper;
}
export const update = async (developer: Developer): Promise<Developer> => {
    const response = await axios.put(`/developers/${developer.id}`, developer);
    const updatedDeveloper = response.data;
    return updatedDeveloper;
}

export const remove = async (developer: Developer): Promise<void> => {
    await axios.delete(`/developers/${developer.id}`);
}

export const findAll = async (): Promise<Developer[]> => {
    const response = await axios.get("/developers");
    const developers = response.data;
    return developers;
}