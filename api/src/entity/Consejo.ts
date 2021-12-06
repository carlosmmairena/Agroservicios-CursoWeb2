import { IsBoolean, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { isNullOrUndefined } from "util";
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


    @IsBoolean()
    @Column({ default: true })
    estado: boolean;


    @ManyToOne(() => Usuario, usuario => usuario.consejos)
    @JoinColumn({  name: 'idUsuario', referencedColumnName: 'id' })
    usuario: Usuario;

    static checkData(data) : any {

        let dataChecked = { hasErrors: false, errors: {}, message: "Nada para cambiar" };

        if (isNullOrUndefined(data.titulo)) {
            dataChecked.errors['titulo'] = 'titulo es requerido';
            dataChecked.hasErrors = true;
        }

        if (isNullOrUndefined(data.foto)) {
            dataChecked.errors['foto'] = 'foto es requerido';
            dataChecked.hasErrors            = true;
        }

        if (isNullOrUndefined(data.estado)) {
            dataChecked.errors['estado'] = 'estado es requerido';
            dataChecked.hasErrors            = true;
        }

        if (isNullOrUndefined(data.idUsuario)) {
            dataChecked.errors['idUsuario'] = 'idUsuario es requerido';
            dataChecked.hasErrors            = true;
        }

        return dataChecked;
    }

}
