import { createContext, useState, useContext } from 'react';

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
    // Bonus version: maxPrice instead of budgetMode
    const [maxPrice, setMaxPrice] = useState(null);

    return (
        <BudgetContext.Provider value={{ maxPrice, setMaxPrice }}>
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudget = () => {
    const context = useContext(BudgetContext);
    if (!context) {
        throw new Error('useBudget must be used within a BudgetProvider');
    }
    return context;
};
