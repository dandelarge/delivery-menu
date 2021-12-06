import { ThemeOptions } from '@mui/material';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#00897b',
    },
    secondary: {
      main: '#ffa726',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'filled'
      }
    },
    MuiStack: {
      defaultProps: {
        spacing: 4
      }
    }
  }
};