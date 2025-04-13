import { useEffect, useState } from "react";
import { Usuario } from "./types";

const UsuariosBox = ({ usuarios, isSidebarOpen }: { usuarios: Usuario[] | undefined, isSidebarOpen: boolean }) => {
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
        <div className={`usuarios ${isSidebarOpen ? 'active' : ''}`}>
            <div className="usuarios-header">
                <svg className="usuarios-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <h2 className="usuarios-title">Usuários:</h2>
            </div>
            
            {usuariosAtualizados && usuariosAtualizados.map((usuario: Usuario) => (
                <div className="usuario" key={usuario.id}>
                    <div className="usuario-info">
                        <span className="usuario-nome">{usuario.id}</span>
                        <span className={`status-ativo ${isOnline(usuario) ? 'online' : 'offline'}`}></span>
                    </div>
                    
                    {usuario.digitando && (
                        <div className="digitando">
                            <span>Digitando</span>
                            <div className="digitando-animacao">
                                <span className="digitando-ponto"></span>
                                <span className="digitando-ponto"></span>
                                <span className="digitando-ponto"></span>
                            </div>
                        </div>
                    )}
                    
                    {!isOnline(usuario) && !usuario.digitando && (
                        <div className="ultima-atividade">
                            Visto por último: {new Date(usuario.ultimaAtividade).toLocaleTimeString()}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default UsuariosBox;