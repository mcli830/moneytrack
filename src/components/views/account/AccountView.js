import React from 'react'
import Slide from '@material-ui/core/Slide'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
// import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
    padding: theme.spacing(2)
  },
  avatar: {

  },
  total: {
    textAlign: 'center'
  }
})

export default (props) => {
  const classes = useStyles();
  return (
    <Slide in direction='right' mountOnEnter unmountOnExit>
      <Container maxWidth='sm' className={classes.root}>
        <Card>
          <CardHeader
            title={props.user.name}
            avatar={
              <Avatar className={classes.avatar}>A</Avatar>
            }
          />
        <CardContent>
          <Typography variant='h2' className={classes.total}>
            ${props.totalSpent}
          </Typography>
        </CardContent>
        </Card>
      </Container>
    </Slide>
  )
}
