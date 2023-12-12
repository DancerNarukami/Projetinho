import React, { useState, useEffect } from "react";
import Header from "../../component/Header/Header";
import "../../assets/css/FormPeriodo.css";

function FormPeriodo() {
  const [cursos, setCursos] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [novoPeriodo, setNovoPeriodo] = useState({
    numeroPeriodo: "",
    semestreAnoPeriodo: "",
    dataInicioPeriodo: "",
    dataFimPeriodo: "",
    turnoPeriodo: "",
    cursoPeriodo: "",
  });
  const [periodoEditando, setPeriodoEditando] = useState(null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const storedCursos = JSON.parse(localStorage.getItem("cursos")) || [];
    const storedPeriodos = JSON.parse(localStorage.getItem("periodos")) || [];
    setCursos(storedCursos);
    setPeriodos(storedPeriodos);
  }, []);

  const adicionarPeriodo = () => {
    try {
      if (
        novoPeriodo.numeroPeriodo &&
        novoPeriodo.semestreAnoPeriodo &&
        novoPeriodo.dataInicioPeriodo &&
        novoPeriodo.dataFimPeriodo &&
        novoPeriodo.turnoPeriodo &&
        novoPeriodo.cursoPeriodo
      ) {
        const updatedPeriodos = [...periodos, { ...novoPeriodo }];
        setPeriodos(updatedPeriodos);
        setNovoPeriodo({
          numeroPeriodo: "",
          semestreAnoPeriodo: "",
          dataInicioPeriodo: "",
          dataFimPeriodo: "",
          turnoPeriodo: "",
          cursoPeriodo: "",
        });
        localStorage.setItem("periodos", JSON.stringify(updatedPeriodos));
      } else {
        alert("Preencha todos os campos!");
      }
    } catch (error) {
      console.error("Erro ao adicionar período", error);
    }
  };

  const preencherCamposDeEdicao = (index) => {
    const periodoParaEditar = periodos[index];
    setPeriodoEditando(periodoParaEditar);
    setNovoPeriodo({
      numeroPeriodo: periodoParaEditar.numeroPeriodo,
      semestreAnoPeriodo: periodoParaEditar.semestreAnoPeriodo,
      dataInicioPeriodo: periodoParaEditar.dataInicioPeriodo,
      dataFimPeriodo: periodoParaEditar.dataFimPeriodo,
      turnoPeriodo: periodoParaEditar.turnoPeriodo,
      cursoPeriodo: periodoParaEditar.cursoPeriodo,
    });
    setEditando(true);
  };

  const confirmarEdicao = () => {
    try {
      const periodosAtualizados = [...periodos];
      periodosAtualizados[periodos.indexOf(periodoEditando)] = novoPeriodo;
      setPeriodos(periodosAtualizados);
      setPeriodoEditando(null);
      setNovoPeriodo({
        numeroPeriodo: "",
        semestreAnoPeriodo: "",
        dataInicioPeriodo: "",
        dataFimPeriodo: "",
        turnoPeriodo: "",
        cursoPeriodo: "",
      });
      setEditando(false);
      localStorage.setItem("periodos", JSON.stringify(periodosAtualizados));
    } catch (error) {
      console.error("Erro ao confirmar edição", error);
    }
  };

  const cancelarEdicao = () => {
    setPeriodoEditando(null);
    setNovoPeriodo({
      numeroPeriodo: "",
      semestreAnoPeriodo: "",
      dataInicioPeriodo: "",
      dataFimPeriodo: "",
      turnoPeriodo: "",
      cursoPeriodo: "",
    });
    setEditando(false);
  };

  const excluirPeriodo = (index) => {
    const novosPeriodos = periodos.filter((periodo, i) => i !== index);
    setPeriodos(novosPeriodos);
    setPeriodoEditando(null);
    setNovoPeriodo({
      numeroPeriodo: "",
      semestreAnoPeriodo: "",
      dataInicioPeriodo: "",
      dataFimPeriodo: "",
      turnoPeriodo: "",
      cursoPeriodo: "",
    });
    setEditando(false);
    localStorage.setItem("periodos", JSON.stringify(novosPeriodos));
  };
  return (
    <>
      <Header />
      <div className="section1FormPeriodos">
        <h1 className="tituloPagina">Cadastro de Período</h1>
        <div className="containerFormPeriodos">
          <div className="cadastroFormularioPeriodos">
            <div className="divCampoPeriodo">
              <label className="labelCampoPeriodo">Número do Período:</label>
              <input
                className="inputCampoPeriodo"
                placeholder="Digite o número do período"
                id="numeroPeriodo"
                value={novoPeriodo.numeroPeriodo}
                onChange={(e) =>
                  setNovoPeriodo({
                    ...novoPeriodo,
                    numeroPeriodo: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="divCampoPeriodo">
              <label className="labelCampoPeriodo">Semestre/Ano:</label>
              <input
                className="inputCampoPeriodo"
                placeholder="Digite o semestre/ano do período (ex: 2/2023)"
                id="semestreAnoPeriodo"
                value={novoPeriodo.semestreAnoPeriodo}
                onChange={(e) =>
                  setNovoPeriodo({
                    ...novoPeriodo,
                    semestreAnoPeriodo: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="divCampoPeriodo">
              <label className="labelCampoPeriodo">Data de Início:</label>
              <input
                className="inputCampoPeriodo"
                placeholder="Digite a data de início do período"
                id="dataInicioPeriodo"
                type="date"
                value={novoPeriodo.dataInicioPeriodo}
                onChange={(e) =>
                  setNovoPeriodo({
                    ...novoPeriodo,
                    dataInicioPeriodo: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="divCampoPeriodo">
              <label className="labelCampoPeriodo">Data de Fim:</label>
              <input
                className="inputCampoPeriodo"
                placeholder="Digite a data de fim do período"
                id="dataFimPeriodo"
                type="date"
                value={novoPeriodo.dataFimPeriodo}
                onChange={(e) =>
                  setNovoPeriodo({
                    ...novoPeriodo,
                    dataFimPeriodo: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="divCampoPeriodo">
              <label className="labelCampoPeriodo">Turno:</label>
              <select
                className="selectCampoPeriodo"
                id="turnoPeriodo"
                value={novoPeriodo.turnoPeriodo}
                onChange={(e) =>
                  setNovoPeriodo({
                    ...novoPeriodo,
                    turnoPeriodo: e.target.value,
                  })
                }
              >
                <option>Turnos</option>
                <option value="matutino">Matutino</option>
                <option value="vespertino">Vespertino</option>
                <option value="noturno">Noturno</option>
              </select>
            </div>
            <div className="divCampoPeriodo">
              <label className="labelCampoPeriodo">Curso:</label>
              <select
                className="selectCampoPeriodo"
                id="cursoPeriodo"
                value={novoPeriodo.cursoPeriodo}
                onChange={(e) =>
                  setNovoPeriodo({
                    ...novoPeriodo,
                    cursoPeriodo: e.target.value,
                  })
                }
              >
                <option value="">Cursos</option>
                {cursos.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    {curso.nome}
                  </option>
                ))}
              </select>
            </div>

            {editando ? (
              <>
                <button
                  type="button"
                  onClick={confirmarEdicao}
                  className="btnEditarPeriodo"
                >
                  Confirmar Edição
                </button>
                <button
                  type="button"
                  onClick={cancelarEdicao}
                  className="btnCancelarEdicaoPeriodo"
                >
                  Cancelar Edição
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={adicionarPeriodo}
                className="btnSubmitFormPeriodos"
              >
                Salvar
              </button>
            )}
          </div>
        </div>
        <div className="containerTabelaPeriodos">
          <table>
            <thead>
              <tr>
                <th>Número do Período</th>
                <th>Semestre/Ano</th>
                <th>Data de Início</th>
                <th>Data de Fim</th>
                <th>Turno</th>
                <th>Curso</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {periodos.map((periodo, index) => (
                <tr key={index}>
                  <td className="tdforms">{periodo.numeroPeriodo}</td>
                  <td className="tdforms">{periodo.semestreAnoPeriodo}</td>
                  <td className="tdforms">{periodo.dataInicioPeriodo}</td>
                  <td className="tdforms">{periodo.dataFimPeriodo}</td>
                  <td className="tdforms">{periodo.turnoPeriodo}</td>
                  <td className="tdforms">
                    {periodo.cursoPeriodo}</td>
                  <td className="tdforms">
                    <button
                      className="btnTabela"
                      type="button"
                      onClick={() => preencherCamposDeEdicao(index)}
                    >
                      Editar
                    </button>
                  </td>
                  <td className="tdforms">
                    <button className="btnTabela" type="button" onClick={() => excluirPeriodo(index)}>
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

export default FormPeriodo;