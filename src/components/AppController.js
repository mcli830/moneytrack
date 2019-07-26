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
import TransactionModal from './modal/transaction/TransactionModal'

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
      <DataProvider>
        <UserHeader
          logout={props.logout}
          openTransactionModal={()=>props.handlers.openTransactionModal('create')}
        />
      </DataProvider>
      <Container style={styles.view} maxWidth='sm'>
        <Switch>
          <Route path='/transactions' render={() => (
              <DataProvider>
                <Transactions
                  lastPage={props.locals.lastPage}
                  setPage={p=>props.setLocals({lastPage: p})}
                  updateTransactionModal={id=>props.handlers.openTransactionModal('update', {id})}
                />
              </DataProvider>
            )} />
          <Route path='/friends' component={ComingSoon} />
          <Route path='/timeline' component={ComingSoon} />
          <Route path='/' render={()=><Redirect to='/transactions' />} />
        </Switch>
      </Container>
      <NavBottom />
      <DataProvider>
        <TransactionModal
          open={props.state.modals.transaction.isOpen}
          crud={props.state.modals.transaction.crud}
          currentId={props.state.modals.transaction.currentId}
          handleClose={()=>props.handlers.openTransactionModal('')}
        />
      </DataProvider>
    </Router>
  );
}