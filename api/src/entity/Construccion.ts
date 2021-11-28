import { IsBoolean, validate, ValidationError } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { isNull, isNullOrUndefined, isUndefined } from "util";
import { Producto } from "./Producto";


@Entity("Construcciones")
export class Construccion {

    @PrimaryGeneratedColumn()
    id: number;
 

    @OneToOne(() => Producto, producto => producto.construccion)
    @JoinColumn({ name: "idProducto", referencedColumnName: "id" })
    producto: Producto;


    @IsBoolean()
    @Column({ default: false })
    fragil: boolean;


    static async validate(productToSave: Construccion) : Promise<ValidationError[]> {

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

        if (isNullOrUndefined(data.fragil)) {
            dataChecked.errors['fragil'] = 'fragil es requerido';
            dataChecked.hasErrors = true;
        }

        return dataChecked;
    }

}
