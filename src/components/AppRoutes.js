import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import DataProvider from './data/DataProvider'
import UserHeader from './UserHeader'
import Transactions from './views/transactions/Transactions'
// import Friends from './views/Friends'
// import Timeline from './views/Timeline'
import ComingSoon from './system/ComingSoon'
import NavBottom from './NavBottom'
import AddTransactionModal from './add/AddTransaction'

export default (props) => {
  const styles = {
    view: {
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      padding: 0
    }
  }
  return (
    <Router>
      <UserHeader
        logout={props.logout}
        openAddModal={()=>props.handleAddTransactionModal(true)}
      />
      <Container style={styles.view} maxWidth='md'>
        <Switch>
          <Route path='/transactions' render={() => (
              <DataProvider>
                <Transactions />
              </DataProvider>
            )} />
          <Route path='/friends' component={ComingSoon} />
          <Route path='/timeline' component={ComingSoon} />
          <Route path='/' render={()=><Redirect to='/transactions' />} />
        </Switch>
      </Container>
      <NavBottom />
      <DataProvider>
        <AddTransactionModal
          open={props.state.addTransactionModal}
          handleClose={()=>props.handleAddTransactionModal(false)}
        />
      </DataProvider>
    </Router>
  );
}
