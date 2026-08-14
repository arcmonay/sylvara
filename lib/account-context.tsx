"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Address = {
  name: string;
  line1: string;
  city: string;
  region: string;
  postal: string;
};

export type Order = {
  id: string;
  date: string;
  total: number;
  items: { handle: string; title: string; quantity: number }[];
  fulfillment: string;
};

export type Account = {
  email: string;
  name: string;
  isPro: boolean;
  addresses: Address[];
  orders: Order[];
};

type AccountContextValue = {
  account: Account | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
  saveAddress: (address: Address) => void;
  requestPro: () => void;
};

const AccountContext = createContext<AccountContextValue | null>(null);
const KEY = "harvesthome-account";

export function AccountProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setAccount(JSON.parse(raw) as Account);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (account) localStorage.setItem(KEY, JSON.stringify(account));
    else localStorage.removeItem(KEY);
  }, [account, ready]);

  const login = useCallback((email: string, name: string) => {
    setAccount((prev) =>
      prev && prev.email === email
        ? { ...prev, name }
        : { email, name, isPro: false, addresses: [], orders: prev?.orders ?? [] },
    );
  }, []);

  const logout = useCallback(() => setAccount(null), []);

  const addOrder = useCallback((order: Order) => {
    setAccount((prev) =>
      prev ? { ...prev, orders: [order, ...prev.orders] } : prev,
    );
  }, []);

  const saveAddress = useCallback((address: Address) => {
    setAccount((prev) =>
      prev ? { ...prev, addresses: [address, ...prev.addresses].slice(0, 3) } : prev,
    );
  }, []);

  const requestPro = useCallback(() => {
    setAccount((prev) => (prev ? { ...prev, isPro: true } : prev));
  }, []);

  const value = useMemo(
    () => ({ account, login, logout, addOrder, saveAddress, requestPro }),
    [account, login, logout, addOrder, saveAddress, requestPro],
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used within AccountProvider");
  return ctx;
}
