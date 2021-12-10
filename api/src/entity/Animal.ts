import { IsBoolean, IsNotEmpty, IsNumber, MaxLength, Min } from "class-validator";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Adopcion } from "./Adopcion";
import { isNullOrUndefined } from "util";


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


    static checkData(data) : any {

        const dataValidated = Animal.checkData(data);

        let dataChecked = { hasErrors: false, errors: {}, message: "Nada para cambiar" };
        
        if (dataValidated.hasErrors) {
            dataChecked.errors = dataValidated.errors;
        }

        if (isNullOrUndefined(data.fragil)) {
            dataChecked.errors['fragil'] = 'fragil es requerido';
            dataChecked.hasErrors = true;
        }

        return dataChecked;
    }


   @OneToOne(() => Adopcion, adopcion => adopcion.animal)
   adopcion: Adopcion;

}
