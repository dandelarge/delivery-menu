import React, { useEffect, useState }from 'react';
import { Button, Typography } from '@mui/material';
import { useAuth } from './App';
import { client } from './api-client';
import { useNavigate } from 'react-router-dom';

export function Users() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    client.get('users').then( ({data}) => {
      setUsers(data);
    });
  }, []);

  useEffect(() => {
    setUserId(auth.userId || '');
    setUserName(auth.userName || '');
  }, [auth.userId, auth.userName]);

  return (<>

    <Typography variant="h2">Users!</Typography>
    {users.map( ({id, name, role}) => <pre key={id}>{JSON.stringify({id, name, role},null,2)}</pre>)}
  </>);
}