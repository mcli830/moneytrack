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

export const resolveCurrencyValue = function(amt, dec){
  var n = typeof amt === 'string' ? parseInt(amt, 10) : amt;
  if (dec < 1) return n.toString();
  return parseFloat(n*Math.pow(10,dec*-1)).toFixed(dec);
}

export const CURRENCY = {
  "USD": {
    abbr: 'USD',
    name: 'United States dollar',
    symbol: '$',
    icon: '$',
    decimal: 2,
  },
  "EUR": {
    abbr: 'EUR',
    name: 'Euro',
    symbol: '€',
    icon: '€',
    decimal: 2,
  },
  "JPY": {
    abbr: 'JPY',
    name: 'Japanese yen',
    symbol: '¥',
    icon: '¥',
    decimal: 0,
  },
  "GBP": {
    abbr: 'GBP',
    name: 'British pound sterling',
    symbol: '£',
    icon: '£',
    decimal: 2,
  },
  "AUD": {
    abbr: 'AUD',
    name: 'Australian dollar',
    symbol: 'AU$',
    icon: '$',
    decimal: 2,
  },
  "CAD": {
    abbr: 'CAD',
    name: 'Canadian dollar',
    symbol: 'CA$',
    icon: '$',
    decimal: 2,
  },
  "CHF": {
    abbr: 'CHF',
    name: 'Swiss franc',
    symbol: 'Fr.',
    icon: 'Fr',
    decimal: 2,
  },
  "CNH": {
    abbr: 'CNH',
    name: 'Chinese renminbi',
    symbol: '元',
    icon: '元',
    decimal: 0,
  },
  "SEK": {
    abbr: 'SEK',
    name: 'Swedish krona',
    symbol: 'kr',
    icon: 'kr',
    decimal: 2,
  },
  "NZD": {
    abbr: 'NZD',
    name: 'New Zealand dollar',
    symbol: '$',
    icon: '$',
    decimal: 2,
  },
  "MXN": {
    abbr: 'MXN',
    name: 'Mexican peso',
    symbol: 'MEX$',
    icon: '$',
    decimal: 2,
  },
  "SGD": {
    abbr: 'SGD',
    name: 'Singaporean dollar',
    symbol: 'S$',
    icon: '$',
    decimal: 2,
  },
  "HKD": {
    abbr: 'HKD',
    name: 'Hong Kong dollar',
    symbol: 'HK$',
    icon: '$',
    decimal: 2,
  },
  "NOK": {
    abbr: 'NOK',
    name: 'Norwegian krone',
    symbol: 'kr',
    icon: 'kr',
    decimal: 2,
  },
  "KRW": {
    abbr: 'KRW',
    name: 'South Korean Won',
    symbol: '₩',
    icon: '₩',
    decimal: 0,
  },
  "TRY": {
    abbr: 'TRY',
    name: 'Turkish lira',
    symbol: '₺',
    icon: '₺',
    decimal: 2,
  },
  "RUB": {
    abbr: 'RUB',
    name: 'Russian ruble',
    symbol: '₽',
    icon: '₽',
    decimal: 2,
  },
  "INR": {
    abbr: 'INR',
    name: 'Indian rupee',
    symbol: '₹',
    icon: '₹',
    decimal: 2,
  },
  "BRL": {
    abbr: 'BRL',
    name: 'Brazilian real',
    symbol: 'R$',
    icon: '$',
    decimal: 2,
  },
  "ZAR": {
    abbr: 'ZAR',
    name: 'South African rand',
    symbol: 'R',
    icon: 'R',
    decimal: 2,
  },
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
