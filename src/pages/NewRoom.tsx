
import { FormEvent, useState } from 'react'
//Navegação para a pagina principal no caso
import { Link, useHistory } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
//import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';


import '../styles/auth.scss';


export function NewRoom() {

    const { user } = useAuth();
    const history = useHistory()
    const [newRoom, setNewRoom] = useState('');


    //Fluxo para criação de sala
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() == '') {

            return;
        }


        const roomRef = database.ref('rooms');

        //Inserindo o dado no banco, nome da sala e a chave de identificação
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        //o simbolo `` usado aqui é realmente a crase
        //Retornando o ID , a chyave do registro inserido, onde identifico unicamente cada sala
        history.push(`/rooms/${firebaseRoom.key}`)

    }


    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>

                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />

                    <h2>Criar uma nova sala</h2>

                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}

                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>

                    </p>
                </div>
            </main>
        </div>
    )
}