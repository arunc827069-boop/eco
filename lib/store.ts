import { create } from 'zustand';
import { CartItem, Product, User, Order, Address } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (product, quantity = 1) => {
    const items = get().items;
    const existingItem = items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      set({
        items: items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      });
    } else {
      set({ items: [...items, { product, quantity }] });
    }
  },
  removeItem: (productId) => {
    set({ items: get().items.filter(item => item.product.id !== productId) });
  },
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set({
      items: get().items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    });
  },
  clearCart: () => set({ items: [] }),
  getTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
}));

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
}));

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  addItem: (product) => {
    if (!get().isInWishlist(product.id)) {
      set({ items: [...get().items, product] });
    }
  },
  removeItem: (productId) => {
    set({ items: get().items.filter(item => item.id !== productId) });
  },
  isInWishlist: (productId) => {
    return get().items.some(item => item.id === productId);
  },
}));

