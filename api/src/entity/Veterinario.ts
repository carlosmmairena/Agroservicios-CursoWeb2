import { IsNotEmpty, validate, ValidationError } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";


@Entity("Veterinarios")
export class Veterinario {

    @PrimaryGeneratedColumn()
    id: number;


    @OneToOne(() => Producto, producto => producto.veterinario)
    @JoinColumn({ name: "idProducto", referencedColumnName: "id" })
    producto: Producto;    


    @Column()
    @IsNotEmpty()
    tipoAnimal: string;

    static async validate(productToSave: Veterinario) : Promise<ValidationError[]> {

        const productValidated = Producto.validate(productToSave.producto);

        let errors = productValidated;

        const validateOptions = { validationError: { target:false, value:false} };
        const anotherErrors          = await validate(productToSave, validateOptions);

        (await errors).push(... anotherErrors);

        return errors;
    }

    static checkData(data) : any {

        const dataValidated = Producto.checkData(data);

        let dataChecked = { hasErrors: false, errors: {}, message: "Nada para cambiar" };
        
        if (dataValidated.hasErrors) {
            dataChecked.errors = dataValidated.errors;
        }

        if (!data.tipoAnimal) {
            dataChecked.errors['tipoAnimal'] = 'tipoAnimal es requerido';
            dataChecked.hasErrors = true;
        }

        return dataChecked;
    }

}
