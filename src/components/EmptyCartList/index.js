import { Link } from 'react-router-dom'

import './index.css'

const EmptyCartList = () => (
  <div className="cart-empty-view-container">
    <h1 className="cart-empty-heading">Your Cart Is Empty</h1>
    <Link to="/">
      <button type="button" className="">
        Shop Now
      </button>
    </Link>
  </div>
)

export default EmptyCartList
