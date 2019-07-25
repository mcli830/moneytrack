import React from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Popover from '@material-ui/core/Popover'
import Grid from '@material-ui/core/Grid'
import InputBase from '@material-ui/core/InputBase'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import { withTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import { CATEGORY } from '../../../data/resolvers'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    transition: `backgroundColor ${theme.transitions.duration.standard}ms`,
    display: 'flex',
    flexDirection: 'column',
    '& *': {
      transition: `color ${theme.transitions.duration.short}ms`,
    },
  },
  data: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  iconWrapper: {
    marginLeft: theme.spacing(3),
    padding: 0,
  },
  iconEmpty: {
    height: theme.typography.h4.fontSize,
    width: theme.typography.h4.fontSize,
    borderRadius: '50%',
    border: `2px dotted ${theme.palette.text.secondary}`
  },
  popoverPaper: {
    backgroundColor: theme.palette.background.default,
  },
  gridContainer: {
    flexGrow: 1,
    maxWidth: theme.breakpoints.values.sm - theme.spacing(6),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  gridItem: {
    width: '25%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryMenuButton: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  categoryMenuText: {
    textAlign: 'center',
    textTransform: 'capitalize',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    marginTop: theme.spacing(1),
  },
  amountWrapper: {
    margin: theme.spacing(0, 3)
  },
  amount: {
    fontSize: theme.typography.h5.fontSize,
    color: theme.palette.text.primary,
    textAlign: 'right',
    padding: 0,
  }
}));

function TransactionModalHeader(props) {
  const classes = useStyles(props.theme);
  const styles = {
    root: {
      backgroundColor: props.category.value ? CATEGORY[props.category.value].mui.color : props.theme.palette.grey[200],
    },
    cancel: {
      color: props.category.value ? props.theme.palette.grey[50] : props.theme.palette.text.secondary,
    },
    iconButton: {
      color: props.category.value ? '#fff' : props.theme.palette.text.primary,
    },
    amountInput: {
      color: props.category.value ? '#fff' : props.theme.palette.text.primary,
    },
    amountCurrency: {
      color: props.category.value ? props.theme.palette.background.default : props.theme.palette.text.secondary,
    }
  }
  // popover state
  const [anchorEl, setAnchorEl] = React.useState(null);
  // handlers
  function openCategoryMenu(e){
    setAnchorEl(e.currentTarget);
  }
  function closeCategoryMenu(){
    setAnchorEl(null);
  }

  return (
    <div className={classes.root} style={styles.root} >
      <div id='modal-controls'>
        <Button onClick={props.closeModal} disableRipple>
          <Typography variant='caption' style={styles.cancel}>
            Cancel
          </Typography>
        </Button>
      </div>
      <div className={classes.data}>
        {renderIconButton()}
        {renderAmountInput()}
      </div>
    </div>
  );

  // internal helpers
  function renderIconButton(){
    return (
      <div className={classes.iconWrapper}>
        <ButtonBase onClick={openCategoryMenu} disableRipple>
          {
            props.category.value
            ? <Icon style={styles.iconButton}>
                {CATEGORY[props.category.value].mui.icon}
              </Icon>
            : <div className={classes.iconEmpty} />
          }
        </ButtonBase>
        {renderCategoryMenuPopover()}
      </div>
    );
  }
  // render hidden popover for icon button
  function renderCategoryMenuPopover(){
    return (
      <Popover
        id={'category-menu'}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closeCategoryMenu}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
        transformOrigin={{ vertical: 'top', horizontal: 'left'}}
        elevation={2}
        PaperProps={{className: classes.popoverPaper}}
      >
        <Container maxWidth='sm' className={classes.gridContainer}>
          <Grid
            container
            justify='center'
            spacing={1}
            className={classes.categoryMenuGrid}
          >
            {chunk(Object.entries(CATEGORY), 4).map((chunk, i) => (
              <CategoryMenuRow key={i} entries={chunk} spacing={1} />
            ))}
          </Grid>
        </Container>
      </Popover>
    );
    // render helper for popover
    function CategoryMenuRow(rowProps){
      return (
        <Grid container item xs={12} spacing={rowProps.spacing}>
          {rowProps.entries.map(([category, { mui }], i) => {
            const label = displayText(category);
            const clickHandler = e => {
              closeCategoryMenu();
              props.category.handler(category);
            }
            return (
              <Grid item xs={3} key={i} className={classes.gridItem}>
                <Button
                  onClick={clickHandler}
                  classes={{
                    label: classes.categoryMenuButton,
                  }}
                  >
                  <Icon size='large' style={{color: mui.color}}>{mui.icon}</Icon>
                  <Typography
                    variant='caption'
                    color='textSecondary'
                    className={classes.categoryMenuText}
                    style={{ fontSize: label.length > 12 ? 9 : 11}}
                    >
                    {label}
                  </Typography>
                </Button>
              </Grid>
            );
          })}
        </Grid>
      );
    }
  }
  // render right side amount input
  function renderAmountInput(){
    return (
      <InputBase
        id='amount'
        value={props.amount.value === 0 ? '' : props.amount.value}
        onChange={props.amount.handler}
        type='number'
        className={classes.amountWrapper}
        inputProps={{
          className: classes.amount,
          placeholder: '0',
          style: styles.amountInput,
        }}
        endAdornment={
          <InputAdornment
            position='end'
          >
            <Typography style={styles.amountCurrency}>
              {props.currency}
            </Typography>
          </InputAdornment>
        }
      />
    );
  }
}

// external helpers
function displayText(str){
  return str.replace(/([A-Z])/g, ' $1').replace(/\sand\s/ig, ' & ').trim();
}
function chunk(arr, size){
  const a = [];
  for(let i=0; i<arr.length; i+=size){
    a.push(arr.slice(i,i+size));
  }
  return a;
}

export default withTheme(TransactionModalHeader);
