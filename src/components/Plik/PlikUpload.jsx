import React, { useState } from 'react'
import axios from 'axios'
import { Button, Box, Typography, Drawer, IconButton } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const PlikUpload = ({ projektId }) => {
	const [selectedFile, setSelectedFile] = useState(null)
	const [uploadStatus, setUploadStatus] = useState('')
	const [drawerOpen, setDrawerOpen] = useState(false)

	const onFileChange = event => {
		setSelectedFile(event.target.files[0])
	}

	const onFileUpload = async () => {
		const formData = new FormData()
		formData.append('file', selectedFile, selectedFile.name)
		formData.append('projektId', projektId)

		const token = localStorage.getItem('token')

		try {
			const res = await axios.post(`http://localhost:8080/api/uploadFile`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			})
			console.log(res.data)
			setUploadStatus('Plik został przesłany pomyślnie.')
			setDrawerOpen(false)
		} catch (error) {
			setUploadStatus('Wystąpił błąd podczas przesyłania pliku.')
		}
	}

	return (
		<Box sx={{ mt: 2 }}>
			<IconButton onClick={() => setDrawerOpen(true)}>
				<CloudUploadIcon />
			</IconButton>
			<Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
				<Box sx={{ mt: 2, width: 250, p: 2 }}>
					<Typography variant="h6">Prześlij plik:</Typography>
					<input type="file" onChange={onFileChange} />
					<Button
						variant="contained"
						color="primary"
						startIcon={<CloudUploadIcon />}
						onClick={onFileUpload}
						disabled={!selectedFile}
						sx={{ mt: 2 }}>
						Prześlij
					</Button>
					{uploadStatus && (
						<Typography variant="caption" color="textSecondary">
							{uploadStatus}
						</Typography>
					)}
				</Box>
			</Drawer>
		</Box>
	)
}

export default PlikUpload
