import { useEffect, useState } from "react";
import { Usuario } from "./types";

const UsuariosBox = ({ usuarios }: { usuarios: Usuario[] | undefined }) => {
    const [usuariosAtualizados, setUsuariosAtualizados] = useState<Usuario[] | undefined>(usuarios);

    useEffect(() => {
        const interval = setInterval(() => {
            if (usuarios) {
                setUsuariosAtualizados([...usuarios]);
            }
        }, 300);

        return () => clearInterval(interval);
    }, [usuarios]);

    function isOnline(usuario: Usuario) {
        return new Date(usuario.ultimaAtividade).getTime() > Date.now() - 1 * 60 * 1000;
    }

    return (
        <div className="usuarios">
            <h2>Usuários</h2>
            
                {usuariosAtualizados &&
                    usuariosAtualizados.map((usuario: Usuario) => (
                        <div className="usuario" key={usuario.id}>
                            <div>
                                {usuario.id}
                            </div>
                            <span className="ultima-atividade">
                                {isOnline(usuario)
                                    ? "Online"
                                    : `Última atividade: ${new Date(usuario.ultimaAtividade).toLocaleString()}`}
                            </span>
                            <span className="status">
                                <span className="digitando">
                                    {usuario.digitando ? "Digitando..." : ""}
                                </span>
                               <div >
                                    {isOnline(usuario) ? "🟢" : "🔴"} 
                                </div> 
                            </span>
                            
                        </div>
                    ))}
            
        </div>
    );
};

export default UsuariosBox;