import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import TextIcon from '../system/TextIcon'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import InputBase from '@material-ui/core/InputBase'
import InputAdornment from '@material-ui/core/InputAdornment'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withApollo, Mutation } from 'react-apollo'
import { withTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import { UPDATE_USER_MUTATION } from '../../graphql/mutations'
import { GET_USER_DATA } from '../../graphql/queries'
import { CURRENCY } from '../../data/resolvers'

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
    backgroundColor: 'transparent !important',
    '&::before': {
      display: 'none',
    },
  },
  formInput: {
    color: theme.palette.text.primary,
    border: 'none',
  },
  selectIcon: {
    marginRight: theme.spacing(0.75),
  },
  menu: {
    padding: theme.spacing(1),
    backgroundColor: 'transparent',
  },
  loading: {
    pointerEvents: 'none',
    userSelect: 'none'
  },
}))

function CrudFormUpdateUser(props){
  const classes = useStyles(props.theme);

  const inputRef = React.useRef();
  const [editing, setEditing] = React.useState(false);
  const [formValue, setFormValue] = React.useState(props.value);
  const [icon, setIcon] = React.useState(props.icon)
  // handlers
  function editModeOn(){
    setEditing(true);
  }
  function editModeOff(){
    setEditing(false);
    setFormValue(props.client.readQuery({
      query: GET_USER_DATA,
      variables: { id: props.user.id },
    }).User[props.name]);
    inputRef.current.children[0].blur();
  }
  function changeFormValue(e){
    setFormValue(e.target.value);
  }
  const validInput = () => formValue.length > 0 && formValue !== getUserFromCache({id: props.user.id})[props.name];

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
        const updatedUser = {
          ...props.user,
          ...data.updateUser,
        }
        props.client.writeQuery({
          query: GET_USER_DATA,
          data: { User: updatedUser }
        });
        if (props.select) {
          setFormValue(data.updateUser[props.name]);
          setIcon(CURRENCY[data.updateUser[props.name]].icon);
        }
        editModeOff();
        if (data.updateUser.isOptimistic){
          props.setUser(updatedUser);
          props.alerts.notification({
            message: 'Account information updated.',
            color: 'primary',
          });
        }
      }}
    >
      {(updateUser, {data, error, loading})=>{
        if (error) props.alerts.notification({
          message: 'Server error: '+error.message,
          color: 'error',
        });
        const handleSubmit = (e) => {
          const propVal = props.select ? e.currentTarget.value : formValue;
          updateUser({
            variables: {
              id: props.user.id,
              [props.name]: propVal,
            },
            optimisticResponse: {
              __typename: "Mutation",
              updateUser: {
                __typename: "User",
                ...props.user,
                [props.name]: propVal,
                isOptimistic: true,
              }
            },
            refetchQueries: [
              {
                query: GET_USER_DATA,
                variables: { id: props.user.id }
              }
            ]
          });
        };
        const componentProps = props.select ? {
          select: true,
          onChange: handleSubmit,
          classes: { root: classes.inputBase },
          InputProps: {
            disableUnderline: true,
            classes: { root: classes.inputBase },
          },
          SelectProps: {
            native: true,
            ref: inputRef,
            classes: { icon: classes.selectIcon },
            MenuProps: { className: classes.menu },
          }
        } : {
          onChange: changeFormValue,
          disabled: !editing,
          ref: inputRef,
          classes: { root: classes.inputBase, input: classes.formInput },
          endAdornment: editing ? (
            <InputAdornment position='end'>
              <IconButton
                onClick={handleSubmit}
                disabled={loading || !editing || !validInput()}
                className={classes.saveIcon}
              >
                {loading ? <CircularProgress size={24} /> : <SaveIcon />}
              </IconButton>
            </InputAdornment>
          ) : null,
        }
        return (
          <React.Fragment>
            <ListItem className={`${classes.CrudFormUpdateUser_root}${props.className ? ' '+props.className : ''}`}>
              <ListItemAvatar className={classes.icon}>
                {props.textIcon ? <TextIcon icon={icon} /> : props.icon}
              </ListItemAvatar>
              <ListItemText primary={(
                <form className={props.select ? '' : classes.form} onSubmit={(e)=>{
                  e.preventDefault();
                  if (!validInput()) return false;
                  handleSubmit();
                }}>
                  <InputComponent value={formValue} {...componentProps}>
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

  // data helper
  function getUserFromCache(variables){
    return props.client.readQuery({
      query: GET_USER_DATA,
      variables,
    }).User;
  }
}

export default withApollo(withTheme(CrudFormUpdateUser));
