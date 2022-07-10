import React, { useState, useEffect } from 'react';
import './styles.css'

import { Card } from '../../components/Card'

export function Home() {
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: ' '});

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent]); // prevState => usado pra sempre recuperar o conteudo anterior em um novo estado
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/pedro-hen') // pegando dados da api publica do github
      const data = await response.json();
      //console.log("DADOS ==> ", data)
        setUser({
          name: data.name,
          avatar: data.avatar_url
        });
    }

    fetchData();

  }, [])

  return (
    <div className="container">
    <header>
    <h1>Lista de Presença</h1>
    <div>
      <strong>{user.name}</strong>
      <img src={user.avatar} alt="Foto de perfil" />
    </div>
    </header>

    <input 
      type="text" 
      placeholder="Digite o nome..." 
      onChange={e => setStudentName(e.target.value)} // função para resgatar os valores digitados
    />

    <button type="button" onClick={handleAddStudent} /** funcão para aciciona um novo estudante na lista */> 
      Adicionar
    </button> 

    {
      students.map(student => (
        <Card 
          key={student.time}
          name={student.name} 
          time={student.time}
        />
      ))
    }
    </div>
  )
}
