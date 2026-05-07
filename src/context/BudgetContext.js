import { createContext, useContext, useState } from 'react';

const BudgetContext = createContext()

export const useBudget = () => useContext(BudgetContext)
const context = useContext(BudgetContext)

if(!context){
    throw new Error('useBudget  deve essere usato dentro un BudgetProvider')
}
