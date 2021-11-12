import { IsBoolean, IsDateString, IsNotEmpty, MinDate, validate, ValidationError } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Animal } from "./Animal";


@Entity("Adopciones")
export class Adopcion {
 
    @PrimaryGeneratedColumn()
    id: number;


    @IsBoolean()
    @Column({ default: true })
    vacunado: boolean;

    
    @IsDateString()
    @MinDate(new Date())
    @Column({ nullable: false })
    fechaAdopcion: Date;


    @IsNotEmpty()
    @Column({ type: 'text' })
    descripcion: string;


    @OneToOne(() => Animal, animal => animal.adopcion, { nullable: false, eager:true })
    @JoinColumn({ name: 'idAnimal', referencedColumnName:'id' })
    animal: Animal;

    static async validate(adopcionToSave: Adopcion) : Promise<ValidationError[]> {

        const validateOptions = { validationError: { target:false, value:false} };
        const errors          = await validate(adopcionToSave, validateOptions);

        return errors;
    }


    static checkData(data) : any {

        let dataChecked = { hasErrors: false, errors: {}, message: "Nada para cambiar" };

        if (!data.vacunado) {
            dataChecked.errors['vacunado'] = 'vacunado es requerido';
            dataChecked.hasErrors = true;
        }

        if (!data.fechaAdopcion) {
            dataChecked.errors['fechaAdopcion'] = 'fechaAdopcion es requerido';
            dataChecked.hasErrors = true;
        }

        if (!data.descripcion) {
            dataChecked.errors['descripcion'] = 'descripcion es requerido';
            dataChecked.hasErrors = true;
        }

        return dataChecked;
    }

}
