import React, {useState} from 'react';

import { useProductContext } from '../context/ProductContext';

export default function ProductManager(){
    const {products, dispatch} = useProductContext();
    const [product, setProduct] = useState({name:'', price: ''});
    const [editId, setEditId] = useState(null);
    const [updated, setUpdated] = useState({name:'', price: ''})

    const handleAdd =(e) =>{
        e.preventDefault();
        if(!product.name || !product.price) return;
        dispatch({type:'ADD_PRODUCT', payload: product});
        setProduct({name: '', price: ''})
    }

    const handleUpdate =(e) =>{
        dispatch({type:'UPDATE_PRODUCT', payload: {...updated, id: editId}});
        setEditId(null)
        setProduct({name: '', price: ''})
    }
    return(
        <div>
            <form onSubmit={handleAdd}>
                <input
                type='text'
                placeholder='Product Name'
                value={product.name}
                onChange={(e) => setProduct({...product, name: e.target.value})}
                />

                <input
                type='text'
                placeholder='Product Price'
                value={product.price}
                onChange={(e) => setProduct({...product, price: e.target.value})}
                />
            <button type='submit'>Add Product</button>

            </form>

            {products.length === 0 && <p>No Products available</p>}

            <ul>
                {products.map((p) => {
                    return(
                    <li key={p.id}>
                        {editId === p.id? (
                            <div>
                            <input
                                value ={updated.name}
                                onChange={(e) => setUpdated({...updated, name: e.target.value})}
                                />

                            <input
                                value ={updated.price}
                                onChange={(e) => setUpdated({...updated, price: e.target.value})}
                                />
                            <button onClick={handleUpdate}>Save</button>
                            </div>
                ) : (   
                    <div>
                            <span>{p.name} - {p.price}</span>
                            <button
                            onClick={() => {
                                setEditId(p.id);
                                setUpdated({name: p.name, price: p.price})
                            }}
                            >Edit</button>

                            <button onClick={() => dispatch({type: 'DELETE_PRODUCT', payload: p.id})}>
                            Delete
                            </button>
                    </div>
                        )}

                    </li>
                    )
                })}
            </ul>

        </div>
    )
}