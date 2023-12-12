import React, { useState, useEffect } from "react";
import Header from "../../component/Header/Header";
import "../../assets/css/FormCurso.css";

function FormCurso() {
  const [cursos, setCursos] = useState([]);
  const [novoCurso, setNovoCurso] = useState({
    nome: "",
    data: "",
    duracao: "",
    coordenador: "",
  });
  const [cursoEditando, setCursoEditando] = useState(null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const storedCursos = JSON.parse(localStorage.getItem("cursos")) || [];
    setCursos(storedCursos);
  }, []);

  const adicionarCurso = () => {
    try {
      if (
        novoCurso.nome &&
        novoCurso.data &&
        novoCurso.duracao &&
        novoCurso.coordenador
      ) {
        const updatedCursos = [...cursos, { ...novoCurso }];
        setCursos(updatedCursos);
        setNovoCurso({
          nome: "",
          data: "",
          duracao: "",
          coordenador: "",
        });
        localStorage.setItem("cursos", JSON.stringify(updatedCursos));
      } else {
        alert("Preencha todos os campos!");
      }
    } catch (error) {
      console.error("Erro ao adicionar curso", error);
    }
  };

  const preencherCamposDeEdicao = (index) => {
    const cursoParaEditar = cursos[index];
    setCursoEditando(cursoParaEditar);
    setNovoCurso({
      nome: cursoParaEditar.nome,
      data: cursoParaEditar.data,
      duracao: cursoParaEditar.duracao,
      coordenador: cursoParaEditar.coordenador,
    });
    setEditando(true);
  };

  const confirmarEdicao = () => {
    try {
      if (
        novoCurso.nome &&
        novoCurso.data &&
        novoCurso.duracao &&
        novoCurso.coordenador
      ) {
        // Cria uma cópia da lista de cursos
        const cursosAtualizados = [...cursos];
        // Substitui o curso antigo pelo curso editado na lista
        cursosAtualizados[cursos.indexOf(cursoEditando)] = novoCurso;
        // Atualiza o estado da lista de cursos
        setCursos(cursosAtualizados);
        // Limpa os estados relacionados à edição
        setCursoEditando(null);
        setNovoCurso({
          nome: "",
          data: "",
          duracao: "",
          coordenador: "",
        });
        setEditando(false);
        // Atualiza os cursos no localStorage
        localStorage.setItem("cursos", JSON.stringify(cursosAtualizados));
      } else {
        alert("Preencha todos os campos!");
      }
    } catch (error) {
      console.error("Erro ao confirmar edição", error);
    }
  };

  const cancelarEdicao = () => {
    // Limpe os estados após o cancelamento
    setCursoEditando(null);
    setNovoCurso({
      nome: "",
      data: "",
      duracao: "",
      coordenador: "",
    });
    setEditando(false);
  };

  const excluirCurso = (index) => {
    const novosCursos = cursos.filter((curso, i) => i !== index);
    setCursos(novosCursos);
    setCursoEditando(null);
    setNovoCurso({
      nome: "",
      data: "",
      duracao: "",
      coordenador: "",
    });
    setEditando(false);
    localStorage.setItem("cursos", JSON.stringify(novosCursos));
  };
  
  return (
    <>
      <Header />
      <div className="section1FormCursos">
        <h1 className="tituloPagina">Cadastro Curso</h1>
        <div className="conatinerFormCursos">
          <div className="cadastroFormularioCursos">
            <div className="divComboCurso">
              <label className="labelComboCurso">Nome:</label>
              <input
                className="imputComboCurso"
                placeholder="digite nome o curso"
                id="nomeCurso"
                value={novoCurso.nome}
                onChange={(e) =>
                  setNovoCurso({ ...novoCurso, nome: e.target.value })
                }
              />
            </div>
            <div className="divComboCurso">
              <label className="labelComboCurso">Data:</label>
              <input
                className="imputComboCurso"
                placeholder="digite Data o curso"
                id="DataCurso"
                type="date"
                value={novoCurso.data}
                onChange={(e) =>
                  setNovoCurso({ ...novoCurso, data: e.target.value })
                }
              />
            </div>
            <div className="divComboCurso">
              <label className="labelComboCurso">Duração:</label>
              <input
                className="imputComboCurso"
                placeholder="digite Duração o curso"
                id="DuracaoCurso"
                value={novoCurso.duracao}
                onChange={(e) =>
                  setNovoCurso({ ...novoCurso, duracao: e.target.value })
                }
              />
            </div>
            <div className="divComboCurso">
              <label className="labelComboCurso">Nome do Coordenador:</label>
              <input
                className="imputComboCurso"
                placeholder="digite nome do Coordenador do curso"
                id="nomeCoodenadorCurso"
                value={novoCurso.coordenador}
                onChange={(e) =>
                  setNovoCurso({ ...novoCurso, coordenador: e.target.value })
                }
              />
            </div>
            {editando ? (
              <>
                <button type="button" onClick={confirmarEdicao} className="btnEditarCurso">
                  Confirmar Edição
                </button>
                <button type="button" onClick={cancelarEdicao} className="btnCancelarEdicaoCurso" >
                  Cancelar Edição
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={adicionarCurso}
                className="btnSubmitFormCursos"
              >
                Salvar
              </button>
            )}
          </div>
        </div>
        <div className="containerTabelaCursos">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Data</th>
                <th>Duração</th>
                <th>Coordenador</th>
                <th></th>
               <th></th> 
              </tr>
            </thead>
            <tbody>
              {cursos.map((curso, index) => (
                <tr key={index}>
                  <td className="tdforms">{curso.nome}</td>
                  <td className="tdforms">{curso.data}</td>
                  <td className="tdforms">{curso.duracao}</td>
                  <td className="tdforms">{curso.coordenador}</td>
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
                    <button className="btnTabela" type="button" onClick={() => excluirCurso(index)}>
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

export default FormCurso;