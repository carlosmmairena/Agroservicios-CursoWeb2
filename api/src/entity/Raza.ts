import { IsBoolean, IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Animal } from "./Animal";


@Entity("Razas")
export class Raza {

    @PrimaryGeneratedColumn()
    id: number;


    @MaxLength(50)
    @IsNotEmpty()
    @Column({ unique: true })
    nombre: string;


    @IsBoolean()
    @Column({ default: true })
    estado: boolean;


    @OneToMany(() => Animal, animal => animal.raza)
    animales: Animal[];

}
