//modified version of the sign in example from Material UI

//imports
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './../App.css';
import axios from 'axios';

//colour theme
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

//style classes for components
const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

//the edit person component (update password and delte account)
class EditPerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
        users: [],
        ePassword:"",
        nPassword:""
    }
}
//get user data
componentDidMount() {
    axios.get('http://localhost:5000/users')
        .then(response => {
            if (response.data) {
                console.log('did mount')
            this.setState({
                users: response.data
          })
        }
    })
    .catch(error => {
        console.log(error)
    })
};
//function for updating the password by ID
updatePassword=(passwords,ids,ePassword,nPassword) => {
  let id = 0;
  for(let i = 0;i<passwords.length;i++)
  {
      if(passwords[i]===ePassword)
          id = ids[i]
  }
  if(id!==0){
    axios.put(`http://localhost:5000/users/${id}`,{password: nPassword});
    window.alert("Your password has been changed");
  }
};

//Function for deleting password by ID
deletePassword=(passwords,ids,ePassword) => {
  let id = 0;
  for(let i = 0;i<passwords.length;i++)
  {
      if(passwords[i]===ePassword)
          id = ids[i]
  }
  if(id!==0)
  {
    axios.delete(`http://localhost:5000/users/${id}`);
    window.location.reload();
  }
};

//change the state values based on user entries
setePass=(event)=>{
  this.setState({ePassword: event.target.value});
};
setnPass=(event)=>{
  this.setState({nPassword: event.target.value});
};
  render() {
    const { classes } = this.props; //to use the above styles
    //prepare data to be used for updating/deleting
    let passwords=[];
    let ids=[];
    this.state.users.map(({_id})=>(ids.push(_id)))
    this.state.users.map(({password})=>(passwords.push(password)))
    return (
      <div>
        {/*Change Password */}
        <div className="edit">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <ThemeProvider theme={theme}>
          <div className={classes.paper}>
            <Typography component={'span'} variant="h5">
              Change Password
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Password"
                label="Password"
                name="Password"
                autoComplete="Password"
                autoFocus
                onChange={this.setePass}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="Password"
                onChange={this.setnPass}
              />
              <Button
                fullWidth
                variant="contained"
                color='primary'
                onClick={()=>this.updatePassword(passwords,ids,this.state.ePassword,this.state.nPassword)}>
                Change Password
              </Button>
            </form>
          </div>
          </ThemeProvider>
        </Container>
      </div>
      <div className="edit"> {/*Delete the accound */}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <ThemeProvider theme={theme}>
          <div className={classes.paper}>
            <Typography component={'span'} variant="h5">
              Delete Account
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="Password"
                onChange={this.setePass}
              />
              <Button
                fullWidth
                variant="outlined"
                color='primary'
                onClick={()=>this.deletePassword(passwords,ids,this.state.ePassword)}>
                Delete
              </Button>
            </form>
          </div>
          </ThemeProvider>
        </Container>
      </div>
    </div>
    );
  }
}

export default withStyles(styles)(EditPerson);
