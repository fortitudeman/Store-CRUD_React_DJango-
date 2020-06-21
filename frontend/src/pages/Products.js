import React, { useState, Fragment, useEffect } from 'react';
import {
    MDBCard, MDBCardBody, MDBCardText, MDBBtn, MDBCardTitle, MDBBadge,
    MDBIcon, MDBInput, MDBRow
} from 'mdbreact';
import axios from 'axios';

import styles from './Products.module.css';
import Pagination from './Pagination';



const Products = () => {
    const [addToggle, setAddToggle] = useState(false);
    const addClick = () => { setAddToggle(!addToggle) };

    const [editToggle, setEditToggle] = useState(-1);
    const editClick = (id) => { setEditToggle(id) };

    ///--------------- For pagination and display users-------------///
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [previous, setPrevious] = useState('');
    const [next, setNext] = useState('');
    const [active, setActive] = useState(1);

    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };
    useEffect(() => {
        window.scrollTo(0,0);
        
        const fetchData = async() => {
            try {
                const res = await axios.get('/api/products', config);
                setProducts(res.data.results);
                setCount(res.data.count);
                setPrevious(res.data.previous);
                setNext(res.data.next);
            }
            catch (err) {

            }
        }
        fetchData();
    },[])
    const previous_number = () => {
        axios.get(previous, config)
        .then(res => {
            setProducts(res.data.results);
            setPrevious(res.data.previous);
            setNext(res.data.next);
            if (previous)
                setActive(active-1);
        })
        .catch(err => {

        })
    };
    const next_number = () => {
        axios.get(next, config)
        .then(res => {
            setProducts(res.data.results);
            setPrevious(res.data.previous);
            setNext(res.data.next);
            if (next)
                setActive(active+1);
        })
        .catch(err => {
            
        })
    }
    const visitPage = (page) => {
        axios.get(`/api/products/?page=${page}`,config)
        .then(res => {
            setProducts(res.data.results);
            setPrevious(res.data.previous);
            setNext(res.data.next);
            setActive(page);
        })
        .catch(err => {});
    };

    const options = [
        {
            text: "Option 1",
            value: "1"
        },
        {
            text: "Option 2",
            value: "2"
        },
        {
            text: "Option 3",
            value: "3"
        }
    ]
    return (
        <div>
            <MDBBtn> {count} Products</MDBBtn>
            <MDBBtn onClick={addClick}><MDBIcon icon="plus-circle" /> Add New Product </MDBBtn>
            {
                addToggle ?
                    <form>
                        <MDBInput label="Product Name" outline />
                        <MDBInput label="Price" outline />
                        <select className="browser-default custom-select">
                            <option>Category</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                        </select>
                        <MDBInput type="textarea" label="Description" outline />
                        <MDBRow className={styles.addrow}>
                            <MDBBtn color="warning" className={styles.editbtn}><MDBIcon far icon="save" /> Save</MDBBtn>
                            <MDBBtn color="danger" className={styles.editbtn} onClick={()=>setAddToggle(false)}><MDBIcon icon="undo" /> Cancel</MDBBtn>
                        </MDBRow>
                    </form>
                    :
                    null
            }
            <Pagination 
                itemsPerPage = {5}
                count = {count}
                visitPage = {visitPage}
                previous = {previous_number}
                next = {next_number}
                active = {active}
                setActive = {setActive}
            />
            {
                products.map(producut => {
                    return (
                        <div>
                            {
                                producut.id !== editToggle ?
                                    <MDBCard key={producut.id} className={styles.card_item}>
                                        <MDBCardTitle>{producut.name}
                                            <MDBBadge pill color="info" className={styles.badge_item}>${producut.price}</MDBBadge>
                                        </MDBCardTitle>
                                        <MDBCardText>{producut.description}({producut.category})
                                        <Fragment className={styles.btngroup}>
                                                <MDBBtn color="success" className={styles.editbtn}>Remove</MDBBtn>
                                                <MDBBtn color="secondary" className={styles.editbtn} onClick={() => editClick(producut.id)}>Edit</MDBBtn>
                                            </Fragment>
                                        </MDBCardText>
                                    </MDBCard>
                                    :
                                    <form>
                                        <MDBInput label="Product Name" outline value={producut.name}/>
                                        <MDBInput label="Price" outline value={producut.price}/>
                                        <select className="browser-default custom-select">
                                            <option>Category</option>
                                            <option value="1">Option 1</option>
                                            <option value="2">Option 2</option>
                                            <option value="3">Option 3</option>
                                        </select>
                                        <MDBInput type="textarea" label="Description" outline value={producut.description}/>
                                        <MDBRow className={styles.addrow}>
                                            <MDBBtn color="warning" className={styles.editbtn}><MDBIcon far icon="save" /> Save</MDBBtn>
                                            <MDBBtn color="danger" className={styles.editbtn} onClick={()=>editClick(-1)}><MDBIcon icon="undo" /> Cancel</MDBBtn>
                                        </MDBRow>
                                    </form>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Products;