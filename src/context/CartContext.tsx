// 'use client'

// // CartContext.tsx
// import React, { createContext, useContext, useState, useReducer, useEffect } from 'react';
// import { ProductType } from '@/type/ProductType';

// interface CartItem extends ProductType {
//     id: string; // Unique identifier for the product
//     name: string; // Name of the product
//     price: number;
//     quantity: number
//     selectedSize: string
//     selectedColor: string



// }

// interface CartState {
//     cartArray: CartItem[]
// }

// type CartAction =
//     | { type: 'ADD_TO_CART'; payload: ProductType }
//     | { type: 'REMOVE_FROM_CART'; payload: string }
//     | {
//         type: 'UPDATE_CART'; payload: {
//             itemId: string; quantity: number, selectedSize: string, selectedColor: string
//         }
//     }
//     | { type: 'LOAD_CART'; payload: CartItem[] }





// interface CartContextProps {

//     cartState: CartState;
//     addToCart: (item: ProductType) => void;
//     removeFromCart: (itemId: string) => void;
//     updateCart: (itemId: string, quantity: number, selectedSize: string, selectedColor: string) => void;
// }

// const CartContext = createContext<CartContextProps | undefined>(undefined);

// const cartReducer = (state: CartState, action: CartAction): CartState => {
//     switch (action.type) {
//         case 'ADD_TO_CART':
//             const newItem: CartItem = { ...action.payload, quantity: 1, selectedSize: '', selectedColor: '' };
//             return {
//                 ...state,
//                 cartArray: [...state.cartArray, newItem],
//             };
//         case 'REMOVE_FROM_CART':
//             return {
//                 ...state,
//                 cartArray: state.cartArray.filter((item) => item.id !== action.payload),
//             };
//         case 'UPDATE_CART':
//             return {
//                 ...state,
//                 cartArray: state.cartArray.map((item) =>
//                     item.id === action.payload.itemId
//                         ? {
//                             ...item,
//                             quantity: action.payload.quantity,
//                             selectedSize: action.payload.selectedSize,
//                             selectedColor: action.payload.selectedColor
//                         }
//                         : item
//                 ),
//             };

//         case 'LOAD_CART':
//             return {
//                 ...state,
//                 cartArray: action.payload,
//             };

//         default:
//             return state;
//     }
// };

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [cartState, dispatch] = useReducer(cartReducer, { cartArray: [] });

//     const addToCart = (item: ProductType) => {
//         dispatch({ type: 'ADD_TO_CART', payload: item });
//     };

//     const removeFromCart = (itemId: string) => {
//         dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
//     };

//     const updateCart = (itemId: string, quantity: number, selectedSize: string, selectedColor: string) => {
//         dispatch({ type: 'UPDATE_CART', payload: { itemId, quantity, selectedSize, selectedColor } });
//     };

//     return (
//         <CartContext.Provider value={{ cartState, addToCart, removeFromCart, updateCart, }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => {
//     const context = useContext(CartContext);
//     if (!context) {
//         throw new Error('useCart must be used within a CartProvider');
//     }
//     return context;
// };



'use client';

// CartContext.tsx
import React, { createContext, useContext, useState, useReducer, useEffect } from 'react';
import { ProductType } from '@/type/ProductType';

interface CartItem extends ProductType {
    id: string; // Unique identifier for the product
    name: string; // Name of the product
    price: number;
    quantity: number;
    selectedSize: string;
    selectedColor: string;
    days: number; // Number of days for which the product is selected
}

interface CartState {
    cartArray: CartItem[];
}

type CartAction =
    | { type: 'ADD_TO_CART'; payload: ProductType }
    | { type: 'REMOVE_FROM_CART'; payload: string }
    | {
        type: 'UPDATE_CART'; payload: {
            itemId: string; quantity: number, selectedSize: string, selectedColor: string, days: number
        }
    }
    | { type: 'LOAD_CART'; payload: CartItem[] }
    | { type: 'ADD_DAYS'; payload: { itemId: string, days: number } };

interface CartContextProps {
    cartState: CartState;
    addToCart: (item: ProductType) => void;
    removeFromCart: (itemId: string) => void;
    updateCart: (itemId: string, quantity: number, selectedSize: string, selectedColor: string) => void;
    addDays: (itemId: string, days: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const newItem: CartItem = { ...action.payload, quantity: 1, selectedSize: '', selectedColor: '', days: 1 };
            return {
                ...state,
                cartArray: [...state.cartArray, newItem],
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartArray: state.cartArray.filter((item) => item.id !== action.payload),
            };
        case 'UPDATE_CART':
            return {
                ...state,
                cartArray: state.cartArray.map((item) =>
                    item.id === action.payload.itemId
                        ? {
                            ...item,
                            quantity: action.payload.quantity,
                            selectedSize: action.payload.selectedSize,
                            selectedColor: action.payload.selectedColor,
                            days: action.payload.days,
                        }
                        : item
                ),
            };
        case 'ADD_DAYS':
            return {
                ...state,
                cartArray: state.cartArray.map((item) =>
                    item.id === action.payload.itemId
                        ? { ...item, days: action.payload.days }
                        : item
                ),
            };
        case 'LOAD_CART':
            return {
                ...state,
                cartArray: action.payload,
            };

        default:
            return state;
    }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartState, dispatch] = useReducer(cartReducer, { cartArray: [] });

    const addToCart = (item: ProductType) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
    };

    const removeFromCart = (itemId: string) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    };

    const updateCart = (itemId: string, quantity: number, selectedSize: string, selectedColor: string) => {
        dispatch({ type: 'UPDATE_CART', payload: { itemId, quantity, selectedSize, selectedColor, days: 1 } });
    };

    const addDays = (itemId: string, days: number) => {
        dispatch({ type: 'ADD_DAYS', payload: { itemId, days } });
    };

    return (
        <CartContext.Provider value={{ cartState, addToCart, removeFromCart, updateCart, addDays }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

