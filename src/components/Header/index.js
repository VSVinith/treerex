import { Link } from 'react-router-dom'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = () => (
    <CartContext.Consumer>
        {value => {
            const { cartList } = value
            const cartItemsCount = cartList.length

            return (
                <div className="header">
                    <Link to="/" className='header-item'><h3>TreeRex Store</h3></Link>
                    <div className="products-cart">
                        <Link to="/" className="header-item"><p>Products</p></Link>
                        <Link to="/cart" className="header-item"><p>Cart <span className='cart-count'>{cartItemsCount}</span></p></Link>
                    </div>
                </div>
            )
        }}

    </CartContext.Consumer>

)

export default Header 