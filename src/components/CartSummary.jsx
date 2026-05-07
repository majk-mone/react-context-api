import React from 'react';
import { useCart } from '../contexts/CartContext';

const CartSummary = ({ setView }) => {
    const { cart, removeFromCart, totalPrice, clearCart } = useCart();

    return (
        <div className="container mt-5">
            <div className="card shadow-lg border-0">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
                    <h2 className="mb-0 h4">Riepilogo Acquisti</h2>
                    <button className="btn btn-outline-light btn-sm" onClick={() => setView('products')}>
                        &larr; Continua lo Shopping
                    </button>
                </div>
                
                <div className="card-body p-4">
                    {cart.length > 0 ? (
                        <>
                            <div className="list-group list-group-flush mb-4">
                                {cart.map((item) => (
                                    <div key={item.id} className="list-group-item bg-transparent d-flex align-items-center px-0 py-3">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="rounded shadow-sm me-3" 
                                            style={{ width: '70px', height: '70px', objectFit: 'cover' }} 
                                        />
                                        <div className="flex-grow-1">
                                            <h5 className="mb-1">{item.name}</h5>
                                            <p className="mb-0 text-warning fw-bold">{item.price}€</p>
                                        </div>
                                        <button 
                                            className="btn btn-outline-danger btn-sm rounded-circle" 
                                            onClick={() => removeFromCart(item.id)}
                                            title="Rimuovi"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="d-flex justify-content-between align-items-center border-top pt-4">
                                <h3 className="h5 mb-0">Totale Ordine:</h3>
                                <span className="h3 mb-0 text-warning fw-bolder">{totalPrice}€</span>
                            </div>

                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
                                <button className="btn btn-outline-secondary me-md-2" onClick={clearCart}>
                                    Svuota Carrello
                                </button>
                                <button className="btn btn-primary btn-lg px-5 shadow" onClick={() => alert('Checkout in corso...')}>
                                    Procedi al Pagamento
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-5">
                            <div className="display-1 text-secondary mb-4">🛒</div>
                            <h3 className="text-muted">Il tuo carrello è vuoto</h3>
                            <button className="btn btn-primary mt-3 px-4" onClick={() => setView('products')}>
                                Scopri i nostri prodotti
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartSummary;
