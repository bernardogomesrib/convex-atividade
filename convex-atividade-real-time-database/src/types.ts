export type Usuario = {
    id: string
    ultimaAtividade: number; // Changed from Date to number
    digitando: boolean;
}
export type Mensagem = {
  usuario: string;
  text: string;
  timestamp: number;
};