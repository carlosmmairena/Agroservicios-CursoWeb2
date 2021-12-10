import { IsNotEmpty, validate, ValidationError } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";


@Entity("Insumos")
export class Insumo {
 
    @PrimaryGeneratedColumn()
    id: number;
 
    
    @OneToOne(() => Producto, producto => producto.insumo)
    @JoinColumn({ name: "idProducto", referencedColumnName: "id" })
    producto: Producto;
    

    @Column()
    @IsNotEmpty()
    fechaVencimiento: Date;


    @Column()
    @IsNotEmpty()
    tipoInsumo: string;

    static async validate(productToSave: Insumo) : Promise<ValidationError[]> {

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

        if (!data.fechaVencimiento) {
            dataChecked.errors['fechaVencimiento'] = 'fechaVencimiento es requerido';
            dataChecked.hasErrors = true;
        }

        if (!data.tipoInsumo) {
            dataChecked.errors['tipoInsumo'] = 'tipoInsumo es requerido';
            dataChecked.hasErrors = true;
        }

        return dataChecked;
    }

}
