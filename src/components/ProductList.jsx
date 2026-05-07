import React from 'react';
import { useBudget } from '../contexts/BudgetContext';
import { useCart } from '../contexts/CartContext';

const products = [
    { id: 1, name: 'T-Shirt Minimal', price: 20, image: 'https://picsum.photos/seed/1/300/200' },
    { id: 2, name: 'Felpa Hoodie', price: 45, image: 'https://picsum.photos/seed/2/300/200' },
    { id: 3, name: 'Jeans Slim Fit', price: 60, image: 'https://picsum.photos/seed/3/300/200' },
    { id: 4, name: 'Calzini Premium', price: 10, image: 'https://picsum.photos/seed/4/300/200' },
    { id: 5, name: 'Zaino Urban', price: 35, image: 'https://picsum.photos/seed/5/300/200' },
    { id: 6, name: 'Cappello Baseball', price: 15, image: 'https://picsum.photos/seed/6/300/200' },
];

const ProductList = () => {
    const { maxPrice } = useBudget();
    const { addToCart, cart, totalPrice } = useCart();

    // Calcoliamo il budget rimanente
    const remainingBudget = maxPrice !== null ? maxPrice - totalPrice : null;

    // Filtriamo i prodotti:
    // 1. Se c'è un budget massimo, il prezzo deve essere <= budget rimanente
    // 2. Se non c'è budget massimo, mostriamo tutto
    const filteredProducts = remainingBudget !== null
        ? products.filter(p => p.price <= remainingBudget)
        : products;

    const isInCart = (productId) => cart.some(item => item.id === productId);

    return (
        <div className="container">
            <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3 border-bottom pb-4">
                <div>
                    <h2 className="display-6 fw-bold">Prodotti Disponibili</h2>
                    <p className="text-secondary mb-0">Rimanente: <strong className={remainingBudget !== null && remainingBudget < 20 ? 'text-danger' : 'text-success'}>
                        {remainingBudget !== null ? `${remainingBudget}€` : 'Illimitato'}
                    </strong></p>
                </div>
                {maxPrice && (
                    <div className="badge bg-primary-subtle text-primary p-2 fs-6 border border-primary">
                        Budget Totale: <strong>{maxPrice}€</strong> | Speso: <strong>{totalPrice}€</strong>
                    </div>
                )}
            </header>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => {
                        const added = isInCart(product.id);
                        return (
                            <div key={product.id} className="col">
                                <div className="card h-100 shadow-sm transition-hover">
                                    <img 
                                        src={product.image} 
                                        className="card-img-top" 
                                        alt={product.name} 
                                        style={{ height: '220px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title h6 fw-bold">{product.name}</h5>
                                        <p className="card-text text-warning fs-4 fw-bolder mt-auto">{product.price}€</p>
                                        <button 
                                            className={`btn mt-3 w-100 fw-bold py-2 ${added ? 'btn-outline-secondary' : 'btn-primary shadow'}`}
                                            onClick={() => !added && addToCart(product)}
                                            disabled={added}
                                        >
                                            {added ? '✓ Nel Carrello' : 'Aggiungi al Carrello'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-12 text-center py-5">
                        <p className="lead text-muted fst-italic">Nessun prodotto disponibile con il tuo budget residuo.</p>
                        {maxPrice && <p className="small">Hai ancora {remainingBudget}€ disponibili.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
