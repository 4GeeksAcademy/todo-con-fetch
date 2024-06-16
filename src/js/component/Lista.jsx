import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const Lista = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	// Function to handle adding a new ToDo
	const addToDo = async () => {
		if (inputValue.trim() === "") return;

		const toDo = {
			"label": inputValue,
			"is_done": false
		};

		try {
			const response = await fetch("https://playground.4geeks.com/todo/todos/JoseDD", {
				method: "POST",
				headers: {
					accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(toDo)
			});

			if (!response.ok) {
				throw new Error("Error creating ToDo");
			}

			const data = await response.json();
			setTodos([...todos, { id: data.id, label: inputValue, is_done: false }]);
			setInputValue("");
			console.log("Todo creado con id:", data.id);
		} catch (error) {
			console.log("Algo salio mal", error);
		}
	};

	// Function to handle deleting a ToDo
	const deleteToDo = async (id) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE",
				headers: {
					accept: "application/json"
				}
			});

			if (!response.ok) {
				throw new Error("Error deleting ToDo");
			}

			setTodos(todos.filter(todo => todo.id !== id));
			console.log("Todo deleted with ID:", id);
		} catch (error) {
			console.log(error);
		}
	};
	const deleteUser =async()=>{
		try {
			const response= await fetch("https://playground.4geeks.com/todo/users/JoseDD",{
				method: "DELETE",
				headers:{
					accept: "application/json"
				},
				
			});

			
			const data = await response.json();
			console.log("usuario eliminado", data); 
			
		} catch (error) {
			console.log(error)
			
		}

	}

	// Function to create a new user
	const createUser = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/JoseDD", {
				method: "POST",
				headers: {
					accept: "application/json"
				},
				body: ""
			});

			if (!response.ok) {
				throw new Error("El nombre no es válido o ya existe, prueba otro");
			}

			const data = await response.json();
			console.log("Usuario creado", data);
		} catch (error) {
			console.log(error);
		}
	};

	// Function to delete all ToDos
	const eliminarAllToDo = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/JoseDD", {
				method: "DELETE",
				headers: {
					accept: "application/json",
				}
			});

			if (!response.ok) {
				throw new Error("Error deleting all ToDos");
			}

			await createUser();
			setTodos([]);
			console.log("Tareas eliminadas");
		} catch (error) {
			console.log(error);
		}
	};

	// Function to update a ToDo's status
	const updateToDoStatus = async (id, isDone) => {
		const toDo = todos.find(todo => todo.id === id);
		const updatedToDo = { ...toDo, is_done: isDone };

		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "PUT",
				headers: {
					accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(updatedToDo)
			});

			if (!response.ok) {
				throw new Error("Error updating ToDo status");
			}

			const result = await response.json();
			setTodos(todos.map(todo => (todo.id === id ? result : todo)));
			console.log("Todo updated:", result);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container mt-5 p-5 bg-dark align-item-center col-6 border rounded-4">
			<ul className="list-group">
				<h1 className="text-center text-white"onChange={createUser.data}>To Do List</h1>
				<li className="list-group-item p-3 rounded">
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyPress={(e) => {
							if (e.key === "Enter" && inputValue.trim() !== "") {
								addToDo();
							}
						}}
						className="border w-100 rounded-3"
						placeholder="¿Qué necesitas hacer?"
					/>
				</li>
				{todos.map((todo, index) => (
					<li key={todo.id} className="list-group-item p-3 d-flex justify-content-between align-items-center">
						<div>
							<input
								type="checkbox"
								checked={todo.is_done}
								onChange={(e) => updateToDoStatus(todo.id, e.target.checked)}
								className="me-2"
							/>
							{todo.label}
						</div>
						<FaTimes
							className="delete-icon"
							onClick={() => deleteToDo(todo.id)}
						/>
					</li>
				))}
				<div className="div p-1 text-white">{todos.length} Items left</div>
				<div className="container d-flex justify-content-center">
					<button type="button" className="btn btn-outline-info me-2" onClick={() => createUser()}>Crear USUARIO</button>
					<button type="button" className="btn btn-outline-danger me-2" onClick={() => eliminarAllToDo()}>Eliminar tareas</button>
					<button type="button" className="btn btn-outline-danger" onClick={() => deleteUser()}>Eliminar Usuario</button>
				</div>
			</ul>
		</div>
	);
};

export default Lista;