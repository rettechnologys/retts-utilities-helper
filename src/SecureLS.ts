import SecureLS from 'secure-ls';

/**
 * Check if code is running in a browser environment
 */
const isBrowser = (): boolean => {
  try {
    return typeof window !== 'undefined' && 
           typeof localStorage !== 'undefined' &&
           typeof sessionStorage !== 'undefined';
  } catch {
    return false;
  }
};

/**
 * Throw error with helpful message when not in browser
 */
const requireBrowser = (method: string): void => {
  if (!isBrowser()) {
    throw new Error(
      `SecureStorage.${method}() requires a browser environment with localStorage/sessionStorage. ` +
      `This function cannot be used in Node.js or SSR contexts.`
    );
  }
};

function fnAppStorage() {
  // Check browser environment on initialization
  if (!isBrowser()) {
    console.warn(
      'SecureStorage: Not in a browser environment. All methods will throw errors when called.'
    );
  }

  let secureLS: SecureLS | null = null;

  // Lazy initialization of SecureLS only in browser
  const getSecureLS = (): SecureLS => {
    requireBrowser('initialization');
    if (!secureLS) {
      secureLS = new SecureLS();
    }
    return secureLS;
  };

  const clearLocal = (storageKey: string) => {
    requireBrowser('clearLocal');
    Object.keys(localStorage)
      .filter((x) => x.startsWith(storageKey))
      .forEach((x) => localStorage.removeItem(x));
  };

  const clearSession = (storageKey: string) => {
    requireBrowser('clearSession');
    Object.keys(sessionStorage)
      .filter((x) => x.startsWith(storageKey))
      .forEach((x) => sessionStorage.removeItem(x));
  };

  return {
    /**
     * Check if running in browser environment
     */
    isBrowser,

    /**
     * Set an item in encrypted storage
     * @throws Error if not in browser environment
     */
    setItem: (
      key: string,
      value: object | string | number | boolean | [] | null,
    ): void => {
      getSecureLS().set(key, value);
    },

    /**
     * Set an item in local storage (unencrypted)
     * @throws Error if not in browser environment
     */
    setItemLocalS: (key: string, value: string): void => {
      getSecureLS().setDataToLocalStorage(key, value);
    },

    /**
     * Get an item from encrypted storage
     * @throws Error if not in browser environment
     */
    getItem: (key: string) => {
      return getSecureLS().get(key);
    },

    /**
     * Get an item from local storage
     * @throws Error if not in browser environment
     */
    getItemLocalS: (key: string) => {
      return getSecureLS().getDataFromLocalStorage(key);
    },

    /**
     * Remove an item from encrypted storage
     * @throws Error if not in browser environment
     */
    removeItem: (key: string): void => {
      getSecureLS().remove(key);
    },

    /**
     * Clear storage by type and key prefix
     * @param type - 'session', 'local', or 'all'
     * @param storageKey - Key prefix to filter items
     * @throws Error if not in browser environment
     */
    clear: (type: 'session' | 'local' | 'all' = 'local', storageKey: string) => {
      requireBrowser('clear');
      if (type === 'session') {
        clearSession(storageKey);
      } else if (type === 'local') {
        clearLocal(storageKey);
      } else {
        clearSession(storageKey);
        clearLocal(storageKey);
      }
    },
  };
}

/**
 * Factory function to create secure storage instance
 * @throws Error when methods are called outside browser environment
 */
export const createSecureStorage = fnAppStorage;

/**
 * Default secure storage instance
 * @throws Error when methods are called outside browser environment
 */
export const secureStorage = fnAppStorage();
