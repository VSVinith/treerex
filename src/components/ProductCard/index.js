import CartContext from '../../context/CartContext'
import './index.css'

const ProductCard = (props) => {
  return (
    < CartContext.Consumer >
      {value => {
        const { addCartItem } = value
        const { product } = props
        let { price, name, imageURL, currency } = product
        const onClickAddToCart = () => {
          addCartItem({...product, quantity: 1})
        }
        return (
          <div className='product-card'>
            <h4 className='name'>{name}</h4>
            <img className='product-image' src={imageURL} alt="product" />
            <div className='price-and-cart'>
              <p className='price'>Price: {price} {currency}</p>
              <button className='add-to-cart' type='button' onClick={onClickAddToCart}>Add to Cart</button>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer >)
}
export default ProductCard
