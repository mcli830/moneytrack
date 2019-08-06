import React from 'react'
import PropTypes from 'prop-types'
import Modal from '@material-ui/core/Modal'
import Slide from '@material-ui/core/Slide'
import Container from '@material-ui/core/Container'
import TransactionModalHeader from './TransactionModalHeader'
import TransactionModalContent from './TransactionModalContent'
import CrudButtonCreateTransaction from '../../crud/CrudButtonCreateTransaction'
import CrudButtonUpdateTransaction from '../../crud/CrudButtonUpdateTransaction'
import CrudButtonDeleteTransaction from '../../crud/CrudButtonDeleteTransaction'
import withAlerts from '../../system/withAlerts'
import { withTheme } from '@material-ui/core/styles'
import { CURRENCY, resolveCurrencyValue, CATEGORY } from '../../../data/resolvers'


// state handling
function newState() {
  return {
    data: {
      category: '',
      amount: '',
      date: new Date(new Date().toDateString()),
      description: '',
      note: ''
    },
    popover: null
  };
}

// Component
class TransactionModal extends React.Component {
  // data state
  state = newState();
  popoverAnchorRef = React.createRef();
  submitButtonRef = React.createRef();
  // data actions
  changeCategory = category => this.setState({...this.state, data: { ...this.state.data, category }});
  changeDate = date => this.setState({...this.state, data: {...this.state.data, date }});
  changeAmount = e => this.setState({...this.state, data: {...this.state.data, amount: e.target.value }});
  changeDescription = e => this.setState({...this.state, data: {...this.state.data, description: e.target.value }});
  changeNote = e => this.setState({...this.state, data: {...this.state.data, note: e.target.value }});
  setPopoverAnchor = anchor => this.setState({popover: anchor});
  // state validation
  valid = {
    category: () => Object.keys(CATEGORY).includes(this.state.data.category),
    amount: () => {
      const val = this.state.data.amount;
      if (val.length < 1) return false;
      if (/[^0-9.]/g.test(val)) return false;
      if (val.split('').filter(c => c === '.').length > 1) return false;
      const di = this.state.data.amount.indexOf('.');
      return di < 0 ? true : val.length - di <= 3;
    },
    description: () => this.state.data.description !== '',
    note: () => this.state.data.note !== '',
  }
  // erase data and close modal
  closeModal = () => {
    this.setState(newState());
    this.props.handleClose();
  }

  // key listener
  handleKeyDown = e => {
    if (e.which === 13 || e.keyCode === 13) {
      this.submitButtonRef.current.click();
    }
  }

  // get individual transaction data for modal if crud=update
  getTransactionData = () => {
    const t = this.props.data.user.transactions.find(t => t.id === this.props.currentId);
    const result = {
      ...t,
      date: new Date(t.date),
      amount: resolveCurrencyValue(t.amount, CURRENCY[this.props.data.user.currency].decimal)
    }
    return result;
  }
  // get color of modal depending on crud action
  getCrudColor = () => {
    return this.props.crud === 'update' ? 'primary' : 'secondary'
  }

  // validate amount from string to number
  validateAmount = (amt) => {
    var v = typeof amt === 'number' ? amt.toString() : amt;
    return parseInt(v*Math.pow(10,CURRENCY[this.props.data.user.currency].decimal), 10);
  }

  // internal renderers
  renderActionButton = () => {
    const modalData = {
      ...this.state.data,
      amount: this.validateAmount(this.state.data.amount),
    }
    switch(this.props.crud){
      case 'create':
        return (
          <CrudButtonCreateTransaction
            creatorId={this.props.data.user.id}
            createData={modalData}
            closeModal={this.closeModal}
            valid={this.valid}
            crudColor={this.getCrudColor()}
            alerts={this.props.alerts}
            buttonRef={this.submitButtonRef}
          />
        );
      case 'update':
        return (
          <CrudButtonUpdateTransaction
            transactionId={this.props.currentId}
            updateData={modalData}
            closeModal={this.closeModal}
            valid={this.valid}
            crudColor={this.getCrudColor()}
            alerts={this.props.alerts}
            buttonRef={this.submitButtonRef}
          />
        );
      default:
        return null;
    }
  }
  // render delete button
  renderDeleteButton = () => {
    return (
      <CrudButtonDeleteTransaction
        transactionId={this.props.currentId}
        closeModal={this.closeModal}
        alerts={this.props.alerts}
      />
    );
  }

  componentDidUpdate(prevProps, prevState){
    if (!prevProps.open && this.props.open) {
      if (this.props.crud === 'update'){
        this.setState({ data: this.getTransactionData() })
      } else {
        setTimeout(()=>{
          if (!this.valid.category()) this.setState({popover: this.popoverAnchorRef.current});
        }, 500)
      }
    }
  }

  // render
  render (){
    const smallDevice = window.innerWidth <= 600  ;
    const styles = {
      modal: {
        display: 'flex',
        alignItems: 'center',
      },
      container: {
        backgroundColor: '#fff',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        height: smallDevice ? '100%' : 'auto',
        minHeight: smallDevice ? 'none' : '60%',
        maxHeight: smallDevice ? '100%' : `90%`,
      },
    }

    return (
      <Modal
        open={this.props.open}
        onClose={this.closeModal}
        style={styles.modal}
        disableAutoFocus
        hideBackdrop={smallDevice}
        keepMounted
      >
        <Slide direction='up' in={this.props.open}>
          <Container maxWidth='sm' style={styles.container} onKeyDown={this.handleKeyDown}>
            <TransactionModalHeader
              crud={this.props.crud}
              crudColor={this.getCrudColor()}
              closeModal={this.closeModal}
              category={{
                value: this.state.data.category,
                handler: this.changeCategory,
                valid: this.valid.category,
              }}
              amount={{
                value: this.state.data.amount,
                handler: this.changeAmount,
                valid: this.valid.amount,
              }}
              currency={this.props.data.user.currency}
              popover={{
                anchorRef: this.popoverAnchorRef,
                anchorEl: this.state.popover,
                setAnchorEl: this.setPopoverAnchor,
              }}
              deleteButton={this.renderDeleteButton()}
            />
            <TransactionModalContent
              crud={this.props.crud}
              crudColor={this.getCrudColor()}
              date={{
                value: this.state.data.date,
                handler: this.changeDate,
              }}
              description={{
                value: this.state.data.description,
                handler: this.changeDescription,
                valid: this.valid.description,
              }}
              note={{
                value: this.state.data.note,
                handler: this.changeNote,
                valid: this.valid.note,
              }}
            />
            {this.renderActionButton()}
          </Container>
        </Slide>
      </Modal>
    );
  }
}

TransactionModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  crud: PropTypes.string,
  data: (props, propName) => {
    if (props['crud'] === 'update' && (props[propName] === undefined || typeof(props[propName]) != 'object')){
      return new Error('Update operations require initial data to be provided via data this.props.')
    }
  },
}

TransactionModal.defaultProps = {
  open: false,
  data: {},
}

export default withTheme(withAlerts(TransactionModal));
