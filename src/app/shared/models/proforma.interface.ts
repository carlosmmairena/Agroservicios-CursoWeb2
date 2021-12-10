
export interface ProformasResponse {

    message:   string;
    proformas: Proforma[]

}


export interface Proforma {
    id:                  number;
    fechaEmision:        Date;
    formaPago:           string;
    estado:              boolean;
    canceled:            boolean;
    porcentajeDescuento: number;
    cliente:             Object;
    idUsuario:           number;
}
