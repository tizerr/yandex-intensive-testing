import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { cn } from '@bem-react/classname';
import { Product } from '../../common/types';
import { addToCart } from '../store';
import { CartBadge } from './CartBadge';
import { Image } from './Image';

const bem = cn('ProductDetails');

export interface ProductDetailsProps {
    product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const dispatch = useDispatch();

    const onClick = useCallback(() => {
        dispatch(addToCart(product));
    }, [dispatch, product]);

    const btnSizeClass = process.env.BUG_ID !== '9' ? 'btn-lg' : 'btn-sm';

    return (
        <div className={bem(null, ['row'])}>
            <div className="col-12 col-sm-5 col-lg-4">
                <Image />
            </div>
            <div className="col-12 col-sm-7 col-lg-6">
                <h1 data-testid="name" className={bem("Name")}>{product.name}</h1>
                <p data-testid="desc" className={bem("Description")}>{product.description}</p>
                <p data-testid="price" className={bem("Price", ['fs-3'])}>${product.price}</p>
                <p>
                    <button data-testid="btn" className={bem("AddToCart", ['btn', 'btn-primary', btnSizeClass])} onClick={onClick}>Add to Cart</button>
                    <CartBadge id={product.id} />
                </p>
                <dl>
                    <dt>Color</dt>
                    <dd data-testid="color" className={bem("Color", ['text-capitalize'])}>{product.color}</dd>
                    <dt>Material</dt>
                    <dd data-testid="mat" className={bem("Material", ['text-capitalize'])}>{product.material}</dd>
                </dl>
            </div>
        </div>
    );
}
