import { IsBoolean, IsNotEmpty, IsNumber, MaxLength, Min, validate, ValidationError } from "class-validator";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { isNull, isUndefined } from "util";
import { Construccion } from "./Construccion";
import { DetalleProforma } from "./DetalleProforma";
import { Insumo } from "./Insumo";
import { Veterinario } from "./Veterinario";


@Entity("Productos")
export class Producto {
    
    @PrimaryGeneratedColumn()
    id: number;


    @IsNotEmpty()
    @MaxLength(100)
    @Column({ unique: true })
    nombre: string;


    @IsNotEmpty()
    @Column({ type: 'text' })
    descripcion: string;


    @MaxLength(50)
    @IsNotEmpty()
    @Column()
    marca: string;


    @IsNumber()
    @Min(0)
    @Column()
    precioUnitario: number;


    @IsNumber()
    @Min(0)
    @Column()
    stock: number;


    @MaxLength(50)
    @IsNotEmpty()
    @Column()
    unidadMedida: string;


    @IsBoolean()
    @Column({ default: true })
    estado: boolean;


    @OneToOne(() => Veterinario, veterinario => veterinario.producto)
    veterinario: Veterinario


    @OneToOne(() => Insumo, insumo => insumo.producto)
    insumo: Insumo


    @OneToOne(() => Construccion, construccion => construccion.producto)
    construccion: Construccion;


    @OneToMany(() => DetalleProforma, detalleProducto => detalleProducto.producto)
    detalleProformas: DetalleProforma[];


    static async validate(productToSave: Producto) : Promise<ValidationError[]> {

        const validateOptions = { validationError: { target:false, value:false} };
        const errors          = await validate(productToSave, validateOptions);

        return errors;
    }


    static checkData(data) : any {

        let dataChecked = { hasErrors: false, errors: {}, message: "Nada para cambiar" };

        if (!data.nombre) {
            dataChecked.errors['nombre'] = 'nombre es requerido';
            dataChecked.hasErrors = true;
        }

        if (!data.descripcion) {
            dataChecked.errors['descripcion'] = 'descripcion es requerido';
            dataChecked.hasErrors = true;
        }

        if (!data.precioUnitario) {
            dataChecked.errors['precioUnitario'] = 'precioUnitario es requerido';
            dataChecked.hasErrors = true;
        }

        if (!data.marca) {
            dataChecked.errors['marca'] = 'marca es requerido';
            dataChecked.hasErrors = true;
        }

        if (!data.stock) {
            dataChecked.errors['stock'] = 'stock es requerido';
            dataChecked.hasErrors = true;
        }

        if (!data.unidadMedida) {
            dataChecked.errors['unidadMedida'] = 'unidadMedida es requerido';
            dataChecked.hasErrors = true;
        }

        if (isNull(data.estado) || isUndefined(data.estado)) {
            dataChecked.errors['estado'] = 'estado es requerido';
            dataChecked.hasErrors = true;
        }

        return dataChecked;
    }

}
