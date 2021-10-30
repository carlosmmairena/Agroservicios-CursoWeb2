import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity("Consejos")
export class Consejo {

    @PrimaryGeneratedColumn()
    id: number;


    @MaxLength(200)
    @MinLength(5)
    @IsNotEmpty()
    @Column()
    titulo: string;


    @IsNotEmpty()
    @Column({ default: 'Sin fotografía.' })
    foto: string;


    @ManyToOne(() => Usuario, usuario => usuario.consejos)
    @JoinColumn({  name: 'idUsuario', referencedColumnName: 'id' })
    usuario: Usuario;

}
