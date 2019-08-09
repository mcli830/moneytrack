import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import UserHeader from './UserHeader'
import Account from './views/account/Account'
import Transactions from './views/transactions/Transactions'
import Summary from './views/summary/Summary'
// import Friends from './views/Friends'
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
      <UserHeader
        data={props.data}
        openTransactionModal={()=>props.handlers.openTransactionModal('create')}
        setAccountSlide={setAccountSlide}
      />
    );
  }
  function renderView(){
    return (
      <Container style={styles.view} maxWidth='sm'>
        <Switch>
          <Route path='/transactions' render={() => (
            <Transactions
              data={props.data}
              lastPage={props.locals.lastPage}
              setPage={p=>props.setLocals({lastPage: p})}
              updateTransactionModal={id=>props.handlers.openTransactionModal('update', {id})}
            />
          )} />
          <Route path='/friends' component={ComingSoon} />
          <Route path='/summary' render={()=> (
            <Summary
              data={props.data}
              lastPage={props.locals.lastPage}
              setPage={p=>props.setLocals({lastPage: p})}
            />
          )} />
          <Route path='/account' render={routeProps=>(
            <Account slide={accountSlide} user={props.data.user} logout={props.logout} alerts={props.alerts} />
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
          case '/summary':
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
      <TransactionModal
        data={props.data}
        alerts={props.alerts}
        open={props.state.modals.transaction.isOpen}
        crud={props.state.modals.transaction.crud}
        currentId={props.state.modals.transaction.currentId}
        handleClose={()=>props.handlers.openTransactionModal('')}
      />
    );
  }
}

export default AppController;
