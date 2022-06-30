import CartContext from '../../context/CartContext'

import Header from '../Header'
import EmptyCartList from '../EmptyCartList'
import CartList from '../CartList'
import CartSummary from '../CartSummary'

import './index.css'

const ShoppingCart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      const onClickRemoveAllBtn = () => {
        removeAllCartItems()
      }

      return (
        <div>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartList />
            ) : (
              <div className="cart-content-container">
                <p className="cart-heading">My Cart</p>
                <button
                  type="button"
                  className="remove-all-button"
                  onClick={onClickRemoveAllBtn}
                >
                  Remove All
                </button>
                <CartList />
                <CartSummary />
              </div>
            )}
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default ShoppingCart
