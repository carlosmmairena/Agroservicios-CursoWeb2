import { IsDate, IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcryptjs';


@Entity()
@Unique(['correo'])
export class Usuario{

    //Atributos de una base de datos 
 
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
   // @IsDate()
    @IsNotEmpty()
    fechaNac: Date;

    @Column()
    @IsEmail()
    //@IsNotEmpty()
    correo: string;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty()
    estado: boolean;
   // static nombre: any;

    
   hashPassword():void{
       const salt= bcrypt.genSaltSync(10);
       this.password= bcrypt.hashSync(this.password, salt);
    }

    checkPassword(password:string): boolean{

        return bcrypt.compareSync(password, this.password);
    }


}