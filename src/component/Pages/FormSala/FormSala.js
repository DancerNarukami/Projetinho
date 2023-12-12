import React, { useState, useEffect } from "react";
import Header from "../../component/Header/Header";
import "../../assets/css/FormSala.css";

function FormSala() {
  const [salas, setSalas] = useState([]);
  const [novaSala, setNovaSala] = useState({
    andar: "",
    numero: "",
    predio: "",
    numeroCadeiras: "",
  });

  const [salaEditando, setSalaEditando] = useState(null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const storedSalas = JSON.parse(localStorage.getItem("salas")) || [];
    setSalas(storedSalas);
  }, []);

  const adicionarSala = () => {
    try {
      if (novaSala.andar && novaSala.numero && novaSala.predio && novaSala.numeroCadeiras) {
        const updatedSalas = [...salas, { ...novaSala }];
        setSalas(updatedSalas);
        setNovaSala({
          andar: "",
          numero: "",
          predio: "",
          numeroCadeiras: "",
        });
        localStorage.setItem("salas", JSON.stringify(updatedSalas));
      } else {
        alert("Preencha todos os campos!");
      }
    } catch (error) {
      console.error("Erro ao adicionar sala", error);
    }
  };

  const editarSala = (index) => {
    const salaParaEditar = salas[index];
    setSalaEditando(salaParaEditar);
    setNovaSala({
      andar: salaParaEditar.andar,
      numero: salaParaEditar.numero,
      predio: salaParaEditar.predio,
      numeroCadeiras: salaParaEditar.numeroCadeiras,
    });
    setEditando(true);
  };

  const confirmarEdicao = () => {
    try {
      if (novaSala.andar && novaSala.numero && novaSala.predio && novaSala.numeroCadeiras) {
        const salasAtualizadas = [...salas];
        salasAtualizadas[salas.indexOf(salaEditando)] = novaSala;
        setSalas(salasAtualizadas);
        setSalaEditando(null);
        setNovaSala({
          andar: "",
          numero: "",
          predio: "",
          numeroCadeiras: "",
        });
        setEditando(false);
        localStorage.setItem("salas", JSON.stringify(salasAtualizadas));
      } else {
        alert("Preencha todos os campos!");
      }
    } catch (error) {
      console.error("Erro ao confirmar edição", error);
    }
  };

  const cancelarEdicao = () => {
    setSalaEditando(null);
    setNovaSala({
      andar: "",
      numero: "",
      predio: "",
      numeroCadeiras: "",
    });
    setEditando(false);
  };

  const excluirSala = (index) => {
    const novasSalas = salas.filter((_, i) => i !== index);
    setSalas(novasSalas);
    setSalaEditando(null);
    setNovaSala({
      andar: "",
      numero: "",
      predio: "",
      numeroCadeiras: "",
    });
    setEditando(false);
    localStorage.setItem("salas", JSON.stringify(novasSalas));
  };

  return (
    <>
      <Header />
      <div className="section1FormSalas">
        <h1 className="tituloPagina">Cadastro de Salas</h1>
        <div className="containerFormSalas">
          <div className="cadastroFormularioSalas">
            <div className="divCampoSala">
              <label className="labelCampoSala">Andar:</label>
              <input
                className="inputCampoSala"
                placeholder="Digite o andar da sala"
                value={novaSala.andar}
                onChange={(e) => setNovaSala({ ...novaSala, andar: e.target.value })}
              />
            </div>
            <div className="divCampoSala">
              <label className="labelCampoSala">Número:</label>
              <input
                className="inputCampoSala"
                placeholder="Digite o número da sala"
                type="number"
                value={novaSala.numero}
                onChange={(e) => setNovaSala({ ...novaSala, numero: e.target.value })}
              />
            </div>
            <div className="divCampoSala">
              <label className="labelCampoSala">Prédio:</label>
              <input
                className="inputCampoSala"
                placeholder="Digite o prédio da sala"
                value={novaSala.predio}
                onChange={(e) => setNovaSala({ ...novaSala, predio: e.target.value })}
              />
            </div>
            <div className="divCampoSala">
              <label className="labelCampoSala">Número de Cadeiras:</label>
              <input
                className="inputCampoSala"
                placeholder="Digite o número de cadeiras da sala"
                type="number"
                value={novaSala.numeroCadeiras}
                onChange={(e) => setNovaSala({ ...novaSala, numeroCadeiras: e.target.value })}
              />
            </div>
            {editando ? (
              <>
                <button type="button" onClick={confirmarEdicao} className="btnEditarSala">
                  Confirmar Edição
                </button>
                <button type="button" onClick={cancelarEdicao} className="btnCancelarEdicaoSala">
                  Cancelar Edição
                </button>
              </>
            ) : (
              <button type="button" onClick={adicionarSala} className="btnSubmitFormSalas">
                Salvar
              </button>
            )}
          </div>
        </div>
        <div className="containerTabelaSalas">
          <table>
            <thead>
              <tr>
                <th>Andar</th>
                <th>Número</th>
                <th>Prédio</th>
                <th>Número de Cadeiras</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {salas.map((sala, index) => (
                <tr key={index}>
                  <td className="tdforms">{sala.andar}</td>
                  <td className="tdforms">{sala.numero}</td>
                  <td className="tdforms">{sala.predio}</td>
                  <td className="tdforms">{sala.numeroCadeiras}</td>
                  <td className="tdforms">
                    <button className="btnTabela" type="button" onClick={() => editarSala(index)}>
                      Editar
                    </button>
                  </td>
                  <td className="tdforms">
                    <button className="btnTabela" type="button" onClick={() => excluirSala(index)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default FormSala;