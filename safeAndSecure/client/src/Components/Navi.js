//Imports
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

//colour theme
const theme = createMuiTheme({
  palette: {
    primary: {main: '#6200ea'},
    secondary: {main: '#ffffff'}
  },
});

//navbar component
class Navi extends Component {
  render() {
    return (
      <div>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography component={'span'} fontSize= "18" color="secondary">
              SecureAndSafe
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      </div>
    );
  }
}

//export
export default Navi;