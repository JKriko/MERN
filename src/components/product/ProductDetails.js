import React, { useEffect,useState, Fragment} from 'react'
import { getProductDetails, clearErrors } from '../../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { Carousel } from 'react-bootstrap'
import { addItemToCart } from '../../actions/cartActions'
const ProductDetails = ({ match }) => {

       const[quantity, setQuantity] = useState(1)
       const dispatch = useDispatch();
       const alert = useAlert();
       const { loading, error, product } = useSelector(state => state.productDetails)
    
       useEffect(() => {
        dispatch(getProductDetails(match.params.id))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        

    }, [dispatch, alert, error, match.params.id])

    const addToCart = () => {
        dispatch(addItemToCart(match.params.id, quantity));
        alert.success('Item Added to Cart')
    }

    const increaseQty = () => {
        const count = document.querySelector('.count')

        if(count.valueAsNumber >= product.stock) return;

        const Qty = count.valueAsNumber + 1;
        setQuantity(Qty)


    }

    const decreaseQty = () => {
        const count = document.querySelector('.count')

        if(count.valueAsNumber <= 1) return;

        const Qty = count.valueAsNumber - 1;
        setQuantity(Qty)


    }

    return (
        <Fragment>
        {loading ? <Loader /> : (
            <Fragment>
            <MetaData title={product.name} />

            <div class="row f-flex justify-content-around">
            <div class="col-12 col-lg-5 img-fluid" id="product_image">
            <Carousel pause='hover'>
                   {product.images && product.images.map(image => (
                       <Carousel.Item key={image.public_id}>
                           <img className='="d-block w-100' src={image.url} alt={product.title}/>
                       </Carousel.Item>
        ))}
               </Carousel>
            </div>
    
            <div class="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product {product._id}</p>
    
                <hr />
    
                <div class="rating-outer">
                    <div class="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                </div>
                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
    
                <hr />
    
                <p id="product_price">{product.price}$</p>
                <div class="stockCounter d-inline">
                    <span class="btn btn-danger minus" onClick={decreaseQty}>-</span>
    
                    <input type="number" class="form-control count d-inline" value={quantity} readOnly />
    
                    <span class="btn btn-primary plus" onClick={increaseQty}>+</span>
                </div>
                 <button type="button" id="cart_btn" class="btn btn-primary d-inline ml-4" disabled={product.stock === 0} onClick={addToCart}>Add to Cart</button>
    
                <hr />
    
                <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'}>{product.stock > 0 ? 'In Stock' : 'Out Of Stock'}</span></p>
    
                <hr />
    
                <h4 class="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                
                <button id="review_btn" type="button" class="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                            Submit Your Review
                </button>
                
                <div class="row mt-2 mb-5">
                    <div class="rating w-50">
    
                        <div class="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="ratingModalLabel">Submit Review</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
    
                                        <ul class="stars" >
                                            <li class="star"><i class="fa fa-star"></i></li>
                                            <li class="star"><i class="fa fa-star"></i></li>
                                            <li class="star"><i class="fa fa-star"></i></li>
                                            <li class="star"><i class="fa fa-star"></i></li>
                                            <li class="star"><i class="fa fa-star"></i></li>
                                        </ul>
    
                                        <textarea name="review" id="review" class="form-control mt-3">
    
                                        </textarea>
    
                                        <button class="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                    </div>
                </div>    
            </div>
    
        </div>
    

            
            </Fragment>
        )}
        </Fragment>
        
    )
    }


export default ProductDetails
