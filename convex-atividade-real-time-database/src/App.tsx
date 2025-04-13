import './App.css'
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import MessageBox from './messageBox';
import UsuariosBox from './UsuariosBox';
import CaixaDigitacao from './CaixaDigitacao';
const eu = getOrSetFakeName()

function App() {
  
  const usuarios = useQuery(api.usuarios.getUsuarios);
  const mensagens = useQuery(api.chat.getMessages);
  
  return (
    <>
      <div className="header">
        <h1>Atividade Real Time Database</h1>
        <h2>Convex</h2>
        <h3>Olá {eu.id}</h3>
      </div>
      <div className="main">
        <UsuariosBox  usuarios={usuarios} />
        <MessageBox mensagens={mensagens} eu={eu} />
        <CaixaDigitacao eu={eu} />
        
      </div>
    </>
  )
}
function getOrSetFakeName() {
  const NAME_KEY = "usuario_name";
  const name = sessionStorage.getItem(NAME_KEY);
  if (!name) {
    let newName = null;
    while (true) {
      newName = prompt("Bota o nome: 🫣");
      if (newName !== null) {
        break;
      }
    }
    sessionStorage.setItem(NAME_KEY, newName);

    return { id: newName, ultimaAtividade: new Date().getTime(), digitando: false };
  }
  return { id: name, ultimaAtividade: new Date().getTime(), digitando: false };
}
export default App
