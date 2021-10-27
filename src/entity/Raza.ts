import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Animal } from "./Animal";


@Entity("Razas")
export class Raza {
 
    @PrimaryGeneratedColumn()
    idRaza: number;


    @Column()
    @IsNotEmpty()
    nombre: string;


    @Column()
    @IsNotEmpty()
    estado: boolean;


    @OneToMany(type => Animal, animal => animal.raza)
    @JoinColumn()
    animal: Animal[];

}
