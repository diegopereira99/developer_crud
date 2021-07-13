import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Developer {

    constructor(name: string, sex: string, age: number, hobby: string, birthDate: string, id?: string) {
        this.id = id;
        this.name = name;
        this.sex = sex;
        this.age = age;
        this.hobby = hobby;
        this.birthDate = birthDate;
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    sex: string;

    @Column()
    age: number;

    @Column()
    hobby: string;

    @Column({ type: "date" })
    birthDate: string;
}