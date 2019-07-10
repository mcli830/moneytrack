import React from 'react';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import AppHeader from '../AppHeader';

function OutlinedTextField(props){
  return (
    <TextField
      variant='outlined'
      margin='normal'
      fullWidth
      style={{width:'100%'}}
      {...props}
    />
  )
}

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      view: 'login'
    };
    this.handleTabs = this.handleTabs.bind(this);
  }

  // allow MUI TextField labels to render before setting view
  // prevents bug: label underlay not removing outline segment on shrink
  // for TextFields that initialize with style{display:none}
  componentDidMount(){
    setTimeout(()=>this.setState({ loading: false }), 50);
  }

  _loginForm(styles) {
    return (
      <form id='form-login' style={styles.login}>
        <OutlinedTextField
          id='login-user'
          label='Username or Email'
        />
        <OutlinedTextField
          id='login-pw'
          label='Password'
          type='password'
        />
        <div style={styles.submitContainer}>
          <Button
            id='login-submit'
            variant='contained'
            color='primary'
            style={styles.submitButton}
          >Login</Button>
        </div>
      </form>
    );
  }

  _signupForm(styles) {
    return (
      <form id='form-signup' style={styles.signup}>
        <OutlinedTextField
          id='signup-email'
          label='Email *'
          type='email'
        />
        <OutlinedTextField
          id='signup-username'
          label='Username *'
        />
        <OutlinedTextField
          id='signup-name'
          label='Full Name'
        />
        <OutlinedTextField
          id='signup-pw'
          label='Password *'
          type='password'
        />
        <OutlinedTextField
          id='signup-pw_confirm'
          label='Password Confirmation *'
          type='password'
        />
        <div style={styles.submitContainer}>
          <Button
            id='signup-submit'
            variant='contained'
            color='primary'
            style={styles.submitButton}
          >Sign Up</Button>
        </div>
    </form>
    );
  }

  handleTabs(evt, newVal){
    this.setState({ view: newVal });
  }

  render(){
    const styles = {
      root: {
        flex: '1 1 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '5vw'
      },
      paper: {
        width: 400,
        maxWidth: '90vw',
        height: 'auto',
        opacity: this.state.loading ? 0 : 1,
        transition: 'opacity 250ms'
      },
      formWrapper: {
        padding: '1em 2em'
      },
      login: {
        display: this.state.view === 'login' || this.state.loading ? 'block' : 'none'
      },
      signup: {
        display: this.state.view === 'signup' || this.state.loading ? 'block' : 'none'
      },
      submitContainer: {
        display: 'block',
        textAlign: 'center',
        padding: '1em 0'
      },
      submitButton: {
        width: '100%'
      }
    }
    return(
      <React.Fragment>
        <AppHeader />
        <div className='Login' style={styles.root}>
          <Paper style={styles.paper}>
            <Tabs
              value={this.state.view}
              variant='fullWidth'
              onChange={this.handleTabs}
              indicatorColor='secondary'
              textColor='secondary'
              centered
            >
              <Tab value='login' label='Login' />
              <Tab value='signup' label='Sign Up' />
            </Tabs>
            <div style={styles.formWrapper}>
              {this._loginForm(styles)}
              {this._signupForm(styles)}
            </div>
          </Paper>
        </div>
      </React.Fragment>
    )
  }
}

export default Login;
