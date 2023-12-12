import React, { useState, useEffect } from "react";
import Header from "../../component/Header/Header";
import "../../assets/css/FormProfessor.css";

function FormProfessores() {
  const [professores, setProfessores] = useState([]);
  const [novoProfessor, setNovoProfessor] = useState({
    nome: "",
    matricula: "",
    telefone: "",
  });

  const [professorEditando, setProfessorEditando] = useState(null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const storedProfessores = JSON.parse(localStorage.getItem("professores")) || [];
    setProfessores(storedProfessores);
  }, []);

  const adicionarProfessor = () => {
    try {
      if (novoProfessor.nome && novoProfessor.matricula && novoProfessor.telefone) {
        const updatedProfessores = [...professores, { ...novoProfessor }];
        setProfessores(updatedProfessores);
        setNovoProfessor({
          nome: "",
          matricula: "",
          telefone: "",
        });
        localStorage.setItem("professores", JSON.stringify(updatedProfessores));
      } else {
        alert("Preencha todos os campos!");
      }
    } catch (error) {
      console.error("Erro ao adicionar professor", error);
    }
  };

  const editarProfessor = (index) => {
    const professorParaEditar = professores[index];
    setProfessorEditando(professorParaEditar);
    setNovoProfessor({
      nome: professorParaEditar.nome,
      matricula: professorParaEditar.matricula,
      telefone: professorParaEditar.telefone,
    });
    setEditando(true);
  };

  const confirmarEdicao = () => {
    try {
      if (novoProfessor.nome && novoProfessor.matricula && novoProfessor.telefone) {
        const professoresAtualizados = [...professores];
        professoresAtualizados[professores.indexOf(professorEditando)] = novoProfessor;
        setProfessores(professoresAtualizados);
        setProfessorEditando(null);
        setNovoProfessor({
          nome: "",
          matricula: "",
          telefone: "",
        });
        setEditando(false);
        localStorage.setItem("professores", JSON.stringify(professoresAtualizados));
      } else {
        alert("Preencha todos os campos!");
      }
    } catch (error) {
      console.error("Erro ao confirmar edição", error);
    }
  };

  const cancelarEdicao = () => {
    setProfessorEditando(null);
    setNovoProfessor({
      nome: "",
      matricula: "",
      telefone: "",
    });
    setEditando(false);
  };

  const excluirProfessor = (index) => {
    const novosProfessores = professores.filter((_, i) => i !== index);
    setProfessores(novosProfessores);
    setProfessorEditando(null);
    setNovoProfessor({
      nome: "",
      matricula: "",
      telefone: "",
    });
    setEditando(false);
    localStorage.setItem("professores", JSON.stringify(novosProfessores));
  };

  return (
    <>
      <Header />
      <div className="section1FormProfessores">
        <h1 className="tituloPagina">Cadastro de Professores</h1>
        <div className="containerFormProfessores">
          <div className="cadastroFormularioProfessores">
            <div className="divCampoProfessor">
              <label className="labelCampoProfessor">Nome do Professor:</label>
              <input
                className="inputCampoProfessor"
                placeholder="Digite o nome do professor"
                value={novoProfessor.nome}
                onChange={(e) => setNovoProfessor({ ...novoProfessor, nome: e.target.value })}
              />
            </div>
            <div className="divCampoProfessor">
              <label className="labelCampoProfessor">Matrícula:</label>
              <input
                className="inputCampoProfessor"
                placeholder="Digite a matrícula (número inteiro)"
                type="number"
                value={novoProfessor.matricula}
                onChange={(e) => setNovoProfessor({ ...novoProfessor, matricula: e.target.value })}
              />
            </div>
            <div className="divCampoProfessor">
              <label className="labelCampoProfessor">Telefone Celular:</label>
              <input
                className="inputCampoProfessor"
                placeholder="Digite o telefone celular"
                type="tel"
                value={novoProfessor.telefone}
                onChange={(e) => setNovoProfessor({ ...novoProfessor, telefone: e.target.value })}
              />
            </div>
            {editando ? (
              <>
                <button type="button" onClick={confirmarEdicao} className="btnEditarProfessor">
                  Confirmar Edição
                </button>
                <button type="button" onClick={cancelarEdicao} className="btnCancelarEdicaoProfessor">
                  Cancelar Edição
                </button>
              </>
            ) : (
              <button type="button" onClick={adicionarProfessor} className="btnSubmitFormProfessores">
                Salvar
              </button>
            )}
          </div>
        </div>
        <div className="containerTabelaProfessores">
          <table>
            <thead>
              <tr>
                <th>Nome do Professor</th>
                <th>Matrícula</th>
                <th>Telefone Celular</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {professores.map((professor, index) => (
                <tr key={index}>
                  <td className="tdforms">{professor.nome}</td>
                  <td className="tdforms">{professor.matricula}</td>
                  <td className="tdforms">{professor.telefone}</td>
                  <td className="tdforms">
                    <button className="btnTabela" type="button" onClick={() => editarProfessor(index)}>
                      Editar
                    </button>
                  </td>
                  <td className="tdforms">
                    <button className="btnTabela" type="button" onClick={() => excluirProfessor(index)}>
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

export default FormProfessores;