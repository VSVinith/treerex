import { Route, Routes } from 'react-router-dom';
import { Component } from 'react';

import './App.css';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
import CartContext from './context/CartContext';

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({ cartList: [] })
  }

  incrementCartItemQuantity = product => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (product.id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return { ...eachCartItem, quantity: updatedQuantity }
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const { cartList } = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return { ...eachCartItem, quantity: updatedQuantity }
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const { cartList } = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )

    this.setState({ cartList: updatedCartList })
  }

  addCartItem = product => {
    const { cartList } = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )

    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (productObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + 1
            return { ...eachCartItem, quantity: updatedQuantity }
          }
          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]

      this.setState({ cartList: updatedCartList })
    }
  }

  render() {

    const { cartList } = this.state

    return (
      <div className="App">
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            removeAllCartItems: this.removeAllCartItems,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<ShoppingCart />} />
          </Routes>
        </CartContext.Provider>

      </div >
    )
  }
}

export default App;
