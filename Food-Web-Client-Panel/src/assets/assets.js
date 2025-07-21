import logo from './logo.png';
import cart from './cart.png';


import pizza from './images/pizza1.jpg';
import burger2 from './images/burger2.jpg';
import momo from './images/momo.png';
import samosa from './images/samosa1.jpeg';
import desert from './images/desert2.jpg';
import iceCream from './images/ice_cream1.jpg';




const assets = {
  logo,
  cart,

};

export default assets;


export const categories = [
  {
    category: 'Pizza',
    image: pizza,
  }
  ,
  {
    category: 'Burger',
    image: burger2,
  },

  {
    category: 'Momo',
    image: momo,
  },
  {
    category: 'Samosa',
    image: samosa,
  },
  {
    category: 'dessert',
    image: desert,
  },
  {
    category: 'icecream',
    image: iceCream,
  }
]