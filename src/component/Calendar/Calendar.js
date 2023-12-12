import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "../../assets/css/Calendar.css";

function Calendar() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const diasSemanaFormMateria = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getIndexOfDiaSemana = (diaSemana) => {
    return diasSemanaFormMateria.indexOf(diaSemana) - 1;
  };

  const [materias, setMaterias] = useState([]);
  useEffect(() => {
    const storedMaterias = JSON.parse(localStorage.getItem("materia")) || [];
    setMaterias(storedMaterias);

    return () => {};
  }, []);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const events = {};

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const endDay = lastDay.getDate();

    const days = [];
    let currentWeek = [];

    for (let i = 0; i < startDay; i++) {
      currentWeek.push("");
    }

    for (let day = 1; day <= endDay; day++) {
      const currentDate = new Date(year, month, day);
      currentWeek.push(
        `${year}-${(month + 1).toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`
      );
      if (currentWeek.length === 7) {
        days.push([...currentWeek]);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push("");
      }
      days.push([...currentWeek]);
    }
    return days;
  };

  getDaysInMonth(currentDate).forEach((week) => {
    week.forEach((currentDateString) => {
      const currentDate = new Date(currentDateString);
      const diaSemana = daysOfWeek[currentDate.getDay()];

      if (!events[diaSemana]) {
        events[diaSemana] = [];
      }

      materias.forEach((materia) => {
        const diaSemanaMateria = materia.diaSemanaMateria;

        if (diaSemana === diaSemanaMateria) {
          if (!events[diaSemana].some((event) => event.id === materia.id)) {
            events[diaSemana].push(materia);
          }
        }
      });
    });
  });

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleCellClick = (e) => {
    const cell = e.target;
    cell.classList.add("cell-clicked");

    // Remover a classe após a animação
    setTimeout(() => {
      cell.classList.remove("cell-clicked");
    }, 300); // Ajuste o valor conforme a duração da animação
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <table className="calendar-table">
        <thead>
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>

        <tbody className="calendarHome">
          {getDaysInMonth(currentDate).map((week, rowIndex) => (
            <tr key={rowIndex}>
              {week.map((day, colIndex) => {
                const dayDate = new Date(day);

                // Filtra as matérias agendadas para o dia atual
                const materiasDoDia = materias.filter((materia) => {
                  const dataInicio = new Date(materia.dataInicioMateria);
                  const dataFim = new Date(materia.dataFimMateria);
                  const diaSemanaCalendario = dayDate.getDay();
                  const diaSemanaMateria = getIndexOfDiaSemana(
                    materia.diaSemanaMateria
                  );

                  return (
                    dayDate >= dataInicio &&
                    dayDate <= dataFim &&
                    diaSemanaCalendario === diaSemanaMateria
                  );
                });

                return (
                  <td
                    key={colIndex}
                    onClick={() =>
                      handleDayClick(`${format(currentDate, "yyyy-MM")}-${day}`)
                    }
                  >
                    <div className="dayContainer">{day}</div>

                    {materiasDoDia.length > 0 && (
                      <div className="materiasContainer">
                        {materiasDoDia.map((materia, index) => (
                          <div className="materias" key={index}>
                            {"-"} {"  "}
                            {materia.horarioMateria} - {materia.periodoMateria}{" "}
                            - {materia.professorMateria} - {materia.salaMateria}
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;