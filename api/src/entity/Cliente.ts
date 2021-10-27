import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("Clientes")
export class Cliente {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    @IsNotEmpty()
    @IsEmail()
    Correo: string;


    @Column()
    @IsNotEmpty()
    TipoCliente: string;


    @Column()
    @IsNotEmpty()
    ApliDesc: number;
 

    @Column()
    @IsNotEmpty()
    DescuMax: number;


    @Column()
    @IsNotEmpty()
    Estado: Boolean;
}
