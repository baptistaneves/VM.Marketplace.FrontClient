// Notification
const notification = [
  {
    id: '1',
    title: 'Product sold notifications',
    subtitle: 'Send an email when someone purchased one of my products',
    state: true
  },
  {
    id: '2',
    title: 'Product update notifications',
    subtitle: "Send an email when a product I've purchased is updated",
    state: true
  },
  {
    id: '3',
    title: 'Product comment  notifications',
    subtitle: 'Send an email when someone comments on one of my products',
    state: true
  },
  {
    id: '4',
    title: 'Product review  notifications',
    subtitle: 'Send an email when someone leaves a review with their rating',
    state: true
  },
  {
    id: '5',
    title: 'Daily summary emails',
    subtitle: 'Send me a daily summary of all products sold, commented or reviewed',
    state: false
  },
]

// Notification
const paymentcards = [
  {
    id: 1,
    method: 'credit',
    image: 'assets/img/card-visa.png',
    title: 'Visa',
    card_no: '4999',
    card_name: 'John doe',
    expire_date: '08 / 2019',
  },
  {
    id: 2,
    method: 'credit',
    image: 'assets/img/card-master.png',
    title: 'MasterCard',
    card_no: '0015',
    card_name: 'John doe',
    expire_date: '11 / 2021',
  },
  {
    id: 3,
    method: 'paypal',
    image: 'assets/img/card-paypal.png',
    title: 'PayPal',
    card_no: '',
    card_name: '-',
    expire_date: '-',
  },
  {
    id: 4,
    method: 'credit',
    image: 'assets/img/card-visa.png',
    title: 'Visa',
    card_no: '6073',
    card_name: 'John doe',
    expire_date: '09 / 2021',
  },
  {
    id: 5,
    method: 'credit',
    image: 'assets/img/card-visa.png',
    title: 'Visa',
    card_no: '9791',
    card_name: 'John doe',
    expire_date: '05 / 2021',
  },
]

export { notification, paymentcards }