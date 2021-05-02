//modified version of the sign in example from Material UI
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './../App.css';
import axios from 'axios';
import {Redirect, Route} from 'react-router-dom';

//Colour theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6200ea'
    },
    secondary: {
      main: '#ffffff'
    },
  },
});

//styling classes for components
const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      eUser:"",
      ePass:"",
      goodLogin:false
    }
  }
  
  //get data from db about users
  componentDidMount() {
    axios.get('http://localhost:5000/users')
    .then(response => {
      if (response.data) {
        console.log('did mount')
        this.setState({users: response.data})
      }
    })
    .catch(error => {console.log(error)})
  };

  //change values based on what was entered
  setUser=(event)=>{this.setState({eUser: event.target.value});};
  setPass=(event)=>{this.setState({ePass: event.target.value});};

  //function for determining whether the submission is good or ont
  submitVals=(usernames,passwords,eUser,ePass)=>{
    for(let i = 0; i<usernames.length;i++)
      {
        if(eUser === usernames[i] && ePass === passwords[i])
          this.setState({goodLogin: true});
      }
    }
  render() {
  //get the data ready to check if entered username and password exist
  let usernames = [];
  let passwords = [];
  this.state.users.map(({username})=>(usernames.push(username)));
  this.state.users.map(({password})=>(passwords.push(password)));
  const { classes } = this.props;
    return (
      <div className="login">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <ThemeProvider theme={theme}>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Username"
                label="Username"
                name="Username"
                autoComplete="Username"
                autoFocus
                onChange={this.setUser}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.setPass}
              />
              <Button
                fullWidth
                variant="contained"
                color='primary'
                onClick={()=>this.submitVals(usernames,passwords,this.state.eUser,this.state.ePass)}>
                Sign In
              </Button>
            </form>
          </div>
          <Box mt={8}></Box>
          {/*If the user entered a correct credentials move to the correct route*/}
          <Route exact path="/Login">
            {this.state.goodLogin? <Redirect to="/Panel" /> : null}
          </Route>
          </ThemeProvider>
        </Container>
      </div>
    );
  }
}

//export the component
export default withStyles(styles)(Login);
