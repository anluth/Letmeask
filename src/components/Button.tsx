//Esse Botão é usado em varioas partes do codigo

//O React me permite passar todas as propriedades de um botão 

//Ele exporta uma tipagem de todas as propriedades que um botão pode receber com o ButtonHTMLAttributes

import { ButtonHTMLAttributes } from "react";


import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean

}



export function Button({ isOutlined = false, ...props }: ButtonProps) {
    return (

        <button
            className={`button ${isOutlined ? 'outlined' : ''}`}
            {...props}


        />



    )

}

