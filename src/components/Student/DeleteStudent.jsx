import React from 'react';
import axios from 'axios';
import { Button, Container, Typography } from '@mui/material';

const DeleteStudent = ({ match }) => {
  const handleDelete = () => {
    axios.delete(`/api/studenci/${match.params.studentId}`)
      .catch(error => console.error(`Error: ${error}`));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Usuń studenta
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Usuń
      </Button>
    </Container>
  );
}

export default DeleteStudent;
