import React, { useEffect, useState, useRef } from 'react'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

function Chat() {
	const [stompClient, setStompClient] = useState(null)
	const [msg, setMsg] = useState([])
	const [text, setText] = useState('')
	const messagesEndRef = useRef(null)
	const userJson = localStorage.getItem('user')
	const user = JSON.parse(userJson)
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(scrollToBottom, [msg])

	useEffect(() => {
		const token = localStorage.getItem('token')
		axios
			.get('http://localhost:8080/api/chat', {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setMsg(response.data)
			})
			.catch((err) => {
				console.error(err)
			})
		const socket = new SockJS('http://localhost:8080/ws')
		const stompClient = Stomp.over(socket)
		stompClient.connect({}, function (frame) {
			stompClient.subscribe('/topic/public', function (greeting) {
				const newMessage = JSON.parse(greeting.body)
				newMessage.messageId = msg.length + 1
				setMsg((msg) => [...msg, newMessage])
			})
		})

		setStompClient(stompClient)
	}, [])

	const sendMessage = () => {
		if (stompClient && stompClient.connected) {
			stompClient.send(
				'/app/chat.sendMessage',
				{},
				JSON.stringify({ content: text, sender: user.imie + user.nazwisko, type: 'CHAT' })
			)
			setText('')
		} else {
			console.error('STOMP connection is not active')
		}
	}
	function stringToColor(string) {
		let hash = 0
		for (let i = 0; i < string.length; i++) {
			hash = string.charCodeAt(i) + ((hash << 5) - hash)
		}
		let color = '#'
		for (let i = 0; i < 3; i++) {
			let value = (hash >> (i * 8)) & 0xff
			color += ('00' + value.toString(16)).substr(-2)
		}
		return color
	}
	return (
		<>
			<Navbar />

			<div>
				<div style={{ width: '100%', height: '80vh' }}>
					<Paper style={{ margin: '1em', padding: '1em' }}>
						<Typography variant='h4' component='h2'>
							Chat Room
						</Typography>
						<div style={{ height: '70vh', overflowY: 'auto' }}>
							{msg.map((m, i) => (
								<div
									key={m.messageId}
									style={{ margin: '1em 0', textAlign: m.sender === user.imie + user.nazwisko ? 'right' : 'left' }}>
									<Typography
										variant='subtitle1'
										component='h2'
										style={{ fontWeight: 'bold', color: stringToColor(m.sender) }}>
										{m.sender}
									</Typography>
									<div
										key={m.i}
										style={{
											display: 'inline-block',
											backgroundColor: m.sender === user.imie + user.nazwisko ? '#1976d2' : '#8e24aa',
											borderRadius: '15px',
											boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
											maxWidth: '80%',
										}}>
										<Typography variant='body1' component='p' style={{ color: 'white', padding: '0.5em' }}>
											{m.content}
										</Typography>
									</div>
								</div>
							))}
							<div ref={messagesEndRef} />
						</div>
					</Paper>
				</div>
				<TextField
					style={{ width: '80%' }}
					value={text}
					onChange={(e) => setText(e.target.value)}
					type='text'
					placeholder='Type a message'
				/>
				<Button style={{ width: '20%' }} onClick={sendMessage} variant='contained' color='primary'>
					Send
				</Button>
			</div>
		</>
	)
}

export default Chat
