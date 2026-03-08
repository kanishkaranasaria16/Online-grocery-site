import React from 'react';
import { useParams } from 'react-router-dom';

const products = {
    1: {
        name: "Wagh Bakri Premium Leaf Tea Pouch",
        price: "Rs.540/-",
        description: "A premium quality tea that brews a rich and fragrant cup.",
        image: require('../IMAGE/DAIRY/WaghBahkri.jpg'),
    },
    2: {
        name: "Jivraj No 9 Leaf Tea",
        price: "Rs.525/-",
        description: "A delightful blend of quality tea leaves.",
        image: require('../IMAGE/DAIRY/Jivraj9.jpg'),
    },
    3: {
        name: "Brooke Bond Red Label Tea",
        price: "Rs.473/-",
        description: "A rich and flavorful tea perfect for any occasion.",
        image: require('../IMAGE/DAIRY/RedLabel.jpg'),
    },
    4: {
        name: "Taj Mahal Tea",
        price: "Rs.395/-",
        description: "A fine blend of tea for a refreshing taste.",
        image: require('../IMAGE/DAIRY/TajMahal.jpg'),
    },
    5: {
        name: "Amul Taaza Toned Milk",
        price: "Rs.73/-",
        description: "Fresh and healthy toned milk from Amul.",
        image: require('../IMAGE/DAIRY/Milk.jpg'),
    },
    6: {
        name: "Amul Malai Paneer (Frozen)",
        price: "Rs.89/-",
        description: "Delicious paneer made from fresh milk.",
        image: require('../IMAGE/DAIRY/Panner.jpg'),
    },
    7: {
        name: "Amul Processed Cheese Cubes",
        price: "Rs.299/-",
        description: "Creamy cheese cubes that are perfect for snacking.",
        image: require('../IMAGE/DAIRY/Cheese.jpg'),
    },
    8: {
        name: "Amul Butter",
        price: "Rs.285/-",
        description: "Rich and creamy butter perfect for all your culinary needs.",
        image: require('../IMAGE/DAIRY/butter.jpg'),
    },
};

const PRODUCTLIST = () => {
    const { id } = useParams();
    const product = products[id];

    if (!product) {
        return <h2>Product not found</h2>;
    }

    return (
        <div className="product-detail">
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} width={300} />
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button className="btn-blue">ADD TO CART</button>
        </div>
    );
};

export default PRODUCTLIST;
