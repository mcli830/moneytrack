import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import InputBase from '@material-ui/core/InputBase'
import InputAdornment from '@material-ui/core/InputAdornment'
import CircularProgress from '@material-ui/core/CircularProgress'
import EmptyIcon from '../system/EmptyIcon'
import { withApollo, Mutation } from 'react-apollo'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import { UPDATE_USER_MUTATION } from '../../graphql/mutations'
import { GET_USER_DATA } from '../../graphql/queries'

const useStyles = makeStyles(theme => ({
  CrudFormUpdateUser_root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(0,3),
    minHeight: theme.spacing(7),
    maxHeight: theme.spacing(7),
  },
  icon: {
    color: theme.palette.grey[400],
  },
  actionIcon: {
    color: theme.palette.grey[500]
  },
  saveIcon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(3),
  },
  form: {
    flex: '1 1 auto',
    paddingRight: theme.spacing(1.5),
  },
  inputBase: {
    width: '100%',
    '&::before': {
      display: 'none',
    }
  },
  formInput: {
    color: theme.palette.text.primary,
    border: 'none',
  },
  menu: {
    padding: theme.spacing(1),
  },
  loading: {
    pointerEvents: 'none',
    userSelect: 'none'
  },
}))

function CrudFormUpdateUser(props){
  const classes = useStyles(useTheme());

  const inputRef = React.useRef();
  const [editing, setEditing] = React.useState(false);
  const [formValue, setFormValue] = React.useState(props.value);
  // handlers
  function editModeOn(){
    setEditing(true);
    setFormValue(props.value);
  }
  function editModeOff(){
    setEditing(false);
  }
  function changeFormValue(e){
    setFormValue(e.target.value);
  }

  React.useEffect(() => {
    if (editing) {
      inputRef.current.children[0].focus();
    }
  }, [editing]);

  const InputComponent = props.select ? TextField : InputBase;

  return (
    <Mutation
      mutation={UPDATE_USER_MUTATION}
      update={(cache, { data })=>{
        cache.writeQuery({
          query: GET_USER_DATA,
          data: {
            User: {
              ...props.user,
              ...data.updateUser.user,
            }
          }
        });
        editModeOff();
      }}
    >
      {(updateUser, {data, error, loading})=>{
        const handleSubmit = () => {
          updateUser({variables: {
            id: props.user.id,
            [props.name]: formValue,
          }});
        };
        return (
          <React.Fragment>
            <ListItem className={`${classes.CrudFormUpdateUser_root}${props.className ? ' '+props.className : ''}`}>
              <ListItemAvatar className={classes.icon}>{props.icon}</ListItemAvatar>
              <ListItemText primary={(
                <form className={props.select ? '' : classes.form} onSubmit={(e)=>{
                  e.preventDefault();
                  if (props.value === formValue) return false;
                  handleSubmit();
                }}>
                  <InputComponent
                    select={props.select}
                    value={formValue}
                    onChange={changeFormValue}
                    disabled={!props.select && !editing}
                    ref={props.select ? null : inputRef}
                    classes={{
                      root: classes.inputBase,
                      input: classes.formInput,
                    }}
                    InputProps={props.select ? {
                      disableUnderline: true,
                    } : null}
                    SelectProps={props.select ? {
                      native: true,
                    } : null}
                    endAdornment={!props.select && editing ? (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={handleSubmit}
                          disabled={loading || !editing || props.value === formValue}
                          className={classes.saveIcon}
                        >
                          {loading ? <CircularProgress size={24} /> : <SaveIcon />}
                        </IconButton>
                      </InputAdornment>
                    ) : null}
                  >
                    {props.select && props.options.map(op => (
                      <option key={op.value} value={op.value}>
                        {op.label}
                      </option>
                    ))}
                  </InputComponent>
                </form>
              )} />
              {!props.select && (
                <ListItemSecondaryAction>
                  <IconButton onClick={editing ? editModeOff : editModeOn} className={classes.actionIcon}>
                    {editing ? <CancelIcon /> : <EditIcon />}
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
            <Divider light />
          </React.Fragment>
        );
      }}
    </Mutation>
  );
}

export default withApollo(CrudFormUpdateUser);
