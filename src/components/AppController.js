import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import DataProvider from './data/DataProvider'
import UserHeader from './UserHeader'
import Account from './views/account/Account'
import Transactions from './views/transactions/Transactions'
// import Friends from './views/Friends'
// import Timeline from './views/Timeline'
import ComingSoon from './system/ComingSoon'
import NavBottom from './NavBottom'
import TransactionModal from './modal/transaction/TransactionModal'

function AppController(props) {
  const styles = {
    view: {
      flex: '1 1 auto',
      minHeight: 'calc(100vh - 161px)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      padding: 0
    }
  }

  // state
  const [accountSlide, setAccountSlide] = React.useState({
    in: true,
    timeout: 300,
  });

  return (
    <Router>
      {renderHeader()}
      {renderView()}
      {renderNavBottom()}
      {renderTransactionModal()}
    </Router>
  );

  // render helpers
  function renderHeader(){
    return (
      <DataProvider>
        <UserHeader
          openTransactionModal={()=>props.handlers.openTransactionModal('create')}
          setAccountSlide={setAccountSlide}
        />
      </DataProvider>
    );
  }
  function renderView(){
    return (
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
          <Route path='/account' render={routeProps=>(
            <DataProvider>
              <Account slide={accountSlide} logout={props.logout} />
            </DataProvider>
          )} />
          <Route path='/' render={()=><Redirect to='/transactions' />} />
        </Switch>
      </Container>
    );
  }
  function renderNavBottom(){
    return (
      <Route path='/' render={routeProps => {
        switch(routeProps.location.pathname){
          case '/transactions':
          case '/timeline':
          case '/friends':
            return <NavBottom />;
          case '/account':
          default:
            return null;
        }
      }} />
    );
  }
  function renderTransactionModal(){
    return (
      <DataProvider>
        <TransactionModal
          open={props.state.modals.transaction.isOpen}
          crud={props.state.modals.transaction.crud}
          currentId={props.state.modals.transaction.currentId}
          handleClose={()=>props.handlers.openTransactionModal('')}
        />
      </DataProvider>
    );
  }
}

export default AppController;
