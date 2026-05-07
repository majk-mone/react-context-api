import React from 'react';
import { useBudget } from '../contexts/BudgetContext';
import { useCart } from '../contexts/CartContext';

const Navbar = ({ setView }) => {
    const { maxPrice, setMaxPrice } = useBudget();
    const { cartCount } = useCart();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm sticky-top border-bottom">
            <div className="container">
                <a className="navbar-brand fw-bold" href="#" onClick={(e) => { e.preventDefault(); setView('products'); }}>
                    <span className="text-primary">Shop</span>Context
                </a>
                
                <div className="d-flex align-items-center gap-4">
                    <div className="input-group input-group-sm" style={{ maxWidth: '200px' }}>
                        <span className="input-group-text bg-secondary border-secondary text-light">Budget €</span>
                        <input
                            type="number"
                            className="form-control"
                            value={maxPrice === null ? '' : maxPrice}
                            onChange={(e) => {
                                const val = e.target.value;
                                setMaxPrice(val === '' ? null : Number(val));
                            }}
                            placeholder="Max"
                        />
                    </div>

                    <div className="position-relative cursor-pointer" onClick={() => setView('cart')} style={{ cursor: 'pointer' }}>
                        <span className="h4 mb-0">🛒</span>
                        {cartCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cartCount}
                                <span className="visually-hidden">articoli nel carrello</span>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
