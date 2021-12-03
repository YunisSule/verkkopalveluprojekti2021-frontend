import React from 'react';
import {useEffect} from 'react'

const image_path = 'http://localhost/verkkopalveluprojekti2021-backend/images/'

export default function OrderPage({cart, updateAmount, removeItem}) {

    function changeAmount(e, item) {
        updateAmount(e.target.value,item);
    }

     useEffect(() => {
    console.log(cart);
  },[]) 

    return (
        <div>
            <h3>Shopping cart</h3>
            
            <table>
            { cart.map((item) => {
                return (
                    
                <tr>
                    <td><img
                  className='cartimage'
                  src={image_path + item.image_path}
                  alt='Product image'
                /></td>
                    <td className='cart'>{item.brand}</td>
                    <td className='cart'>{item.name}</td>
                    <td className='cart'>{item.price} €</td>
                    <td className='cart'>
                        <input
                        style={{width: "50px"}}
                        type="number"
                        step="1"
                        onChange={e => changeAmount(e,item)}
                        value={item.amount} />
                        </td>
                    <td><a href='#' onClick={() => removeItem(item)}>Delete</a></td>
                </tr>
                
                );
            })}
            </table>
            
        </div>
    )
}
