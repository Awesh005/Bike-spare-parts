import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'motoHubCart';

// ── Reducer ────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item } = action;
      const key = `${item.id}-${item.color || ''}`;
      const existing = state.find((i) => `${i.id}-${i.color || ''}` === key);
      if (existing) {
        return state.map((i) =>
          `${i.id}-${i.color || ''}` === key
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      }
      return [...state, { ...item, quantity: item.quantity || 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter((i) => i._key !== action.key);
    case 'UPDATE_QTY':
      return state
        .map((i) => i._key === action.key ? { ...i, quantity: action.qty } : i)
        .filter((i) => i.quantity > 0);
    case 'CLEAR_CART':
      return [];
    case 'LOAD':
      return action.items;
    default:
      return state;
  }
}

// Add stable _key to each item for tracking
function normalizeItem(item) {
  return { ...item, _key: `${item.id}-${item.color || ''}` };
}

// ── Provider ───────────────────────────────────────────────
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).map(normalizeItem) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Actions
  const addItem = (item) => dispatch({ type: 'ADD_ITEM', item: normalizeItem(item) });
  const removeItem = (key) => dispatch({ type: 'REMOVE_ITEM', key });
  const updateQty  = (key, qty) => dispatch({ type: 'UPDATE_QTY', key, qty });
  const clearCart  = () => dispatch({ type: 'CLEAR_CART' });

  // Derived values
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQty, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
