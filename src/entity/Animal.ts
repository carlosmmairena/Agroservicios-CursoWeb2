import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Raza } from "./Raza";
import { Adopcion } from "./Adopcion";


@Entity("Animales")
export class Animal {
 
    @PrimaryGeneratedColumn()
    id: number;
 

    @Column()
    @IsNotEmpty()
    tipo: string;


    @Column()
    @IsNotEmpty()
    color: string;

    
    @Column()
    @IsNotEmpty()
    peso: number;


    @Column()
    @IsNotEmpty()
    idRaza: number;

    
    @Column()
    @IsNotEmpty()
    Descripcion: string;


    @Column()
    @IsNotEmpty()
    estado: boolean;  


   @ManyToOne(type => Raza, raza => raza, { nullable: false, eager:true} )
   @JoinColumn({name: 'idRaza', referencedColumnName: 'idRaza'})
   raza: Raza;


   @OneToOne(type => Adopcion, adopcion => adopcion)
   @JoinColumn()
   adopcion: Adopcion;

}
