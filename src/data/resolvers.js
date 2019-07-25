import orange from '@material-ui/core/colors/orange'
import pink from '@material-ui/core/colors/pink'
import amber from '@material-ui/core/colors/amber'
import brown from '@material-ui/core/colors/brown'
import green from '@material-ui/core/colors/green'
import blueGrey from '@material-ui/core/colors/blueGrey'
import deepPurple from '@material-ui/core/colors/deepPurple'
import lightBlue from '@material-ui/core/colors/lightBlue'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import cyan from '@material-ui/core/colors/cyan'
import teal from '@material-ui/core/colors/teal'
import deepOrange from '@material-ui/core/colors/deepOrange'
import indigo from '@material-ui/core/colors/indigo'
import lightGreen from '@material-ui/core/colors/lightGreen'
import grey from '@material-ui/core/colors/grey'

export const CURRENCY = {
  'USD': '$',
  'EUR': '€',
  'JPY': '¥',
  'GBP': '£',
  'AUD': '$',
}

export const CATEGORY = {
  FoodAndDrink: {
    name: 'FoodAndDrink',
    mui: {
      icon: 'restaurant',
      color: orange[500],
    },
  },
  Shopping: {
    name: 'Shopping',
    mui: {
      icon: 'shopping_basket',
      color: pink[400],
    },
  },
  Transport: {
    name: 'Transport',
    mui: {
      icon: 'train',
      color: amber[600],
    },
  },
  Home: {
    name: 'Home',
    mui: {
      icon: 'home',
      color: brown[400],
    },
  },
  BillsAndFees: {
    name: 'BillsAndFees',
    mui: {
      icon: 'receipt',
      color: green[600],
    },
  },
  Maintenance: {
    name: 'Maintenance',
    mui: {
      icon: 'build',
      color: blueGrey[500],
    },
  },
  Entertainment: {
    name: 'Entertainment',
    mui: {
      icon: 'videogame_asset',
      color: deepPurple[500],
    },
  },
  Travel: {
    name: 'Travel',
    mui: {
      icon: 'airplanemode_active',
      color: lightBlue[500],
    },
  },
  FamilyAndPersonal: {
    name: 'FamilyAndPersonal',
    mui: {
      icon: 'person',
      color: blue[600],
    },
  },
  Healthcare: {
    name: 'Healthcare',
    mui: {
      icon: 'local_hospital',
      color: red[600],
    },
  },
  Education: {
    name: 'Education',
    mui: {
      icon: 'school',
      color: cyan[500],
    },
  },
  Hobbies: {
    name: 'Hobbies',
    mui: {
      icon: 'palette',
      color: teal[500],
    },
  },
  Gifts: {
    name: 'Gifts',
    mui: {
      icon: 'cake',
      color: deepOrange[500],
    },
  },
  Work: {
    name: 'Work',
    mui: {
      icon: 'work',
      color: indigo[500],
    },
  },
  Investment: {
    name: 'Investment',
    mui: {
      icon: 'monetization_on',
      color: lightGreen[600],
    },
  },
  Other: {
    name: 'Other',
    mui: {
      icon: 'beach_access',
      color: grey[700],
    },
  }
}
