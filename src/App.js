import './App.css'
import { Routes, Route } from 'react-router-dom'
import React from 'react'
import LoginComponent from './components/LoginComponent'
import RegisterComponent from './components/RegisterComponent'
import Dashboard from './components/Dashord/Dashboard'
import Profile from './components/Profil/Profile'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import Projekty from './components/Projekty/Projekty'
import Chat from './components/Chat/Chat'
import ProjektDetail from './components/Projekty/ProjektDetail'
import ZadanieDetails from './components/Zadania/ZadanieDetails'
import StudentRestController from './components/Student/StudentRestController'
import StudentList from './components/Student/StudentRestController'
const App = () => {
	return (
		<Routes>
			<Route exec path="/" element={<LoginComponent />} />
			<Route exec path="/login" element={<LoginComponent />}></Route>
			<Route exec path="/dashboard" element={<Dashboard />}></Route>
			<Route exec path="/register" element={<RegisterComponent />}></Route>
			<Route exec path="/profile" element={<Profile />}></Route>
			<Route exec path="/projekty" element={<Projekty />}></Route>
			<Route path="/projekty/:id" exec element={<ProjektDetail />} />
			<Route path="/zadanie/:id" exec element={<ZadanieDetails />} />
			<Route path="/student" exec element={<StudentList />} />
			<Route exec path="/chat" element={<Chat />}></Route>
			<Route exec path="*" element={<NotFoundPage />}></Route>
		</Routes>
	)
}

export default App
