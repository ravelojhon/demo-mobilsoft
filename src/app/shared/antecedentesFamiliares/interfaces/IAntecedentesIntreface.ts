export interface IAntecedentesIntreface {
        id: number,
        codigo: string,
        nombre_antecedente: string, 
        estado: boolean
}

export interface IAntecedentesAspiranteIntreface {
        id: number,
        codigo: string,
        nombre_antecedente: string,
        estado: boolean,
        ampliacion:string
        id_antecedente?: number,
        codigoGineco?: string,
        nombre_antecedente_gineco?: string,
}

export interface IAntecedentesGinecoIntreface {
        id: number,
        id_antecedente: number,
        codigo: string,
        nombre_antecedente_gineco: string, 
        estado: boolean
}