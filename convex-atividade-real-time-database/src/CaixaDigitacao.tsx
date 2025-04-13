import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useState } from "react";
import { Usuario } from "./types";

const CaixaDigitacao = ({eu}:{eu:Usuario}) => {
const sendMessage = useMutation(api.chat.sendMessages);
const [digitandoRef, setDigitandoRef] = useState(false);
const [newMessageText, setNewMessageText] = useState("");
    const atualizaUsuario = useMutation(api.usuarios.updateUsuario);
    useEffect(() => {
        atualizaUsuario({ id: eu.id, digitando: digitandoRef });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <form className='form' onSubmit={async (e) => {
        e.preventDefault();
        await sendMessage({ usuario: eu.id, text: newMessageText });
        setNewMessageText("");
        setDigitandoRef(false);
        atualizaUsuario({ id: eu.id, digitando: false });

    }}>
        <div className="textbox">

        <input type="text" value={newMessageText} onChange={(text) => {
            const isTyping = text.target.value.length > 0;
            console.log(isTyping);
            setNewMessageText(text.target.value);
            if (digitandoRef !== isTyping) {
                atualizaUsuario({ id: eu.id, digitando: isTyping });
                setDigitandoRef(isTyping);
            }
        }} 
        placeholder="Digita a mensagem"
        name="text" 
        />
        </div>
        <button type="submit">Enviar</button>

    </form>
}
export default CaixaDigitacao