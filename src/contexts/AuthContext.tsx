
//useEffect é um hoock para disparo de efeitos colaterais, disparar uma função sempre que algo acontecer
import { createContext, ReactNode, useState, useEffect } from 'react'

import { auth, firebase } from '../services/firebase';

//Precisamos criar tipagem para tudo que se cria
type User = {
    id: string;
    name: string;
    avatar: string;

}

type AuthContextType = {

    user: User | undefined;
    signInWithGoogle: () => Promise<void>;

}


type AuthContextProviderProps = {
    children: ReactNode;
}


//Dois pares de {{}} é para indicar que, a primeira {} e para colocar um codigo javascript,
//e a segunda {} e para indicar que estou criando um objeto novo
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User>();

    //Essa funcão fica monitorando o firebase se já existia um login pre feito pelo usuario
    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {

            if (user) {

                if (user) {

                    const { displayName, photoURL, uid } = user

                    if (!displayName || !photoURL) {

                        throw new Error('Missing information from Google Account.');
                    }

                    setUser({
                        id: uid,
                        name: displayName,
                        avatar: photoURL

                    })
                }

            }


        })

        //Função para se descadatrar de todos os eventos listner que eu me cadastrei
        return () => {

            unsubscribe();

        }

    }, [])

    async function signInWithGoogle() {
        //Autenticação do usuario
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider)

        if (result.user) {

            const { displayName, photoURL, uid } = result.user

            if (!displayName || !photoURL) {

                throw new Error('Missing information from Google Account.');
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL

            })
        }

    }


    return (

        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}

        </AuthContext.Provider>


    );
}