import { useEffect, useRef } from "react";
import { Mensagem, Usuario } from "./types"

const MessageBox = ({ mensagens, eu }:{mensagens:Mensagem[]|undefined, eu:Usuario}) => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [mensagens]);
    
    return (
        <div className='mensagens' id='mensagens'>
            <div className="mensagens-container">
                {mensagens && mensagens.map((mensagem: Mensagem) => (
                    <div 
                        key={mensagem.timestamp}
                        className={"div-mensagem" + (mensagem.usuario === eu.id ? " ajustaDireita" : " ajustaEsquerda")}
                    >
                        <div className={'sobre-mensagem ' + (mensagem.usuario === eu.id ? " ajustaDireita" : " ajustaEsquerda")}>
                            <div className="mensagem-info">
                                <span className="mensagem-usuario">{mensagem.usuario}</span>
                                <span className="mensagem-hora">
                                    {new Date(mensagem.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            </div>
                            <div className={mensagem.usuario === eu.id ? "minha-mensagem" : "mensagem-dozoto"}>
                                <div>
                                    {mensagem.text}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef}></div>
            </div>
            <div className="caixaVaziaPraNaoFicarAMensagemLaEmBaixo">{" "}</div>
        </div>
    )
}

export default MessageBox