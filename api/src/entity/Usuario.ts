import { IsDate, IsEmail, IsNotEmpty, MinLength, validate, ValidationError } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { genSaltSync, compareSync, hashSync } from 'bcryptjs';
import { Persona } from "./Persona";
import { Consejo } from "./Consejo";
import { Proforma } from "./Proforma";


@Entity("Usuarios")
export class Usuario {
 
    @PrimaryGeneratedColumn()
    id: number;


    @IsDate()
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


    @OneToMany(() => Consejo, consejo => consejo.usuario)
    consejos: Consejo[];


    @OneToMany(() => Proforma, proforma => proforma.usuario)
    proformas: Proforma[];


    hashPassword() : void {
        const salt    = genSaltSync(10);
        this.password = hashSync(this.password, salt);
        console.log(this.password);
    }


    isCorrectPassword(password:string): boolean {
        return compareSync(password, this.password);

    }


    static async validate(usuarioToSave: Usuario) : Promise<ValidationError[]> {

        const validateOptions = { validationError: { target:false, value:false} };
        const errors          = await validate(usuarioToSave, validateOptions);

        return errors;
    }


    static checkData(data) : any {

        let dataChecked = { hasErrors: false, errors: {}, message: "Nada para cambiar" };

        if (!data.correo) {
            dataChecked.errors['correo'] = 'correo es requerido';
            dataChecked.hasErrors = true;
        }

        if (!data.password) {
            dataChecked.errors['password'] = 'password es requerido';
            dataChecked.hasErrors = true;
        }

        if (!data.nombre) {
            dataChecked.errors['nombre'] = 'nombre es requerido';
            dataChecked.hasErrors = true;
        }

        if (!data.apellido1) {
            dataChecked.errors['apellido1'] = 'apellido1 es requerido';
            dataChecked.hasErrors = true;
        }

        if (!data.apellido2) {
            dataChecked.errors['apellido2'] = 'apellido2 es requerido';
            dataChecked.hasErrors = true;
        }

        if (!data.fechaNacimiento) {
            dataChecked.errors['fechaNacimiento'] = 'fechaNacimiento es requerido';
            dataChecked.hasErrors = true;
        }
        
        return dataChecked;
    }

}
