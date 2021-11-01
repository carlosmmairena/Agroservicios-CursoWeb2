import { IsDateString, IsNotEmpty, validate, ValidationError } from "class-validator";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { Usuario } from "./Usuario";


@Entity("Personas")
export class Persona {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    @IsNotEmpty()
    nombre: string;


    @Column()
    @IsNotEmpty()
    apellido1: string;


    @Column()
    @IsNotEmpty()
    apellido2: string;

  
    @Column()
    @IsDateString()
    @IsNotEmpty()
    fechaNac: Date;


    @OneToOne(() => Cliente, cliente => cliente.persona)
    cliente: Cliente;

    @OneToOne(() => Usuario, usuario => usuario.persona)
    usuario: Usuario;

    static async validate(personaToSave: Persona) : Promise<ValidationError[]> {

        const validateOptions = { validationError: { target:false, value:false} };
        const errors          = await validate(personaToSave, validateOptions);

        return errors;
    }

}
