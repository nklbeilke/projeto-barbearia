import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

export default function App() {
  const [telaAtual, setTelaAtual] = useState("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [horaSelecionada, setHoraSelecionada] = useState("");

  const servicos = [
    { id: 1, nome: "Cabelo", preco: "R$ 35,00" },
    { id: 2, nome: "Cabelo + Barba", preco: "R$ 65,00" },
    { id: 3, nome: "Barba", preco: "R$ 35,00" },
    { id: 4, nome: "Corte + Barba + Sobrancelha", preco: "R$ 70,00" },
    { id: 5, nome: "Cabelo + Sobrancelha", preco: "R$ 40,00" },
  ];

  const horarios = [
    "09:00","10:00","11:00",
    "14:00","15:00","16:00",
    "17:00","18:00","19:00",
  ];

  const diasDisponiveis = [
    new Date(2026, 1, 10),
    new Date(2026, 1, 11),
    new Date(2026, 1, 12),
    new Date(2026, 1, 13),
  ];

  const handleLogin = () => {
    if (email && senha) {
      setTelaAtual("servicos");
    } else {
      alert("Preencha email e senha");
    }
  };

  const handleSelecionarServico = (servico) => {
    setServicoSelecionado(servico);
    setTelaAtual("agendamento");
  };

  const handleConfirmarAgendamento = () => {
    if (!dataSelecionada || !horaSelecionada) {
      alert("Selecione uma data e horário");
      return;
    }

    const dataFormatada = dataSelecionada.toLocaleDateString("pt-BR");

    alert(
      `Agendamento Confirmado!\n\nServiço: ${servicoSelecionado.nome}\nData: ${dataFormatada}\nHorário: ${horaSelecionada}`
    );

    setTelaAtual("servicos");
    setDataSelecionada(null);
    setHoraSelecionada("");
  };

//Tela login
  if (telaAtual === "login") {
    return (
      <div className="containerApp">
        <h1 className="titulo">N&B Barbearia</h1>

        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>

        <input
          className="input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button className="botao" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    );
  }

//Tela serviços
  if (telaAtual === "servicos") {
    return (
      <div className="containerApp">
        <h1 className="titulo">Nossos Serviços</h1>

        <div className="scrollView">
          {servicos.map((servico) => (
            <div
              key={servico.id}
              className="cardServico"
              onClick={() => handleSelecionarServico(servico)}
            >
              <span>{servico.nome}</span>
              <span>{servico.preco}</span>
            </div>
          ))}
        </div>

        <button
          className="botaoSecundario"
          onClick={() => setTelaAtual("login")}
        >
          Sair
        </button>
      </div>
    );
  }

//Tela agendamento
  if (telaAtual === "agendamento") {
    const dataFormatada = dataSelecionada
      ? dataSelecionada.toLocaleDateString("pt-BR")
      : "";

    return (
      <div className="containerApp">
        <h1 className="titulo">Agendar Horário</h1>

        <div className="infoServico">
          <p>Serviço selecionado:</p>
          <h2>{servicoSelecionado.nome}</h2>
          <h3>{servicoSelecionado.preco}</h3>
        </div>

        <div className="calendarContainer">
          <p>Selecione a Data:</p>

          <DatePicker
            selected={dataSelecionada}
            onChange={(date) => setDataSelecionada(date)}
            placeholderText="Clique para selecionar a data"
            dayClassName={(date) => {
              const disponivel = diasDisponiveis.some(
                (d) =>
                  d.getDate() === date.getDate() &&
                  d.getMonth() === date.getMonth() &&
                  d.getFullYear() === date.getFullYear()
              );
              return disponivel ? "dia-disponivel" : "dia-indisponivel";
            }}
          />

          {dataSelecionada && (
            <p className="dataSelecionada">
              Data escolhida: {dataFormatada}
            </p>
          )}
        </div>

        <p className="tituloHorario">Selecione o Horário:</p>

        <div className="containerHorarios">
          {horarios.map((hora) => (
            <button
              key={hora}
              className={`botaoHorario ${
                horaSelecionada === hora ? "botaoHorarioSelecionado" : ""
              }`}
              onClick={() => setHoraSelecionada(hora)}
            >
              {hora}
            </button>
          ))}
        </div>

        <button className="botao" onClick={handleConfirmarAgendamento}>
          Confirmar Agendamento
        </button>

        <button
          className="botaoSecundario"
          onClick={() => setTelaAtual("servicos")}
        >
          Voltar
        </button>
      </div>
    );
  }

  return null;
}