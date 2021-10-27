import { IsDate, IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';


@Entity("Usuarios")
export class Usuario {
 
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    @IsNotEmpty()
    nombre: string;


    @Column()
    @IsNotEmpty()
    apellido: string;


    @Column()
    @IsNotEmpty()
    apellido2: string;


    @Column()
    @IsDate()
    @IsNotEmpty()
    fechaNac: Date;


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


    hashPassword() : void {
        const salt= bcrypt.genSaltSync(10);
        this.password= bcrypt.hashSync(this.password, salt);
    }


    checkPassword(password:string): boolean {
        return bcrypt.compareSync(password, this.password);

    }

}
