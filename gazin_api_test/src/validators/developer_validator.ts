import { Developer } from "../entity/Developer";

function developerValidator(developer: Developer): string {
    let fields: Array<String> = [];
    
    if (!developer.age) {
        fields.push('age');
    }
    if (!developer.birthDate) {
        fields.push('birth date');
    }
    if (!developer.hobby) {
        fields.push('hobby');
    }
    if (!developer.name) {
        fields.push('name');
    }
    if (!developer.sex) {
        fields.push('sex');
    }

    if (fields.length > 0) {
        return `Informe os campos (${fields.join(', ')}) para criar ou alterar um desenvolvedor`
    }

    return null;
}


export default developerValidator;