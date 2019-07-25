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
    mui: {
      icon: 'restaurant',
      color: orange[500],
    },
  },
  Shopping: {
    mui: {
      icon: 'shopping_basket',
      color: pink[400],
    },
  },
  Transport: {
    mui: {
      icon: 'train',
      color: amber[600],
    },
  },
  Home: {
    mui: {
      icon: 'home',
      color: brown[400],
    },
  },
  BillsAndFees: {
    mui: {
      icon: 'receipt',
      color: green[600],
    },
  },
  Maintenance: {
    mui: {
      icon: 'build',
      color: blueGrey[500],
    },
  },
  Entertainment: {
    mui: {
      icon: 'videogame_asset',
      color: deepPurple[500],
    },
  },
  Travel: {
    mui: {
      icon: 'airplanemode_active',
      color: lightBlue[500],
    },
  },
  FamilyAndPersonal: {
    mui: {
      icon: 'person',
      color: blue[500],
    },
  },
  Healthcare: {
    mui: {
      icon: 'local_hospital',
      color: red[600],
    },
  },
  Education: {
    mui: {
      icon: 'school',
      color: cyan[500],
    },
  },
  Hobbies: {
    mui: {
      icon: 'palette',
      color: teal[500],
    },
  },
  Gifts: {
    mui: {
      icon: 'cake',
      color: deepOrange[500],
    },
  },
  Work: {
    mui: {
      icon: 'work',
      color: indigo[500],
    },
  },
  Investment: {
    mui: {
      icon: 'monetization_on',
      color: lightGreen[600],
    },
  },
  Other: {
    mui: {
      icon: 'beach_access',
      color: grey[700],
    },
  }
}
