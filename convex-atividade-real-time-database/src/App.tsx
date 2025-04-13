import './App.css'
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import MessageBox from './messageBox';
import UsuariosBox from './UsuariosBox';
import CaixaDigitacao from './CaixaDigitacao';
import { useState } from 'react';

const eu = getOrSetFakeName()

function App() {
  const usuarios = useQuery(api.usuarios.getUsuarios);
  const mensagens = useQuery(api.chat.getMessages);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <div className="header">
        <div className="header-left">
          <button 
            className="menu-toggle" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> : 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            }
          </button>
          <svg className="header-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <h1 className="header-title">ChatConvex</h1>
        </div>
        <div className="header-user">
          <span>{eu.id}</span>
        </div>
      </div>
      <div className="main">
        <UsuariosBox usuarios={usuarios} isSidebarOpen={isSidebarOpen} />
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
      newName = prompt("Digite seu nome: 🫣");
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