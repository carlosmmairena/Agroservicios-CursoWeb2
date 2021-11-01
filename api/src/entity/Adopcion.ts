import { IsBoolean, IsDateString, IsNotEmpty, MinDate } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Animal } from "./Animal";


@Entity("Adopciones")
export class Adopcion {
 
    @PrimaryGeneratedColumn()
    id: number;


    @IsBoolean()
    @Column({ default: true })
    vacunado: boolean;

    
    @IsDateString()
    @MinDate(new Date())
    @Column({ nullable: false })
    fechaAdopcion: Date;


    @IsNotEmpty()
    @Column({ type: 'text' })
    descripcion: string;


    @OneToOne(() => Animal, animal => animal.adopcion, { nullable: false, eager:true })
    @JoinColumn({ name: 'idAnimal', referencedColumnName:'id' })
    animal: Animal;

}
