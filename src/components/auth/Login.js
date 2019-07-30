import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import withAlerts from '../system/withAlerts'

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
      view: 'login',
      forms: {
        login: {
          email: '',
          password: ''
        },
        signup: {
          email: '',
          name: '',
          password: '',
          password_confirm: ''
        }
      }
    };
    this.handleTabs = this.handleTabs.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
  }

  // allow MUI TextField labels to render before setting view
  // prevents bug: label underlay not removing outline segment on shrink
  // for TextFields that initialize with style{display:none}
  componentDidMount(){
    setTimeout(()=>this.setState({ loading: false }), 50);
  }

  handleInput(e) {
    const keys = e.target.id.split('-')
    this.setState({
      forms: {
        ...this.state.forms,
        [keys[0]]: {
          ...this.state.forms[keys[0]],
          [keys[1]]: e.target.value,
        },
      }
    });
  }

  handleLoginSubmit = async (e) =>{
    e.preventDefault();
    this.props.alerts.notification({
      message: 'Logging in...',
      color: 'primary',
      icon: <CircularProgress size={16} />,
    });
    const {email, password} = this.state.forms.login;
    try {
      const response = await this.props.authenticateUserMutation({variables: {email, password}});
      localStorage.setItem('graphcoolToken', response.data.authenticateUser.token);
      this.props.alerts.notification({
        message: 'Login success!',
        color: 'primary'
      });
      setTimeout(()=>window.location.reload(), 500);
    } catch (err) {
      console.error(err);
      this.props.alerts.notification({
        message: `Login failed. ${err.message}`,
        color: 'error',
      })
    }
  }

  handleSignupSubmit = async (e) => {
    e.preventDefault();
    this.props.alerts.notification({
      message: 'Signing up...',
      color: 'secondary',
      icon: <CircularProgress size={16} />,
    });
    if (this.state.forms.signup.password !== this.state.forms.signup.password_confirm){
      return this.props.alerts.notification({
        message: `Passwords don't match. Please enter your password twice.`,
        color: 'error',
      });
    }
    const {email, username, name, password} = this.state.forms.signup;
    try {
      const response = await this.props.signupUserMutation({variables: {email, password, username, name}});
      localStorage.setItem('graphcoolToken', response.data.signupUser.token);
      this.props.alerts.notification({
        message: 'Signup complete!',
        color: 'secondary',
      });
      setTimeout(()=>window.location.reload(), 500);
    } catch(err){
      console.error(err);
      this.props.alerts.notification({
        message: `Signup failed. ${err.message}`,
        color: 'error',
      })
    }
  }

  _loginForm(styles) {
    return (
      <form id='login' style={styles.login} onSubmit={this.handleLoginSubmit}>
        <OutlinedTextField
          id='login-email'
          label='Email'
          onChange={this.handleInput}
          required
        />
        <OutlinedTextField
          id='login-password'
          label='Password'
          type='password'
          onChange={this.handleInput}
          required
        />
        <div style={styles.submitContainer}>
          <Button
            id='login-submit'
            type='submit'
            variant='contained'
            color='primary'
            className='form-submit'
            style={styles.submitButton}
            onClick={this.handleLoginSubmit}
          >Login</Button>
        </div>
      </form>
    );
  }

  _signupForm(styles) {
    return (
      <form id='signup' style={styles.signup} onSubmit={this.handleSignupSubmit}>
        <OutlinedTextField
          id='signup-email'
          label='Email'
          type='email'
          onChange={this.handleInput}
          required
        />
        <OutlinedTextField
          id='signup-name'
          label='Name'
          onChange={this.handleInput}
        />
        <OutlinedTextField
          id='signup-password'
          label='Password'
          type='password'
          onChange={this.handleInput}
          required
        />
        <OutlinedTextField
          id='signup-password_confirm'
          label='Password Confirmation'
          onChange={this.handleInput}
          type='password'
          required
        />
        <div style={styles.submitContainer}>
          <Button
            id='signup-submit'
            type='submit'
            variant='contained'
            color='primary'
            className='form-submit'
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
    );
  }
}

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation ($email: String!, $password: String!){
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`

const SIGNUP_USER_MUTATION = gql`
  mutation SignupUserMutation ($email: String!, $name: String, $password: String!) {
    signupUser(email: $email, name: $name, password: $password) {
      id
      token
    }
  }
`

export default compose(
  graphql(AUTHENTICATE_USER_MUTATION, {name: 'authenticateUserMutation'}),
  graphql(SIGNUP_USER_MUTATION, {name: 'signupUserMutation'})
)(withAlerts(Login));
