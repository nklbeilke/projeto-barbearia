import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

registerLocale("pt-BR", ptBR); //Idioma do calendário
function App() {
  const [tela, setTela] = useState("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [servico, setServico] = useState(null);
  const [data, setData] = useState(null);
  const [hora, setHora] = useState("");
  const servicos = [
  { id: 1, nome: "Cabelo", preco: "R$ 35,00" },
  { id: 2, nome: "Cabelo + Barba", preco: "R$ 65,00" },
  { id: 3, nome: "Barba", preco: "R$ 35,00" },
  { id: 4, nome: "Corte + Barba + Sobrancelha", preco: "R$ 70,00" },
  { id: 5, nome: "Cabelo + Sobrancelha", preco: "R$ 40,00" },
  { id: 5, nome: "Nevou", preco: "R$ 150,00" },
  { id: 5, nome: "Blindado", preco: "R$ 150,00" },
  ];
  const horarios = ["09:00","10:00","11:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"];
  const diasDisponiveis = [
    new Date(2026, 1, 10),
    new Date(2026, 1, 11),
    new Date(2026, 1, 12),
    new Date(2026, 1, 13),
  ];
  function fazerLogin() {
    if (!email || !senha) {
      alert("Preencha email e senha");
      return;
    }
    setTela("servicos");
  }
  function escolherServico(item) {
    setServico(item);
    setTela("agendamento");
  }
  function confirmarAgendamento() {
    if (!data || !hora) {
      alert("Selecione a data e o horário");
      return;
    }
    alert(
      `Agendamento Confirmado!\n\nServiço: ${servico.nome}\nData: ${data.toLocaleDateString(
        "pt-BR"
      )}\nHorário: ${hora}`
    );
    setTela("servicos");
    setData(null);
    setHora("");
  }
//Tela login
  if (tela === "login") {
    return (
      <div className="containerApp">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>N&B Barbearia</h1>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button onClick={fazerLogin}>Entrar</button>
      </div>
    );
  }
//Tela serviços
  if (tela === "servicos") {
    return (
      <div className="containerApp">
        <h1>Nossos Serviços</h1>
        {servicos.map((item) => (
          <div
            key={item.id}
            className="cardServico"
            onClick={() => escolherServico(item)}
          >
            <div>{item.nome}</div>
            <div>{item.preco}</div>
          </div>
        ))}
        <button onClick={() => setTela("login")}>Sair</button>
      </div>
    );
  }
//Tela agendamento
  if (tela === "agendamento") {
    return (
      <div className="containerApp">
        <h1>Agendar Horário</h1>
        <p><strong>Serviço:</strong> {servico.nome}</p>
        <p><strong>Preço:</strong> {servico.preco}</p>
        <p>Selecione a data:</p>
<DatePicker
          selected={data}
          onChange={setData}
          locale="pt-BR"
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecione a data desejada"
          filterDate={(dia) => {
            return diasDisponiveis.some(
              (d) =>
                d.getDate() === dia.getDate() &&
                d.getMonth() === dia.getMonth() &&
                d.getFullYear() === dia.getFullYear()
            );
          }}
          dayClassName={(dia) => {
            const disponivel = diasDisponiveis.some(
              (d) =>
                d.getDate() === dia.getDate() &&
                d.getMonth() === dia.getMonth() &&
                d.getFullYear() === dia.getFullYear()
            );
            return disponivel ? "dia-disponivel" : "dia-indisponivel";
          }}
        />
        <p>Selecione o horário:</p>
        <div>
          {horarios.map((h) => (
            <button
              key={h}
              className={h === hora ? "botaoHorarioSelecionado" : "botaoHorario"}
              onClick={() => setHora(h)}
            >
              {h}
            </button>
          ))}
        </div>
        <button onClick={confirmarAgendamento}>Confirmar Agendamento</button>
        <button onClick={() => setTela("servicos")}>Voltar</button>
      </div>
    );
  }
  return null;
}
export default App;