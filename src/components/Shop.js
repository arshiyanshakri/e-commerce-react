import React,{useState} from 'react';
import './Shop.css'

function Shop() {
    const menu = [
        {id: 1, name: 'Coffee - Small', price: 30},
        {id: 2, name: 'Coffee - Medium', price: 45},
        {id: 3, name: 'Coffee - Large', price: 60},
        {id: 4, name: 'Sandwich', price: 50},
        {id: 5, name: 'Fries', price: 35},
        {id: 6, name: 'Pizza', price: 120},
        {id: 7, name: 'Burger', price: 100}
    ];
    const[cartList , setCartList]= useState([])
    const [totalAmount , setTotalAmount] = useState(0);

    const addToCart = (element)=>{

        if(cartList.some((item) => item.id === element.id)) {

            let temp_cart_list = [...cartList];

            let index = cartList.findIndex((item) => item.id === element.id);
            let temp_product = cartList[index]
            temp_product.quantity = temp_product.quantity+1;

            cartList[index] = temp_product;
    
            setCartList( temp_cart_list );
            setTotalAmount(totalAmount  + cartList[index].price)
        }
        else {
            element.quantity = 1
            setCartList([...cartList, element])
            setTotalAmount(totalAmount  + element.price)
        }
    }
    function removeFromCart(element) {
        element.quantity = element.quantity - 1
        if(element.quantity>=1) {
            setTotalAmount(totalAmount  - element.price)
        }
        else {
            if(element.quantity == 0) {
                let temp_copy = [...cartList]
                temp_copy = temp_copy.filter((cartItem) => cartItem.id !== element.id)
                setCartList(temp_copy);
            }
            setTotalAmount (totalAmount - element.price)
        }
    }
    
    const listItems = menu.map((element) => (
        <div key = {element.id} className='product-item'>
            <div>
                {element.name}
            </div>
            <div className='product-item__price'>
            {`₹${element.price}`}
            </div>
            <button type='submit' onClick={()=> addToCart(element)}> + </button>
        </div>
    ));

    const cartItems = cartList.map((element) => (
        <div key = {element.id} className='product-item'>
            <div>
                {element.name} ({element.quantity})
            </div>
            <button  type='submit' onClick={() => removeFromCart(element)}> - </button>
        </div>
    ));

    return (
         <>
            <div className='title'><strong>COFFEE SHOP</strong></div>
            <div className='main'>
            <div className='shop'>
            <strong style={{textAlign:'center'}}>SHOP ITEMS</strong>
                {listItems}
            </div>
            <div className='cart'>
            <strong style={{textAlign:'center'}}>CART</strong>
                {cartItems}
            Total: ₹{totalAmount}/-</div>
        </div>
        </>
    )
};

export default Shop;