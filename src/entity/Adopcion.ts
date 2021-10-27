import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Animal } from "./Animal";


@Entity("Adopciones")
export class Adopcion {
 
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    idAnimal: number;


    @Column()
    @IsNotEmpty()
    vacunas: boolean;

    
    @Column()
    @IsNotEmpty()
    fechaAdopcion: Date;


    @Column()
    @IsNotEmpty()
    descripcion: string;


    @Column()
    @IsNotEmpty()
    estado: boolean;


    @OneToOne(type => Animal, animal => animal, { nullable: false, eager:true })
    @JoinColumn({name: 'idAnimal', referencedColumnName:'id'})
    animal: Animal;  

}
