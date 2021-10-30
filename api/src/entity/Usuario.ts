import { IsDateString, IsEmail, IsNotEmpty, MinDate, MinLength } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { genSaltSync, compareSync, hashSync } from 'bcryptjs';
import { Persona } from "./Persona";


@Entity("Usuarios")
export class Usuario {
 
    @PrimaryGeneratedColumn()
    id: number;


    @IsDateString()
    @MinDate(new Date())
    @Column({ type: 'date' })
    fechaRegistro: Date;


    @Column({ unique: true, nullable: false })
    @IsEmail()
    @IsNotEmpty()
    correo: string;


    @Column()
    @MinLength(6)
    @IsNotEmpty()
    password: string;


    @Column()
    @IsNotEmpty()
    estado: boolean;


    @OneToOne(() => Persona, persona => persona.usuario, { eager: true })
    @JoinColumn({  name: 'idPersona', referencedColumnName: 'id' })
    persona: Persona;


    hashPassword() : void {
        const salt    = genSaltSync(10);
        this.password = hashSync(this.password, salt);
    }


    checkPassword(password:string): boolean {
        return compareSync(password, this.password);

    }

}
