const isClient = typeof window !== "undefined";

export const storage = {
  getItem: (key: string): string | null => {
    if (!isClient) return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error);
      return null;
    }
  },

  setItem: (key: string, value: string): void => {
    if (!isClient) return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage:`, error);
    }
  },

  removeItem: (key: string): void => {
    if (!isClient) return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage:`, error);
    }
  },

  clear: (): void => {
    if (!isClient) return;
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};

export const sessionStorage = {
  getItem: (key: string): string | null => {
    if (!isClient) return null;
    try {
      return window.sessionStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting item ${key} from sessionStorage:`, error);
      return null;
    }
  },

  setItem: (key: string, value: string): void => {
    if (!isClient) return;
    try {
      window.sessionStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting item ${key} in sessionStorage:`, error);
    }
  },

  removeItem: (key: string): void => {
    if (!isClient) return;
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from sessionStorage:`, error);
    }
  },

  clear: (): void => {
    if (!isClient) return;
    try {
      window.sessionStorage.clear();
    } catch (error) {
      console.error("Error clearing sessionStorage:", error);
    }
  },
};
