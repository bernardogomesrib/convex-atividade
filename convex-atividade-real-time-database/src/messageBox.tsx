import { useEffect } from "react";
import { Mensagem, Usuario } from "./types"

const MessageBox = ({ mensagens,eu }:{mensagens:Mensagem[]|undefined,eu:Usuario}) => {
    useEffect(() => {
        const mensagensElement = document.getElementById("mensagens");
        if (mensagensElement) {
            mensagensElement.scrollTop = mensagensElement.scrollHeight;
        }
    }, [mensagens]);
    return (
        <div className='mensagens' id='mensagens'>

            {mensagens && mensagens.map((mensagem: Mensagem) => (
                <div className={"div-mensagem" + (mensagem.usuario === eu.id ? " ajustaDireita" : " ajustaEsquerda")}>
                    <div className={'sobre-mensagem ' + (mensagem.usuario === eu.id ? " ajustaDireita" : " ajustaEsquerda")}>
                        <span >{mensagem.usuario}</span>
                        <div key={mensagem.timestamp} className={mensagem.usuario === eu.id ? "minha-mensagem" : "mensagem-dozoto"}>
                            <div>
                                {mensagem.text}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        <div className="caixaVaziaPraNaoFicarAMensagemLaEmBaixo">{" "}</div>
        </div>
    )
}
export default MessageBox