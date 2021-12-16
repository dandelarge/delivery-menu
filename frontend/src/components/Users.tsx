import React, { useEffect, useState }from 'react';
import { Card, CardContent, List, ListItem, Stack, Typography } from '@mui/material';
import { client } from '../api-client';

export function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    client.get('users').then( ({data}) => {
      setUsers(data);
    });
  }, []);
  return (<>

    <Typography variant="h2">Users!</Typography>
    <List>
      {users.map( ({id, name, role}) => (
        <ListItem key={id}>
          <Card>
            <CardContent>
              <Stack>
                <Typography variant="body1">user id: {id}</Typography>
                <Typography variant="body1">username: {name}</Typography>
                <Typography variant="body1">role: {role}</Typography>
              </Stack>
            </CardContent>
          </Card>
        </ListItem>)
      )}
    </List>

  </>);
}