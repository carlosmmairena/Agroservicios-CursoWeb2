import { IsBoolean, IsNotEmpty, IsNumber, MaxLength, Min } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Raza } from "./Raza";
import { Adopcion } from "./Adopcion";


@Entity("Animales")
export class Animal {
 
    @PrimaryGeneratedColumn()
    id: number;
 

    @MaxLength(20)
    @IsNotEmpty()
    @Column({ nullable: false })
    tipo: string;


    @MaxLength(50)
    @IsNotEmpty()
    @Column()
    color: string;


    @IsNumber()
    @Min(0)
    @Column({  nullable: false })
    peso: number;

    @IsNotEmpty()
    @Column({ type: 'text' })
    raza: string;

    @IsNotEmpty()
    @Column({ type: 'text' })
    Descripcion: string;


    @IsBoolean()
    @Column({ default: true })
    estado: boolean;  




   @OneToOne(() => Adopcion, adopcion => adopcion.animal)
   adopcion: Adopcion;

}
