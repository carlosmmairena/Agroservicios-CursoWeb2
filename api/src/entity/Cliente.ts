import { IsDate, IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Persona } from "./Persona";


@Entity()
@Unique(['correo'])
export class Cliente{

    //Atributos de una base de datos 
 
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    @IsEmail()
    //@IsNotEmpty()
    correo: string;

    

    @Column()
    @IsNotEmpty()
    estado: boolean;
   // static nombre: any;


   @OneToOne(type => Persona)
   @JoinColumn()
   persona: Persona;
}