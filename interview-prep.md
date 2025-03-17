# Daily Concepts

## JavaScript Concepts:

### Closures

A function that retains access to its lexical scope even when executed outside that scope.

**Uses**: Creating a private counter for a website visit tracker that can't be manipulated from outside.

```jsx
function createCounter() {
  let count = 0;  // Private variable
  
  return {
    increment: () => { count += 1; return count; },
    getCount: () => count,
    reset: () => { count = 0; return count; }
  };
}

const pageViewCounter = createCounter();
pageViewCounter.increment();  // 1
pageViewCounter.increment();  // 2
console.log(pageViewCounter.getCount());  // 2
// count variable remains private and protected
```

---

**Currying**

Transforming a function that takes multiple arguments into a sequence of functions each taking a single argument. The curried function returns a new function with the first argument already set, waiting for the remaining arguments.

**Uses**: Currying lets you create a smarter function that remembers values (like product price) so you can reuse it later with different inputs (like quantity), similar to creating a template for calculating different prices in your shop.

```jsx
function calculatePrice(basePrice) {
  return function(quantity) {
    return function(taxRate) {
      const discount = quantity > 10 ? 0.1 : 0;
      const subtotal = basePrice * quantity * (1 - discount);
      return subtotal * (1 + taxRate);
    };
  };
}

const priceForTShirt = calculatePrice(15); // T-shirt costs $15
const priceForTenTShirts = priceForTShirt(10); // Order of 10
const finalPrice = priceForTenTShirts(0.08); // 8% tax
console.log(finalPrice); // $162
```

---

### Debounce

Prevents a function from being called until after a specified delay has elapsed since its last invocation, useful for search inputs or resize events.

**Uses**: Waiting until a user stops typing in a search box before sending the API request.

```jsx
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    // Clear the previous timeout
    clearTimeout(timeoutId);
    
    // Set a new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage example:
const handleSearch = (searchTerm) => {
  console.log(`Searching for: ${searchTerm}`);
  // Make API call here
};

// Create debounced version of the search function
const debouncedSearch = debounce(handleSearch, 500);

// In an input's onChange handler:
// debouncedSearch will only execute 500ms after the user stops typing
document.querySelector('input').addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

---

### Throttle

Throttle limits function execution to run at most once within a specified time period, regardless of how many times it's called.

**Uses**: Limiting how often "save draft" runs while someone types in a document editor.

```jsx
// Throttle implementation
const throttle = (func, limit) => {
  let inThrottle = false;
  
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

// Document editing handler
const saveChanges = (content) => {
  console.log('Saving document...');
  // API call to save the document
  // api.saveDocument(content);
};

// Throttled save - will save at most once every 5 seconds
const throttledSave = throttle(saveChanges, 5000);
```

---

### Cancellable Promises

Cancellable Promises allow you to abort asynchronous operations before they complete.

**Uses**: Aborting an api request when the refresh button clicked.

- **Explanation**
    
    My `useFetch` hook implements cancellable promises to handle API requests efficiently in React. Let me walk through how it works:
    
    First, I use `AbortController` to create a mechanism for cancelling fetch requests. When the component using this hook renders, the `useEffect` creates a new AbortController instance and starts the fetch operation.
    
    The key to making promises cancellable is passing the controller's signal to the fetch request. This creates a communication channel that lets us abort the request when needed.
    
    There are three scenarios where cancellation occurs:
    
    1. When the component unmounts - handled by the cleanup function in `useEffect`
    2. When the URL or options change - the effect dependency array triggers a re-run
    3. When the user manually calls the `refresh` function - which aborts the current request before starting a new one
    
    For proper error handling, I check if the request was aborted before updating state. This prevents errors when a component unmounts during an in-flight request. I also distinguish between AbortError (which isn't a true error) and actual API errors.
    
    This pattern is important because it prevents memory leaks, avoids race conditions between competing requests, and gives users the ability to cancel long-running operations. It's especially valuable in single-page applications where components mount and unmount frequently as users navigate.
    

```jsx
import { useEffect, useState } from "react";

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setController(abortController);
    setLoading(true);
    setError(null);

    const fetchAPI = async () => {
      try {
        const response = await fetch(url, {
          ...options,
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const result = await response.json();

        if (abortController.signal.aborted) return;

        setData(result);
        setError(null);
      } catch (e) {
        if (e.message === "AbortError") {
          console.log("Fetch request aborted");
        } else {
          setError(e.message);
          setData(null);
        }
      } finally {
        if (abortController.signal.aborted) return;
        setLoading(false);
      }
    };

    fetchAPI();

    return () => abortController.abort();
  }, [url, JSON.stringify(options)]);

  const refresh = () => {
    if (controller) {
      controller.abort();
    }
    setController(new AbortController());
  };

  return {
    data,
    loading,
    error,
    refresh,
  };
}

export default useFetch;
```

---

### **Event Delegation**

Event delegation is a technique where you attach a single event listener to a parent element that handles events for all its children through event bubbling, rather than attaching individual listeners to each child element.

```jsx
import React from "react";

const App = () => {
	// This handleClick will trigger the added event in div elemet
	// In our case its onMouseOver, but we can specify
  const handleClick = (event) => {
    if (event.target.tagName === "BUTTON") {
      console.log(`Button clicked: ${event.target.textContent}`);
    }
  };

  return (
    <div onMouseOver={handleClick}>
      <button>Button 1</button>
      <button>Button 2</button>
      <button>Button 3</button>
    </div>
  );
};
export default App;
```

---

### **Event Bubbling**

Event bubbling is a DOM event propagation mechanism where events triggered on a nested element automatically "bubble up" through the hierarchy of parent elements, executing handlers on each ancestor element in sequence.

Event bubbling enables event delegation (what we discussed earlier), allowing you to attach a single event listener to a parent element that can handle events for many child elements, even ones added dynamically after the page loads.

---

### **DOMContentLoad vs Load**

In JavaScript, `DOMContentLoaded` and `load` are two events that are fired during the loading of a webpage.

`DOMContentLoaded` event is triggered when the HTML document has been completely loaded and parsed, without waiting for images, scripts, and other resources to be loaded. This means that the DOM tree is ready and can be manipulated using JavaScript.

`load` event is triggered when all the resources on the page have been loaded, including images, scripts, and stylesheets. This means that the entire page, including all its dependencies, has been loaded and is ready to be used.

```html
<!DOCTYPE html>
<html>
<head>
	<title>DOMContentLoaded vs Load</title>
</head>
<body>
	<h1 id="heading">JavaScript DOMContentLoaded vs Load</h1>

	<script>
		document.addEventListener("DOMContentLoaded", function() {
		    console.log("DOM is loaded");
		    var heading = document.getElementById("heading");
		    heading.style.color = "red";
		});

		window.addEventListener("load", function() {
		    console.log("All resources finished loading");
		});
	</script>
</body>
</html>
```

---

### Polyfill

Polyfill is a piece of code (usually JavaScript) that provides modern functionality on older browsers that don't natively support it. Essentially, a polyfill is a piece of code that "fills in" the gaps in older browsers to make them compatible with newer web standards. Here's an example of using a polyfill to add support for the `Array.prototype.includes()` method, which was introduced in ES6.

```jsx
// Check if Array.prototype.includes is already supported by the browser
if (!Array.prototype.includes) {
  // Define a polyfill for Array.prototype.includes
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(valueToFind, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or undefined');
      }
      var o = Object(this);
      var len = o.length >>> 0;
      if (len === 0) {
        return false;
      }
      var n = fromIndex | 0;
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
      while (k < len) {
        if (o[k] === valueToFind) {
          return true;
        }
        k++;
      }
      return false;
    }
  });
}

// Now we can use Array.prototype.includes() in our code
var fruits = ['apple', 'banana', 'orange'];
console.log(fruits.includes('banana')); // Output: true
console.log(fruits.includes('grape')); // Output: false
```

---

---

## React & Frontend Concepts:

### React Hooks

**useState**: Manages local component state in functional components.
**useEffect**: Handles side effects like data fetching, subscriptions, and DOM manipulations.
**useCallback**: Memoizes functions to prevent unnecessary rerenders in child components.
**useMemo**: Caches expensive calculations between renders for performance optimization.
**Custom Hooks**: Extracts reusable stateful logic from components for better code organization.

### useOnlineStatus

```jsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return isOnline;
}

// Usage in components:
function Header() {
  const isOnline = useOnlineStatus();
  
  return (
    <header>
      <h1>My App</h1>
      <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
        {isOnline ? 'Online' : 'Offline'}
      </div>
    </header>
  );
}

function SaveButton({ onSave }) {
  const isOnline = useOnlineStatus();
  
  return (
    <button 
      onClick={onSave}
      disabled={!isOnline}
    >
      {isOnline ? 'Save Changes' : 'Cannot Save (Offline)'}
    </button>
  );
}
```

### useFetch

```jsx
import { useState, useEffect } from 'react';

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);

  useEffect(() => {
    // AbortController for cancelling the fetch request
    const abortController = new AbortController();
    setController(abortController);
    
    // Set loading state
    setLoading(true);
    setError(null);
    
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          ...options,
          signal: abortController.signal,
        });
        
        // Handle non-2xx responses
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        
        if (abortController.signal.aborted) return;
        
        setData(result);
        setError(null);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch request aborted');
        } else {
          setError(error.message);
          setData(null);
        }
      } finally {
        if (abortController.signal.aborted) return;
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup: abort the fetch request when component unmounts
    // or dependencies change
    return () => abortController.abort();
  }, [url, JSON.stringify(options)]);

  // Function to manually trigger a refresh
  const refetch = () => {
    if (controller) {
      controller.abort();
    }
    // This will re-trigger the useEffect
    setController(new AbortController());
  };

  return { data, loading, error, refetch };
}

export default useFetch;

--------------------------

// USAGE
import React from 'react';
import useFetch from './useFetch';

function UserProfile({ userId }) {
  const { 
    data: user, 
    loading, 
    error, 
    refetch 
  } = useFetch(`https://api.example.com/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={refetch}>Refresh Data</button>
    </div>
  );
}

export default UserProfile;
```

### **Enhanced useFetch Hook with LRU Cache**

```jsx
import { useState, useEffect } from 'react';

// LRU - Least Recently Used Cache implementation
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.head = new DoublyLinkedListNode(0, 0);
    this.tail = new DoublyLinkedListNode(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (!this.cache.has(key)) {
      return null;
    }
    const node = this.cache.get(key);
    this.moveToFront(node);
    return node.value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      node.value = value;
      this.moveToFront(node);
      return;
    }

    if (this.cache.size >= this.capacity) {
      const lruNode = this.tail.prev;
      this.removeNode(lruNode);
      this.cache.delete(lruNode.key);
    }

    const newNode = new DoublyLinkedListNode(key, value);
    this.cache.set(key, newNode);
    this.addToFront(newNode);
  }

  removeNode(node) {
    const prevNode = node.prev;
    const nextNode = node.next;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }

  addToFront(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  moveToFront(node) {
    this.removeNode(node);
    this.addToFront(node);
  }
}

class DoublyLinkedListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

// Create a singleton cache instance
const apiCache = new LRUCache(100); // Cache 100 API requests

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);
  
  // Cache options
  const { 
    useCache = true, 
    cacheTTL = 5 * 60 * 1000, // 5 minutes default TTL
    cacheKey = url  // Default cache key is the URL
  } = options;

  useEffect(() => {
    // AbortController for cancelling the fetch request
    const abortController = new AbortController();
    setController(abortController);

    // Set loading state
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      // Check cache first if caching is enabled
      if (useCache) {
        const cachedResponse = apiCache.get(cacheKey);
        if (cachedResponse && (Date.now() - cachedResponse.timestamp < cacheTTL)) {
          setData(cachedResponse.data);
          setLoading(false);
          return;
        }
      }

      try {
        const response = await fetch(url, {
          ...options,
          signal: abortController.signal,
        });

        // Handle non-2xx responses
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        
        if (abortController.signal.aborted) return;
        
        // Store in cache if caching is enabled
        if (useCache) {
          apiCache.put(cacheKey, {
            data: result,
            timestamp: Date.now()
          });
        }
        
        setData(result);
        setError(null);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch request aborted');
        } else {
          setError(error.message);
          setData(null);
        }
      } finally {
        if (abortController.signal.aborted) return;
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup: abort the fetch request when component unmounts
    // or dependencies change
    return () => abortController.abort();
  }, [url, JSON.stringify(options)]);

  // Function to manually trigger a refresh
  const refetch = (skipCache = true) => {
    if (controller) {
      controller.abort();
    }
    
    // If skipCache is true, temporarily disable caching for this refetch
    if (skipCache) {
      const newOptions = { ...options, useCache: false };
      setController(new AbortController());
      return;
    }
    
    // This will re-trigger the useEffect
    setController(new AbortController());
  };

  // Function to manually clear the cache for this URL
  const clearCache = () => {
    apiCache.put(cacheKey, null);
  };

  return { data, loading, error, refetch, clearCache };
}

export default useFetch;
```

**Usage:**

```jsx
import React from 'react';
import useFetch from './useFetchWithCache';

function UserProfile({ userId }) {
  const { data: user, loading, error, refetch, clearCache } = useFetch(
    `https://api.example.com/users/${userId}`,
    {
      useCache: true,
      cacheTTL: 2 * 60 * 1000, // 2 minute cache for user data
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={() => refetch(true)}>Refresh Data (Skip Cache)</button>
      <button onClick={clearCache}>Clear User Cache</button>
    </div>
  );
}

function ProductList() {
  const { data: products, loading, error } = useFetch(
    'https://api.example.com/products',
    {
      useCache: true,
      cacheTTL: 10 * 60 * 1000, // 10 minutes cache for product list
    }
  );

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products: {error}</div>;

  return (
    <div>
      <h2>Products</h2>
      {products?.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

// Example with custom cache key
function SearchResults({ query, filters }) {
  const filterString = JSON.stringify(filters);
  
  const { data: results, loading } = useFetch(
    `https://api.example.com/search?q=${query}`,
    {
      useCache: true,
      // Create a custom cache key that includes filters
      cacheKey: `search_${query}_${filterString}`,
      cacheTTL: 5 * 60 * 1000,
      // Include filters in request body
      method: 'POST',
      body: JSON.stringify(filters),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return (
    <div>
      {loading ? (
        <div>Searching...</div>
      ) : (
        <div>
          <h2>Search Results for "{query}"</h2>
          {results?.map(result => (
            <div key={result.id}>{result.title}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export { UserProfile, ProductList, SearchResults };
```

### State Management Approaches

```jsx
// Local component state
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Context API for shared state
const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={`btn-${theme}`}
    >
      Toggle Theme
    </button>
  );
}

// Custom hooks for reusable logic
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Using Redux for complex state
// actions.js
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

export const addTodo = text => ({
  type: ADD_TODO,
  payload: { text }
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
});

// reducer.js
const initialState = {
  todos: []
};

export function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload.text,
            completed: false
          }
        ]
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    default:
      return state;
  }
}
```

---

### Performance Optimization

```jsx
// Memorize the entire component and its a HOC component
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  // Complex rendering logic
  return <div>{/* rendered content */}</div>;
});

// useMemo is a hook that memoizes a computed value 
function SortedList({ items, sortKey }) {
  const sortedItems = useMemo(() => {
    console.log('Sorting items...');
    return [...items].sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
  }, [items, sortKey]);

  return (
    <ul>
      {sortedItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// useCallback is a hook that memoizes function reference
function ParentComponent() {
  const [count, setCount] = useState(0);

  // This function reference stays stable between renders
  const handleItemClick = useCallback((itemId) => {
    console.log(`Item ${itemId} clicked`);
    // Some logic that doesn't depend on count
  }, []); // Empty dependency array = function never changes

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Increment ({count})
      </button>
      <ItemList onItemClick={handleItemClick} />
    </div>
  );
}

// Code splitting with lazy loading
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

```

---

### Local Storage vs Session Storage

```jsx
// Key differences in usage:

// 1. Storage persistence
// localStorage persists indefinitely
localStorage.setItem('userPreference', 'darkMode');

// sessionStorage clears when the session ends (tab/browser close)
sessionStorage.setItem('temporaryState', JSON.stringify({
  scrollPosition: 250,
  formData: { name: 'John', email: '' }
}));

// 2. Common API for both
function storageBasics() {
  // Setting items
  localStorage.setItem('theme', 'dark');

  // Getting items
  const theme = localStorage.getItem('theme');

  // Removing items
  localStorage.removeItem('oldSetting');

  // Clearing all items
  // localStorage.clear();

  // Storing objects (requires serialization)
  const user = { name: 'John', role: 'admin' };
  localStorage.setItem('currentUser', JSON.stringify(user));

  // Retrieving objects
  const storedUser = JSON.parse(localStorage.getItem('currentUser'));
}

// 3. Storage with expiration
function setWithExpiry(key, value, ttl) {
  const item = {
    value: value,
    expiry: Date.now() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);

  // Check if item is expired
  if (Date.now() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}

// 4. Cross-tab communication (localStorage only)
window.addEventListener('storage', event => {
  if (event.key === 'theme') {
    console.log(`Theme changed from ${event.oldValue} to ${event.newValue}`);
    updateTheme(event.newValue);
  }
});

// 5. Practical use cases
const UserPreferences = {
  save(preferences) {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  },

  get() {
    return JSON.parse(localStorage.getItem('userPreferences')) || {
      theme: 'light',
      fontSize: 'medium',
      notifications: true
    };
  }
};

const FormPersistence = {
  save(formId, data) {
    sessionStorage.setItem(`form:${formId}`, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  },

  load(formId) {
    return JSON.parse(sessionStorage.getItem(`form:${formId}`))?.data || null;
  },

  clear(formId) {
    sessionStorage.removeItem(`form:${formId}`);
  }
};

// 6. Handling storage limitations
function isStorageAvailable(type) {
  try {
    const storage = type === 'localStorage' ? localStorage : sessionStorage;
    const testKey = '__storage_test__';
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

// Create a memory fallback if storage isn't available
const storage = isStorageAvailable('localStorage') ?
  localStorage :
  (function() {
    const data = {};
    return {
      setItem(key, value) { data[key] = String(value); },
      getItem(key) { return data[key] || null; },
      removeItem(key) { delete data[key]; },
      clear() { Object.keys(data).forEach(key => delete data[key]); }
    };
  })();
```

---

### Component Lifecycle

```jsx
// Functional Components with Hooks (Modern Approach)
function FunctionalComponent({ id }) {
  // useState: Replace this.state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect: Combine componentDidMount, componentDidUpdate, componentWillUnmount
  useEffect(() => {
    console.log('Effect: Component mounted or id changed');

    // Equivalent to componentDidMount and componentDidUpdate
    let isMounted = true;
    setLoading(true);

    fetchData(id)
      .then(result => {
        // Prevent state updates if unmounted
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    // Equivalent to componentWillUnmount
    return () => {
      console.log('Cleanup: Component will unmount or dependencies changed');
      isMounted = false;
      cancelPendingRequests();
    };
  }, [id]); // Dependency array: only run if id changes

  // Additional effects can be separated by concern
  useEffect(() => {
    document.title = `Viewing item ${id}`;

    return () => {
      document.title = 'Default Title';
    };
  }, [id]);

  // useLayoutEffect: Run synchronously after DOM mutations
  useLayoutEffect(() => {
    // Use for DOM measurements or manipulations that must happen before paint
    const { height } = containerRef.current.getBoundingClientRect();
    setMeasuredHeight(height);
  }, [data]);

  // Equivalent to render
  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorDisplay error={error} />;
  return <div>{/* Render content */}</div>;
}
```

---

# Implementing Redux in a React Application

Here's how I would explain the process of implementing Redux in a React application during an interview:

**1. Install Required Packages**

```bash
npm install redux react-redux redux-thunk
# or
yarn add redux react-redux redux-thunk
```

**2. Create the Redux Store Structure**

First, I'd organize my Redux files following a feature-based structure:

```
src/
├── store/
│   ├── index.js             # Main store configuration
│   ├── rootReducer.js       # Combines all reducers
│   └── features/
│       ├── users/
│       │   ├── usersSlice.js   # Actions, reducers, selectors
│       │   └── usersThunks.js  # Async actions
│       └── products/
│           ├── productsSlice.js
│           └── productsThunks.js

```

**3. Configure the Store**

In `store/index.js`:

```jsx
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
```

**4. Create a Root Reducer**

In `store/rootReducer.js`:

```jsx
import { combineReducers } from 'redux';
import usersReducer from './features/users/usersSlice';
import productsReducer from './features/products/productsSlice';

const rootReducer = combineReducers({
  users: usersReducer,
  products: productsReducer
});

export default rootReducer;

```

**5. Create a Feature Slice**

In `store/features/users/usersSlice.js`:

```jsx
// Action Types
const FETCH_USERS_REQUEST = 'users/fetchRequest';
const FETCH_USERS_SUCCESS = 'users/fetchSuccess';
const FETCH_USERS_FAILURE = 'users/fetchFailure';

// Initial State
const initialState = {
  data: [],
  loading: false,
  error: null
};

// Reducer
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// Action Creators
export const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
export const fetchUsersSuccess = (users) => ({ type: FETCH_USERS_SUCCESS, payload: users });
export const fetchUsersFailure = (error) => ({ type: FETCH_USERS_FAILURE, payload: error });

// Selectors
export const selectUsers = (state) => state.users.data;
export const selectUsersLoading = (state) => state.users.loading;
export const selectUsersError = (state) => state.users.error;

```

**6. Create Thunks for Async Actions**

In `store/features/users/usersThunks.js`:

```jsx
import { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } from './usersSlice';

export const fetchUsers = () => async (dispatch) => {
  dispatch(fetchUsersRequest());
  try {
    const response = await fetch('https://api.example.com/users');
    const data = await response.json();
    dispatch(fetchUsersSuccess(data));
  } catch (error) {
    dispatch(fetchUsersFailure(error.message));
  }
};

```

**7. Connect Redux to React**

In `src/index.js`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

8. Use Redux in Components

In a component:

```jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, selectUsersLoading, selectUsersError } from '../store/features/users/usersSlice';
import { fetchUsers } from '../store/features/users/usersThunks';

function UsersList() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
```

**9. Modern Approach with Redux Toolkit (Optional)**

If asked about modern Redux, I'd mention Redux Toolkit:

```bash
npm install @reduxjs/toolkit
```

And show how it simplifies the implementation:

```jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://api.example.com/users');
    return response.json();
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default usersSlice.reducer;
```

These steps demonstrate a complete understanding of Redux implementation in a React application, from setup to usage in components, which is important knowledge for a senior frontend position at Freshworks.

---

### Virtual DOM

**Use**: Improves performance by minimising DOM operations and enables declarative UI programming.

The Virtual DOM is a lightweight JavaScript representation of the actual DOM. When state changes in a React application, instead of directly manipulating the browser's DOM (which is expensive), React first updates its Virtual DOM, then compares it with the previous version using a diffing algorithm, and finally only updates the real DOM with the necessary changes.
For example, imagine a list of 100 items where only one item changes. Without Virtual DOM, we might rebuild the entire list. With React's Virtual DOM, it identifies just the one changed item and only updates that specific node in the real DOM, making it much more performant.
This approach gives us both the developer-friendly declarative API where we describe what the UI should look like, and the performance benefits of minimal DOM operations.

---

## CSS & HTML Topics:

### Flexbox Layout

**Use**: One-dimensional layouts with dynamic sizing and efficient space distribution.

```jsx
.container {
  display: flex;
  flex-direction: row; /* or column */
  justify-content: space-between; /* horizontal alignment */
  align-items: center; /* vertical alignment */
  flex-wrap: wrap; /* allows items to wrap to next line */
  gap: 20px; /* spacing between items */
}

.item {
  flex: 1; /* grow and shrink equally */
}

.fixed-item {
  flex: 0 0 200px; /* don't grow, don't shrink, fixed width */
}
```

### CSS Grid Layout

**Use**: Two-dimensional layouts for complex page structures with precise placement control.

```jsx
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  grid-template-rows: auto 1fr auto; /* header, content, footer */
  gap: 20px;
  height: 100vh;
}

.header {
  grid-column: 1 / -1; /* span all columns */
}

.sidebar {
  grid-row: 2 / 3;
  grid-column: 1 / 2;
}

.main-content {
  grid-row: 2 / 3;
  grid-column: 2 / -1;
}

.footer {
  grid-column: 1 / -1;
}
```

### Box Model & Box Sizing

**Use**: Controlling component dimensions and spacing consistently across browsers.

```jsx
/* Default box model (content-box) */
.default-box {
  width: 100px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
  /* Total width: 100px + 40px (padding) + 10px (border) = 150px */
}

/* Border-box model */
.border-box {
  box-sizing: border-box;
  width: 100px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
  /* Total width: 100px (includes padding and border) */
}
```

### CSS Pseudo-selectors

**Use**: Styling elements based on state or position without adding extra markup.

`:hover` - Applies styles when a user moves their mouse pointer over an element.

`:active` - Applies styles during the moment an element is being clicked.

`:focus` - Applies styles when an element gains focus, typically through keyboard navigation or clicking.

`:first-child` - Selects an element that is the first child of its parent.

`:last-child` - Selects an element that is the last child of its parent.

`::before` - Creates a pseudo-element before the content of the selected element, often used with the content property.

`::after` - Creates a pseudo-element after the content of the selected element, commonly used for decorative elements or clearfix solutions.

---

## DSA Problems:

### Parenthesis Matching

**Use**: Validating properly nested expressions in code editors, mathematical expressions, or JSON parsers.

```jsx
function isBalancedParentheses(str) {
  const stack = [];
  
  // Maps closing brackets to their corresponding opening brackets
  const closingBrackets = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  // Set of opening brackets for quick lookup
  // Sets are optimized for membership checking with the .has() method, which operates in O(1) time complexity (constant time). 
  const openingBrackets = new Set(['(', '{', '[']);
  
  for (let char of str) {
    // If it's an opening bracket, push to stack
    if (openingBrackets.has(char)) {
      stack.push(char);
    }
    // If it's a closing bracket
    else if (closingBrackets[char]) {
      // Pop from stack and check if it matches the corresponding opening bracket
      const lastBracket = stack.pop();
      
      // If stack is empty or brackets don't match
      if (lastBracket !== closingBrackets[char]) {
        return false;
      }
    }
    // Ignore any other characters that aren't brackets
  }
  
  // Stack should be empty if all brackets are matched
  return stack.length === 0;
}
```

---

### Longest Palindromic Substring

**Use**: Text analysis, pattern matching algorithms, and certain string compression techniques.

### Merge Sorted Arrays

**Use**: Database merging operations, combining search results, and implementing efficient sorting algorithms.

```jsx
/**
 * Merges two sorted arrays into a single sorted array
 * @param {number[]} arr1 - First sorted array
 * @param {number[]} arr2 - Second sorted array
 * @returns {number[]} - Merged sorted array
 */
function mergeSortedArrays(arr1, arr2) {
  let result = [];
  let i = 0;
  let j = 0;
  
  // Compare elements from both arrays and add the smaller one to result
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }
  
  // Add remaining elements from arr1 if any
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  
  // Add remaining elements from arr2 if any
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }
  
  return result;
}

// Example usage:
// const array1 = [1, 3, 5, 7, 9];
// const array2 = [2, 4, 6, 8, 10];
// console.log(mergeSortedArrays(array1, array2));
// Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

---

### Count Occurrences of Each Char

```jsx
function countCharacters(str) {
    const arr =str.split("");
    
    return arr.reduce((acc,cur) => {
        acc[cur] = (acc[cur] || 0) + 1;
        return a;
    }, {});
}

const word = "aaaabbbbbbcccccccdd";
const result = countCharacters(word);

console.log(result);
// Output: { a: 4, b: 6, c: 7, d: 2 }

// To get specific counts:
console.log(`a: ${result['a']}`); // a: 4
console.log(`b: ${result['b']}`); // b: 6
console.log(`c: ${result['c']}`); // c: 7
```

### Word Frequency Count: Count the occurrences of each Word in a paragraph.

```jsx
function wordFrequencyCount(paragraph) {
  const arrayOfWords = paragraph
    .toLowerCase() // Convert to lowercase to count words case-insensitively
    .replace(/[^a-z\s]/g, "") // Remove punctuation
    .split(/\s+/); // Split by whitespace
	   
    return arrayOfWords.reduce((acc,cur) => {
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
    }, {});
}

// Example Usage:
const paragraph = "Hello world! Hello, Freshworks. Freshworks is great!";
console.log(wordFrequencyCount(paragraph));
```

### **Output:**

```json
{
  "hello": 2,
  "world": 1,
  "freshworks": 2,
  "is": 1,
  "great": 1
}
```

### **Explanation:**

1. **Convert to Lowercase**: Ensures that "Hello" and "hello" are treated as the same word.
2. **Remove Punctuation**: Cleans the text to only include words.
3. **Split into Words**: Uses whitespace as the delimiter.
4. **Count Occurrences**: Iterates through the array and maintains a frequency count.

This approach efficiently counts word occurrences in O(n) time complexity.

### LRU CACHE DESIGN

- Explanation
    
    LRU (Least Recently Used) Cache in JavaScript using a combination of a Map and a Doubly Linked List:
    
    1. **Map (HashMap)**: Provides O(1) lookups by key
    2. **Doubly Linked List**: Maintains the usage order of elements
    
    This implementation has these key properties:
    
    - **Constant Time Operations**: Both `get` and `put` operations run in O(1) time
    - **Capacity Limit**: When full, removes the least recently used item
    - **Usage Tracking**: Each access moves an item to the "most recently used" position
    
    The `get` method retrieves a value and marks it as recently used, while the `put` method adds or updates a value, evicting the least recently used item if at capacity.
    
    This pattern is commonly used in:
    
    - Browser caches
    - Database query caches
    - API response caching
    - Front-end state management
    
    The implementation uses helper methods to manage the linked list operations, keeping the core logic clean and maintainable.
    
- Usages
    
    An LRU (Least Recently Used) Cache is useful in many practical scenarios:
    
    1. **Browser Caching**: Browsers use LRU caching to store recently visited web pages, images, and other resources for faster access.
    2. **Database Query Caching**: Database systems cache query results, keeping frequently accessed data in memory while evicting less used queries.
    3. **API Request Caching**: Frontend applications can cache API responses to reduce network requests and improve loading times.
    4. **Frontend State Management**: In React applications, an LRU cache can help manage expensive calculations or large datasets.
    5. **File System Buffers**: Operating systems use LRU algorithms to manage which files stay in memory.
    6. **Content Delivery Networks (CDNs)**: CDNs use LRU caching to determine which content to keep at edge locations.
    7. **Mobile App Memory Management**: Mobile apps use LRU caching to manage limited device memory while maintaining performance.
    
    The key benefit is performance optimization through intelligent memory usage - it automatically keeps frequently accessed items available while removing those rarely used. This provides a good balance between memory usage and access speed.
    
    In technical interviews, implementing an LRU cache demonstrates your understanding of both data structures (maps and linked lists) and algorithm design patterns.
    
- Why used Map & LinkedList
    
    I used both a Map and a Doubly Linked List together because each solves a different part of the LRU Cache challenge:
    
    **The Map (HashMap)** provides:
    
    - O(1) time complexity for key lookups - we need to quickly check if a key exists and retrieve its value
    - Direct access to any node in the linked list by storing references to list nodes
    
    **The Doubly Linked List** provides:
    
    - A way to maintain the order of elements based on recency of use
    - O(1) time complexity for removing a node from any position (when we access an element)
    - O(1) time complexity for adding a node to the front (most recently used position)
    - O(1) time complexity for removing the least recently used node (from the end)
    
    Using just a Map alone wouldn't work because:
    
    - Maps don't have a built-in way to track access order
    - We wouldn't know which element to evict when the cache is full
    
    Using just a Linked List alone wouldn't work because:
    
    - Finding a key would require O(n) traversal of the list
    - We'd have no way to quickly check if a key exists
    
    The combination gives us the best of both worlds: fast lookups from the Map and efficient ordering/reordering from the Linked List, achieving O(1) time complexity for all operations.
    

```jsx
/**
 * LRU Cache implementation using a HashMap and a Doubly Linked List
 * Time Complexity:
 * - get: O(1)
 * - put: O(1)
 * - line this.cache = new Map(); is using a JavaScript Map object, which is JavaScript's built-in implementation of a hash map (or hash table).
 */
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // HashMap for O(1) lookups 
    this.head = new DoublyLinkedListNode(0, 0); // Dummy head
    this.tail = new DoublyLinkedListNode(0, 0); // Dummy tail
    
    // Connect head and tail
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  
  /**
   * Get value from cache by key
   * @param {number} key
   * @return {number} value or -1 if not found
   */
  get(key) {
    if (!this.cache.has(key)) {
      return -1; // Key not found
    }
    
    // Key found, get the node and move to front (most recently used)
    const node = this.cache.get(key);
    this.moveToFront(node);
    
    return node.value;
  }
  
  /**
   * Add or update cache entry
   * @param {number} key
   * @param {number} value
   */
  put(key, value) {
    // If key already exists, update it and move to front
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      node.value = value;
      this.moveToFront(node);
      return;
    }
    
    // Check if cache is at capacity
    if (this.cache.size >= this.capacity) {
      // Remove least recently used (tail.prev)
      const lruNode = this.tail.prev;
      this.removeNode(lruNode);
      this.cache.delete(lruNode.key);
    }
    
    // Add new node
    const newNode = new DoublyLinkedListNode(key, value);
    this.cache.set(key, newNode);
    this.addToFront(newNode);
  }
  
  /**
   * Remove a node from the doubly linked list
   * @param {DoublyLinkedListNode} node
   */
  removeNode(node) {
    const prevNode = node.prev;
    const nextNode = node.next;
    
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }
  
  /**
   * Add a node to the front of the doubly linked list (most recently used)
   * @param {DoublyLinkedListNode} node
   */
  addToFront(node) {
    node.next = this.head.next;
    node.prev = this.head;
    
    this.head.next.prev = node;
    this.head.next = node;
  }
  
  /**
   * Move an existing node to the front of the list (most recently used)
   * @param {DoublyLinkedListNode} node
   */
  moveToFront(node) {
    this.removeNode(node);
    this.addToFront(node);
  }
}

/**
 * Node for the doubly linked list
 */
class DoublyLinkedListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

// Usage example
const cache = new LRUCache(2);
console.log(cache.put(1, 1));     // logs undefined (and cached {1=1})
console.log(cache.put(2, 2));     // logs undefined (and cached {1=1, 2=2})
console.log(cache.get(1));        // logs 1 (correct)
console.log(cache.put(3, 3));     // logs undefined (and cached {1=1, 3=3})
console.log(cache.get(2));        // logs -1 (correct)
console.log(cache.put(4, 4));     // logs undefined (and cached {3=3, 4=4})
console.log(cache.get(1));        // logs -1 (correct)
console.log(cache.get(3));        // logs 3 (correct)
console.log(cache.get(4));        // logs 4 (correct)
```

### SortBy using mergeSort

```jsx
function sortBy(arr, keys) {
    if (!Array.isArray(keys)) {
        keys = [keys]; // Convert single key to an array for consistency
    }

    return mergeSort(arr, keys);
}

function mergeSort(arr, keys) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid), keys);
    const right = mergeSort(arr.slice(mid), keys);

    return merge(left, right, keys);
}

function merge(left, right, keys) {
    let sortedArr = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (compareObjects(left[i], right[j], keys) <= 0) {
            sortedArr.push(left[i]);
            i++;
        } else {
            sortedArr.push(right[j]);
            j++;
        }
    }

    return [...sortedArr, ...left.slice(i), ...right.slice(j)];
}

function compareObjects(a, b, keys) {
    for (let key of keys) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
    }
    return 0;
}

// Example Usage:
const users = [
    { id: 3, name: "Charlie" },
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

console.log(sortBy(users, "id"));
// Output: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
```

---

- **Set**
    - **Resource**
        
        [JavaScript Data Structures - Sets](https://youtu.be/bFZjTIQIneY)
        
    
    Set is a collection of unique elements, In sets there will not be any duplicate elements
    
    In JavaScript, a Set is a built-in data structure that represents a collection of unique values. It is similar to an array, but with no duplicate values allowed.
    
    Here's an example of how to use a Set in JavaScript
    
    ```jsx
    const mySet = new Set();
    
    // Add elements to the set
    // We can add with multiple add in same line as well
    mySet.add('apple');
    mySet.add('banana').add('orange');
    mySet.add('apple'); // this will not add a duplicate
    
    // Check the size of the set
    console.log(mySet.size); // Output: 3
    // Print the set array
    console.log(mySet); // ['apple','banana','orange']
    
    // Check if a value is in the set
    console.log(mySet.has('apple')); // Output: true
    console.log(mySet.has('grape')); // Output: false
    
    console.log(mySet.entries()); // {[ 'apple', 'apple' ],[ 'banana', 'banana' ],[ 'orange', 'orange' ]}
    console.log(mySet.keys()); // { 'apple', 'banana', 'orange' }
    console.log(mySet.values()); // { 'apple', 'banana', 'orange' }
    
    // Iterate over the set
    mySet.forEach((value) => {
      console.log(value);
    });
    
    // delete an element from the set
    mySet.delete('banana');
    
    const set2 = new Set([1,2,"apple"]);
    const union = new Set([...mySet, ...set2]); // { 'apple', 'orange', 1, 2 }
    console.log(union); // { 'apple', 'orange', 1, 2 }
    
    // clear all elements from the set
    mySet.clear();
    ```
    
    In this example, we create a new Set using the `new Set()` syntax. We then add four elements to the set using the `add()` method. Notice that we add "apple" twice, but the Set only stores one instance of the value because it doesn't allow duplicates.
    
    We then use the `size` property to check the number of elements in the Set, and the `has()` method to check whether a specific value is in the Set.
    
    To iterate over the Set, we use the `forEach()` method, which takes a callback function that is called for each element in the Set.
    
    We also demonstrate how to remove an element from the Set using the `delete()` method, and how to clear all elements from the Set using the `clear()` method.
    
- **Map**
    
    The `Map` object in JavaScript is a collection of key-value pairs where both keys and values can be of any type. Unlike objects, Maps maintain insertion order and allow any value (including objects) as keys.
    
    **Core Methods**
    
    1. **Creating a Map**
        
        ```jsx
        // Empty Map
        const map1 = new Map();
        
        // Initialize with entries
        const map2 = new Map([
          ['key1', 'value1'],
          ['key2', 'value2']
        ]);
        ```
        
    2. **set(key, value)**
        
        Adds or updates an entry in the map.
        
        ```jsx
        const userMap = new Map();
        userMap.set('name', 'John'); // Map(1) {"name" => "John"}
        userMap.set(42, 'answer'); // Map(2) {"name" => "John", 42 => "answer"}
        ```
        
    3. **get(key)**
        
        Returns the value associated with the key, or undefined if the key doesn't exist.
        
        ```jsx
        userMap.get('name'); // "John"
        userMap.get('age'); // undefined
        ```
        
    4. **has(key)**
        
        Returns a boolean indicating whether the key exists in the map.
        
        ```jsx
        userMap.has('name'); // true
        userMap.has('age'); // false
        ```
        
    5. **delete(key)**
        
        Removes the specified entry and returns true if the entry existed.
        
        ```jsx
        userMap.delete('name'); // true
        userMap.delete('age'); // false (key didn't exist)
        ```
        
    
    6. clear()
    
    Removes all entries from the map.
    
    ```jsx
    userMap.clear(); // Map(0) {}
    ```
    
    1. size
        
        Property (not a method) that returns the number of entries.
        
        ```jsx
        const fruitMap = new Map([
          ['apple', 5],
          ['banana', 10]
        ]);
        fruitMap.size; // 2
        ```
        
    2. keys()
        
        Returns an iterator of all keys in insertion order.
        
        ```jsx
        const keyIterator = fruitMap.keys();
        Array.from(keyIterator); // ["apple", "banana"]
        ```
        
    3. values()
        
        Returns an iterator of all values in insertion order.
        
        ```jsx
        const valueIterator = fruitMap.values();
        Array.from(valueIterator); // [5, 10]
        ```
        
    4. entries()
        
        Returns an iterator of [key, value] pairs in insertion order.
        
        ```jsx
        const entryIterator = fruitMap.entries();
        Array.from(entryIterator); // [["apple", 5], ["banana", 10]]
        ```
        
    5. forEach(callbackFn)
        
        Executes a function for each key-value pair.
        
        ```jsx
        fruitMap.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });
        // Output:
        // apple: 5
        // banana: 10
        ```
        
    
    ## Common Use Cases
    
    ### Caching with Complex Keys
    
    ```jsx
    const requestCache = new Map();
    
    function fetchData(endpoint, params) {
      const key = JSON.stringify({ endpoint, params });
      if (requestCache.has(key)) {
        return requestCache.get(key);
      }
    
      const data = performActualFetch(endpoint, params);
      requestCache.set(key, data);
      return data;
    }
    ```
    
    ### Frequency Counter
    
    ```jsx
    function countCharacters(str) {
      const charMap = new Map();
    
      for (const char of str) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
      }
    
      return charMap;
    }
    
    countCharacters("hello"); // Map(4) {"h" => 1, "e" => 1, "l" => 2, "o" => 1}
    
    ```
    
    ### Object as Keys
    
    ```jsx
    const userRoles = new Map();
    const user1 = { id: 1, name: "Alice" };
    const user2 = { id: 2, name: "Bob" };
    
    userRoles.set(user1, "admin");
    userRoles.set(user2, "editor");
    
    userRoles.get(user1); // "admin"
    
    ```
    
    ### Converting Between Maps and Arrays/Objects
    
    ```jsx
    // Object to Map
    const obj = { name: "John", age: 30 };
    const map = new Map(Object.entries(obj));
    
    // Map to Object
    const objFromMap = Object.fromEntries(map.entries());
    
    // Map to Array
    const array = Array.from(map); // [["name", "John"], ["age", 30]]
    
    ```
    
    Maps are powerful data structures for many modern JavaScript applications, especially when you need to maintain key order, use non-string keys, or frequently add and remove properties.
    
- **Array**
    - **Resource**
        
        [JavaScript Data Structures - Arrays](https://youtu.be/bzknBUbLYXs)
        
    
    Array is a simple container in memory, that allows us to group elements (or item) together
    
    In JavaScript, an array is a built-in data structure that represents a collection of values, similar to a list. Arrays are ordered collections, meaning that each value in the array has an index that indicates its position in the array.
    
    Note that arrays in JavaScript can hold values of any data type, including numbers, strings, objects, and even other arrays. Additionally, arrays in JavaScript are dynamically sized, meaning that their length can change during runtime.
    
    1. `push()`: Adds one or more elements to the end of an array and returns the new length of the array.
    
    ```jsx
    const myArray = [1, 2, 3];
    myArray.push(4, 5);
    console.log(myArray); // Output: [1, 2, 3, 4, 5]
    ```
    
    1. `pop()`: Removes the last element from an array and returns that element.
    
    ```jsx
    const myArray = [1, 2, 3];
    const lastElement = myArray.pop();
    console.log(lastElement); // Output: 3
    console.log(myArray); // Output: [1, 2]
    ```
    
    1. `shift()`: Removes the first element from an array and returns that element.
    
    ```jsx
    const myArray = [1, 2, 3];
    const firstElement = myArray.shift();
    console.log(firstElement); // Output: 1
    console.log(myArray); // Output: [2, 3]
    ```
    
    1. `unshift()`: Adds one or more elements to the beginning of an array and returns the new length of the array.
    
    ```jsx
    const myArray = [1, 2, 3];
    myArray.unshift(0);
    console.log(myArray); // Output: [0, 1, 2, 3]
    ```
    
    1. `concat()`: Joins two or more arrays and returns a new array that contains all the elements of the original arrays.
    
    ```jsx
    const myArray1 = [1, 2];
    const myArray2 = [3, 4];
    const concatenatedArray = myArray1.concat(myArray2);
    console.log(concatenatedArray); // Output: [1, 2, 3, 4]
    ```
    
    1. `slice()`: Returns a new array that contains a portion of the original array.
    
    ```jsx
    const myArray = [1, 2, 3, 4, 5];
    const slicedArray = myArray.slice(1, 4);
    console.log(slicedArray); // Output: [2, 3, 4]
    ```
    
    1. `splice()`: Modify the original array that contains a portion of the original array.
    
    ```jsx
    const myArray = [1, 2, 3, 4, 5];
    myArray.splice(3, 0, '10');
    console.log(myArray); 
    // This is how our original array looks now: [ 1, 2, 3, '10', 4, 5 ]
    // If we want to remove '10' means
    myArray.splice(3, 1); // Output: [ 1, 2, 3, 4, 5 ]
    // If you want replace 2nd elemnt 2 with 3 means
    myArray.splice(1, 1, 3); // Output: [ 1, 3, 3, 4, 5 ]
    ```
    
    1. `join():` This method creates and returns a new string by concatenating all of the elements in an array, separated by a specified separator string.
    
    ```jsx
    const myArray = ['Hello', 'World', '!'];
    const result = myArray.join(' ');
    console.log(result); // Output: 'Hello World !'
    ```
    
    1. `indexOf()`: This method returns the index of the first occurrence of a specified value in an array, or -1 if the value is not found.
    
    ```jsx
    const myArray = ['apple', 'banana', 'orange'];
    const index = myArray.indexOf('banana');
    console.log(index); // Output: 1
    ```
    
    1. `lastIndexOf()`: This method returns the index of the last occurrence of a specified value in an array, or -1 if the value is not found.
    
    ```jsx
    const myArray = ['apple', 'banana', 'orange', 'banana'];
    const index = myArray.lastIndexOf('banana');
    console.log(index); // Output: 3
    ```
    
    1. `findIndex()` method returns the index of the first element in the array that satisfies the provided testing function; otherwise, it returns -1.
    
    ```jsx
    const numbers = [1, 2, 3, 4];
    const index = numbers.findIndex((num) => {
      return num > 2;
    });
    
    console.log(index); // Output: 2
    ```
    
    1. `reverse()`: This method reverses the order of the elements in an array.
    
    ```jsx
    const myArray = ['apple', 'banana', 'orange'];
    myArray.reverse();
    console.log(myArray); // Output: ['orange', 'banana', 'apple']
    ```
    
    1. `sort()`: This method sorts the elements in an array in ascending order, or according to a specified sorting function.
    
    ```jsx
    const myArray = [3, 1, 11, 4, 1, 5, 9];
    myArray.sort((a, b) => a - b);
    console.log(myArray); // Output: [1, 1, 3, 4, 5, 9, 11]
    ```
    
    1. `find()`: This method returns the value of the first element in an array that satisfies a provided testing function.
    
    ```jsx
    const myArray = [1, 2, 3, 4, 5];
    const result = myArray.find((element) => element > 3);
    console.log(result); // Output: 4
    ```
    
    1. `filter()`: This method creates a new array with all elements that pass a provided testing function.
    
    ```jsx
    const myArray = [1, 2, 3, 4, 5];
    const result = myArray.filter((element) => element % 2 === 0);
    console.log(result); // Output: [2, 4]
    ```
    
    1. `map()`: This method creates a new array with the results of calling a provided function on every element in the array.
    
    ```jsx
    const myArray = [1, 2, 3, 4, 5];
    const newArray = myArray.map(element => element * 2)
    console.log(result); // Output: [2, 4, 6, 8, 10]
    ```
    
    1. `forEach()`: This method executes a provided function once for each array element.
    
    ```jsx
    const myArray = [1, 2, 3, 4, 5];
    
    myArray.forEach((element) => {
      console.log(element * 2);
    });
    
    // Output 2 4 6 8 10
    ```
    
    1. `reduce()`: This method applies a function to each element in the array to reduce the array to a single value.
    
    ```jsx
    
    const myArray = [1, 2, 3, 4, 5];
    
    const reducedValue = myArray.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    
    console.log(reducedValue); // 15
    ```
    
    1. `every()`: This method tests whether all elements in the array pass the test implemented by the provided function.
    
    ```jsx
    const myArray = [1, 2, 3, 4, 5];
    
    const allGreaterThanZero = myArray.every((element) => {
      return element > 0;
    });
    console.log(allGreaterThanZero); // Output: true
    
    const allGreaterThanThree = myArray.every((element) => {
      return element > 3;
    });
    console.log(allGreaterThanThree); // Output: false
    ```
    
    1. `some()`: This method tests whether at least one element in the array passes the test implemented by the provided function.
    
    ```jsx
    const myArray = [1, 2, 3, 4, 5];
    
    const someGreaterThanThree = myArray.some((element) => {
      return element > 3;
    });
    console.log(someGreaterThanThree); // Output: true
    ```
    
    1. `fill()` method fills all the elements of an array from a start index to an end index with a static value.
    
    ```jsx
    const numbers = [1, 2, 3, 4];
    // The fill() method fills specified elements in an array with a value.
    // The fill() method overwrites the original array.
    // Start and end position can be specified. If not, all elements will be filled.
    // array.fill(value, start, end)
    // array.fill(Required, Optional, Optional (defalut end))
    numbers.fill(0, 1, 3);
    
    console.log(numbers); // Output: [1, 0, 0, 4]
    ```
    
    1. `includes()` method determines whether an array includes a certain value among its entries, returning `true` or `false` as appropriate.
    
    ```jsx
    const numbers = [1, 2, 3, 4];
    const hasThree = numbers.includes(3);
    const hasTen = numbers.includes(10);
    
    console.log(hasThree); // Output: true
    console.log(hasTen); // Output: false
    ```
    
    1. `flat()` method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
    
    ```jsx
    const numbers = [1, 2, [3, 4], [5, [6, 7]]];
    
    const flattened = numbers.flat(1);
    console.log(flattened); // Output: [ 1, 2, 3, 4, 5, [ 6, 7 ] ]
    
    // Infinity means till every Array
    const infinityFlayOFArray = numbers.flat(Infinity); 
    console.log(infinityFlayOFArray); // Output: [1, 2, 3, 4, 5, 6, 7]
    ```
    
    1. `reduceRight()` method applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value.
    
    ```jsx
    const numbers = [1, 2, 3, 4];
    const result = numbers.reduceRight((accumulator, currentValue) => {
      return accumulator - currentValue;
    });
    
    console.log(result); // Output: -2
    ```
    
    These are just a few of the many built-in functions available for the Array data structure in JavaScript.
    
- **String**
    1. `charAt()`: This method returns the character at the specified index in a string.
        
        ```jsx
        const str = "hello world";
        console.log(str.charAt(0)); // "h"
        ```
        
    2. `concat()`: This method joins two or more strings together.
        
        ```jsx
        const str1 = "hello";
        const str2 = "world";
        console.log(str1.concat(" ", str2)); // "hello world"
        ```
        
    3. `includes()`: This method checks whether a string contains another string or not and returns a boolean value.
        
        ```jsx
        const str = "hello world";
        console.log(str.includes("world")); // true
        console.log(str.includes("foo")); // false
        ```
        
    4. `indexOf()`: This method returns the index of the first occurrence of a specified substring in a string.
        
        ```jsx
        const str = "hello world";
        console.log(str.indexOf("world")); // 6
        console.log(str.indexOf("foo")); // -1
        ```
        
    5. `lastIndexOf()`: This method returns the index of the last occurrence of a specified substring in a string.
        
        ```jsx
        const str = "hello world";
        console.log(str.lastIndexOf("o")); // 7
        console.log(str.lastIndexOf("foo")); // -1
        ```
        
    6. `padEnd()`: This method pads a string with a specified character until it reaches a specified length.
        
        ```jsx
        const str = "hello";
        console.log(str.padEnd(10, "*")); // "hello*****"
        ```
        
    7. `replace()`: This method replaces a specified substring with another string.
        
        ```jsx
        const str = "hello world";
        console.log(str.replace("world", "foo")); // "hello foo"
        ```
        
    8. `slice()`: This method extracts a section of a string and returns a new string.
        
        ```jsx
        const str = "hello world";
        console.log(str.slice(0, 5)); // "hello"
        console.log(str.slice(-5)); // "world"
        ```
        
    9. `split()`: This method splits a string into an array of substrings based on a specified separator.
        
        ```jsx
        const str = "hello world";
        console.log(str.split(" ")); // ["hello", "world"]
        ```
        
    10. `toLowerCase()`: This method converts a string to lowercase.
        
        ```jsx
        const str = "Hello World";
        console.log(str.toLowerCase()); // "hello world"
        ```
        
    11. `toUpperCase()`: This method converts a string to uppercase.
        
        ```jsx
        const str = "Hello World";
        console.log(str.toUpperCase()); // "HELLO WORLD"
        ```
        
    12. `substring(startIndex, endIndex)`: This method returns a new substring from a string, starting at the specified start index and ending at the specified end index (exclusive). If the end index is not specified, the method will extract the substring until the end of the string.
        
        ```jsx
        const str = "Hello world";
        const subStr1 = str.substring(1, 4); // "ell"
        const subStr2 = str.substring(3); // "lo world"
        ```
        
    13. `trim()`: This method removes whitespace from both ends of a string.
        
        ```jsx
        const str = "   Hello world    ";
        const trimmedStr = str.trim(); // "Hello world"
        ```
        
    14. `startsWith(searchString, position)`: This method checks whether a string starts with a specified substring. The `position` parameter is optional, and specifies the position in the string at which to begin searching for the substring.
        
        ```jsx
        const str = "Hello world";
        const startsWithHello = str.startsWith("Hello"); // true
        const startsWithWorld = str.startsWith("World"); // false
        const startsWithWorldAtIndex6 = str.startsWith("World", 6); // true
        ```
        
    15. `endsWith(searchString, length)`: This method checks whether a string ends with a specified substring. The `length` parameter is optional, and specifies the number of characters from the end of the string to include in the search.
        
        ```jsx
        const str = "Hello world";
        const endsWithWorld = str.endsWith("world"); // true
        const endsWithHello = str.endsWith("Hello"); // false
        const endsWithLo = str.endsWith("lo", 5); // true
        ```
        
    16. `repeat(count)`: This method returns a new string with a specified number of copies of the original string.
        
        ```jsx
        const str = "abc";
        const repeatedStr = str.repeat(3); // "abcabcabc"
        ```
        
    17. `substr(startIndex, length)`: This method returns a new substring from a string, starting at the specified start index and with the specified length. If the length is not specified, the method will extract the substring until the end of the string.
        
        ```jsx
        const str = "Hello world";
        const subStr1 = str.substr(1, 3); // "ell"
        const subStr2 = str.substr(3); // "lo world"
        ```
        
    18. `search(regexp)`: This method searches a string for a specified pattern (regular expression), and returns the index of the first match.
        
        ```jsx
        const str = "The quick brown fox jumps over the lazy dog";
        const index1 = str.search(/brown/i); // 10 (case-insensitive match)
        const index2 = str.search(/cat/i); // -1 (no match)
        ```
        
    19. `match(regexp)`: This method searches a string for a specified pattern (regular expression), and returns an array of all matches.
        
        ```jsx
        const str = "The quick brown fox jumps over the lazy dog";
        const matches = str.match(/the/gi); // ["The", "the"]
        ```
        
    20. `endsWith(searchString, length)`: This method checks whether a string ends with a specified substring. The `length` parameter is optional, and specifies the number of characters from the end of the string to include in the search.
        1. **`searchString`** (required): This is the string that we want to search for at the end of the original string.
        2. **`length`** (optional): This is the length of the original string that should be considered for the search. If this parameter is not specified, the entire string will be searched.
        
        ```jsx
        const str = "Hello World";
        console.log(str.endsWith("World")); // true
        console.log(str.endsWith("World", 5)); // false
        ```
        
- **Object**
    1. **Object.keys(obj)**
        - Returns an array of a given object's own property names.
        
        ```jsx
        const user = { id: 1, name: "John" };
        console.log(Object.keys(user)); // ['id', 'name']
        ```
        
    2. **Object.values(obj)**
        - Returns an array of a given object's own enumerable property values.
        
        ```jsx
        console.log(Object.values(user)); // [1, "John"]
        ```
        
    3. **Object.entries(obj)**
        - Returns an array of key-value pairs of a given object's own properties.
        
        ```jsx
        console.log(Object.entries(user)); // [['id', 1], ['name', 'John']]
        ```
        
    4. **Object.fromEntries(arr)**
        - Converts an array of key-value pairs into an object.
        
        ```jsx
        const entries = [['id', 1], ['name', 'John']];
        console.log(Object.fromEntries(entries)); // { id: 1, name: 'John' }
        ```
        
    5. **Object.assign(target, ...sources)**
        - Copies the values of all enumerable properties from one or more source objects to a target object.
        
        ```jsx
        const obj1 = { a: 1 };
        const obj2 = { b: 2 };
        console.log(Object.assign(obj1, obj2)); // { a: 1, b: 2 }
        ```
        
    6. **Object.freeze(obj)**
        - Prevents modification of an object's properties and values.
        
        ```jsx
        const obj = { name: "John" };
        Object.freeze(obj);
        obj.name = "Mike"; // No effect
        console.log(obj); // { name: "John" }
        ```
        
    7. **Object.seal(obj)**
        - Prevents new properties from being added but allows modification of existing properties.
        
        ```jsx
        Object.seal(obj);
        obj.name = "Mike"; // Allowed
        obj.age = 30; // Not allowed
        ```
        
    8. **Object.hasOwnProperty(prop)**
        - Checks if an object has a property as its own (not inherited).
        
        ```jsx
        console.log(user.hasOwnProperty("name")); // true
        ```
        
    9. **Object.getOwnPropertyNames(obj)**
        - Returns an array of all properties (enumerable and non-enumerable) of an object.
        
        ```jsx
        console.log(Object.getOwnPropertyNames(user)); // ['id', 'name']
        ```
        
    10. **Object.getOwnPropertyDescriptors(obj)**
        - Returns all own property descriptors of an object.
        
        ```jsx
        console.log(Object.getOwnPropertyDescriptors(user));
        ```
        
    11. **Object.create(proto, [propertiesObject])**
        - Creates a new object with the specified prototype object and properties.
        
        ```jsx
        const person = { greet: () => "Hello" };
        const user1 = Object.create(person);
        console.log(user1.greet()); // "Hello"
        ```
        
    12. **Object.defineProperty(obj, prop, descriptor)**
        - Defines a new property directly on an object.
        
        ```jsx
        Object.defineProperty(user, "age", { value: 30, writable: false });
        console.log(user.age); // 30
        ```
        
    13. **Object.defineProperties(obj, props)**
        - Defines multiple new properties directly on an object.
        
        ```jsx
        Object.defineProperties(user, {
          city: { value: "Chennai", writable: true },
          country: { value: "India", writable: false },
        });
        ```
        
    14. **Object.is(value1, value2)**
        - Compares if two values are the same.
        
        ```jsx
        console.log(Object.is(0, -0)); // false
        console.log(Object.is(NaN, NaN)); // true
        ```
        
    15. **Object.isFrozen(obj)**
        - Checks if an object is frozen.
        
        ```jsx
        console.log(Object.isFrozen(obj)); // true
        ```
        
    16. **Object.isSealed(obj)**
        - Checks if an object is sealed.
        
        ```jsx
        console.log(Object.isSealed(obj)); // true
        ```
        
    17. **Object.toString()**
        - Returns a string representation of an object.
        
        ```jsx
        console.log(user.toString()); // "[object Object]"
        ```
        
    18. **Object.getOwnPropertyDescriptor(obj, prop)**
        
        Retrieves the descriptor for a specific property on an object, detailing its configuration.
        
        ```jsx
        const user = { name: "Alice" };
        const descriptor = Object.getOwnPropertyDescriptor(user, "name");
        console.log(descriptor);
        // Output: { value: 'Alice', writable: true, enumerable: true, configurable: true }
        ```
        
    19. **Object.getOwnPropertySymbols(obj)**
        
        Returns an array of all symbol properties found directly upon a given object.
        
        ```jsx
        const sym1 = Symbol("id");
        const user = { [sym1]: 123 };
        console.log(Object.getOwnPropertySymbols(user)); // [Symbol(id)]
        ```
        
    20. **Object.getPrototypeOf(obj)**
        
        Returns the prototype (i.e., the internal `[[Prototype]]` property) of the specified object.
        
        ```jsx
        const user = {};
        const proto = Object.getPrototypeOf(user);
        console.log(proto === Object.prototype); // true
        ```
        
    21. **Object.hasOwn(obj, prop)**
        
        Determines whether the object has the specified property as its own property (as opposed to inheriting it).
        
        ```jsx
        const user = { name: "Alice" };
        console.log(Object.hasOwn(user, "name")); // true
        console.log(Object.hasOwn(user, "toString")); // false
        ```
        
    22. **Object.isExtensible(obj)**
        
        Determines if an object is extensible (i.e., whether new properties can be added to it).
        
        ```jsx
        const user = {};
        console.log(Object.isExtensible(user)); // true
        Object.preventExtensions(user);
        console.log(Object.isExtensible(user)); // false
        ```
        
    23. **Object.preventExtensions(obj)**
        
        Prevents new properties from ever being added to an object (i.e., prevents future extensions to the object).
        
        ```jsx
        const user = { name: "Alice" };
        Object.preventExtensions(user);
        user.age = 30; // This will not be added
        console.log(user.age); // undefined
        ```
        
    24. **Object.setPrototypeOf(obj, prototype)**
        
        Sets the prototype (i.e., the internal `[[Prototype]]` property) of a specified object to another object or `null`.
        
        ```jsx
        const user = {};
        const proto = { greet() { return "Hello"; } };
        Object.setPrototypeOf(user, proto);
        console.log(user.greet()); // "Hello"
        ```
        
    
    These methods provide deeper control and introspection capabilities over JavaScript objects, which are crucial for advanced programming tasks. Understanding and effectively utilizing these methods will be beneficial for your interview preparation.
    
- **Number**
    - Resource
        
        [📌12 JavaScript Number Methods Cheatsheet](https://dev.to/catherineisonline/12-javascript-number-methods-cheatsheet-1oie)
        
    1. `Number.isFinite()` is a static method in JavaScript that determines whether the passed value is a finite number. It returns `true` if the passed value is a number that is neither `Infinity` nor `NaN`, otherwise it returns `false`.
        
        Here's an example usage of `Number.isFinite()`:
        
        ```jsx
        console.log(Number.isFinite(42)); // true
        console.log(Number.isFinite(Infinity)); // false
        console.log(Number.isFinite(-Infinity)); // false
        console.log(Number.isFinite(NaN)); // false
        console.log(Number.isFinite('42')); // false
        console.log(Number.isFinite(null)); // false
        ```
        
        In the example above, `Number.isFinite()` returns `true` for the number `42`, because it is a finite number. It returns `false` for `Infinity`, `-Infinity`, and `NaN`, because they are not finite numbers. It also returns `false` for non-numeric values like the string `'42'` and `null`.
        
    2. `Number.isInteger()` is a built-in method in JavaScript that checks whether a given value is an integer or not. It returns `true` if the value is an integer, and `false` if it is not.
        
        The method checks if the given value is a number and if it has no fractional part. If the value is not a number or has a fractional part, then `Number.isInteger()` returns `false`.
        
        Here's an example:
        
        ```jsx
        console.log(Number.isInteger(5)); // true
        console.log(Number.isInteger(5.0)); // true
        console.log(Number.isInteger(5.1)); // false
        console.log(Number.isInteger('5')); // false
        console.log(Number.isInteger(null)); // false
        ```
        
        In this example, `Number.isInteger()` returns `true` for `5` and `5.0` because both are integers. However, it returns `false` for `5.1` because it has a fractional part. Similarly, it returns `false` for `'5'` because it is a string, not a number. Finally, it returns `false` for `null` because `null` is not a number.
        
    3. `Number.isNaN()` is a method in JavaScript used to determine whether a given value is `NaN` (Not-A-Number) or not. This method returns `true` if the given value is `NaN`, and `false` if the value is not `NaN`.
        
        The `Number.isNaN()` method is different from the global `isNaN()` function in JavaScript. The `isNaN()` function also returns `true` if the value passed to it is not a number (such as a string or boolean value), in addition to returning `true` for `NaN`.
        
        Here is an example of using `Number.isNaN()`:
        
        ```jsx
        console.log(Number.isNaN(NaN)); // true
        console.log(Number.isNaN(5)); // false
        console.log(Number.isNaN('hello')); // false
        console.log(Number.isNaN(true)); // false
        console.log(isNaN('hello')); // true (using global isNaN() function)
        ```
        
        In the above example, `Number.isNaN()` returns `true` for `NaN`, and `false` for all other values. The global `isNaN()` function, on the other hand, returns `true` for the string `'hello'` because it is not a number.
        
    4. The `Number.isSafeInteger()` method in JavaScript is used to determine whether the provided value is a safe integer or not. A safe integer is an integer that can be exactly represented as a 53-bit signed integer.
        
        The method returns `true` if the value is a safe integer, `false` otherwise. The method does not perform any type coercion, meaning that the value passed to it must be of the `number` type and not a string or any other type.
        
        Here's an example usage of `Number.isSafeInteger()`:
        
        ```jsx
        console.log(Number.isSafeInteger(1234567890123456)); // true
        console.log(Number.isSafeInteger(12345678901234567890)); // false
        console.log(Number.isSafeInteger(1.23)); // false
        console.log(Number.isSafeInteger('123')); // false
        ```
        
        In the above example, the first call to `Number.isSafeInteger()` returns `true` because `1234567890123456` is a safe integer. The second call returns `false` because `12345678901234567890` is not a safe integer. The third and fourth calls return `false` because the passed values are not of the `number` type.
        
    5. `Number.parseFloat()` is a built-in function in JavaScript that parses a string argument and returns a floating point number. The function parses a string until it reaches a character that cannot be converted to a number and returns the number that it has parsed so far.
        
        For example:
        
        ```jsx
        const num1 = Number.parseFloat('10.5');
        console.log(num1); // 10.5
        
        const num2 = Number.parseFloat('10.5 is a float');
        console.log(num2); // 10.5
        ```
        
        In the first example, the function returns the number 10.5 after parsing the string '10.5'. In the second example, the function stops parsing the string at the space character after the number 10.5 and returns the number 10.5.
        
        If the first character of the string cannot be converted to a number, `Number.parseFloat()` returns `NaN` (Not a Number):
        
        ```jsx
        const num3 = Number.parseFloat('not a number');
        console.log(num3); // NaN
        ```
        
    6. `Number.parseInt()` is a built-in method in JavaScript used to parse a string and convert it to an integer. It takes two arguments: the first argument is the string to be parsed and the second argument is an optional radix (base) of the number.
        
        The syntax for `Number.parseInt()` is:
        
        ```jsx
        Number.parseInt(string, radix)
        ```
        
        Here, `string` is the string to be parsed, and `radix` is an optional argument that specifies the base of the number to be parsed. The value of radix can be between 2 and 36. If `radix` is not specified, `Number.parseInt()` assumes a base of 10.
        
        For example, consider the following code:
        
        ```jsx
        const str = '123';
        const num = Number.parseInt(str);
        console.log(num); // Output: 123
        ```
        
        In the above example, we have a string `'123'` which is converted to an integer using `Number.parseInt()`. The resulting value is assigned to the variable `num`, which is then logged to the console.
        
        If the string to be parsed is not a valid number or if the radix is invalid, `Number.parseInt()` returns `NaN`.
        
        ```jsx
        const str = 'abc';
        const num = Number.parseInt(str);
        console.log(num); // Output: NaN
        ```
        
        In this example, the string `'abc'` cannot be parsed as an integer, so `Number.parseInt()` returns `NaN`.
        
    7. `Number.prototype.toExponential()` is a method in JavaScript that returns a string representing the number in exponential notation (scientific notation) with one digit before the decimal point and a specified number of digits after the decimal point.
        
        The syntax of the `toExponential()` method is as follows:
        
        ```jsx
        num.toExponential(fractionDigits)
        ```
        
        Here, `num` is the number you want to convert to exponential notation, and `fractionDigits` is the number of digits after the decimal point. If `fractionDigits` is not specified, it defaults to as many digits as necessary to represent the value.
        
        For example:
        
        ```jsx
        let num = 123456;
        
        console.log(num.toExponential()); // Output: 1.23456e+5
        console.log(num.toExponential(2)); // Output: 1.23e+5
        console.log(num.toExponential(6)); // Output: 1.234560e+5
        ```
        
        In the first example, `fractionDigits` is not specified, so the method uses as many digits as necessary to represent the value. In the second example, `fractionDigits` is 2, so the method rounds the number to two digits after the decimal point. In the third example, `fractionDigits` is 6, so the method adds zeros after the fifth digit to have six digits after the decimal point.
        
    8. `Number.prototype.toFixed()` is a built-in function in JavaScript that returns a string representation of a given number in fixed-point notation. It takes an argument `digits` which specifies the number of digits to appear after the decimal point.
        
        Syntax:
        
        ```jsx
        numObj.toFixed(digits)
        ```
        
        Parameters:
        
        - `digits` (optional) - The number of digits to appear after the decimal point. This parameter is optional and its default value is 0.
        
        Return value:
        
        - A string representation of the given number in fixed-point notation.
        
        Example:
        
        ```jsx
        const num = 3.14159;
        console.log(num.toFixed());    // Output: 3
        console.log(num.toFixed(2));  // Output: 3.14
        console.log(num.toFixed(4));  // Output: 3.1416
        ```
        
        In the above example, `toFixed()` method is used to format the given number `num` with specific number of digits after the decimal point. If the `digits` parameter is not passed or set to 0, then `toFixed()` will return a whole number. If the `digits` parameter is greater than the number of digits after the decimal point, then `toFixed()` will add zeros after the last digit. If the `digits` parameter is less than the number of digits after the decimal point, then `toFixed()` will round the last digit according to standard rounding rules.
        
    9. The `Number.prototype.toLocaleString()` method is used to return a string with a language-sensitive representation of the number. It converts the number to a string using a specific locale and format. The locale is determined by the user's browser settings or can be set manually.
        
        The `toLocaleString()` method has several parameters, but the most commonly used parameter is the `locales` parameter, which specifies the locale to use. The locale can be specified as a string or an array of strings, with each string representing a specific language or region.
        
        Here's an example of how to use `toLocaleString()` to format a number with a specific locale:
        
        ```jsx
        const number = 123456.789;
        const formattedNumber = number.toLocaleString('en-US'); // "123,456.789"
        ```
        
        In this example, `toLocaleString()` formats the number `123456.789` using the `en-US` locale, which uses a comma as the thousands separator and a dot as the decimal separator.
        
        The `toLocaleString()` method also has additional parameters for specifying the number of decimal places, the style of currency, and other formatting options.
        
    10. `Number.prototype.toPrecision()` is a method in JavaScript that returns a string representing a number in exponential notation, with the specified number of digits.
        
        Syntax: `numObj.toPrecision([precision])`
        
        Here, `numObj` is the number object, and `precision` is an optional argument that specifies the number of significant digits. It must be an integer value between 1 and 21.
        
        If the `precision` argument is not specified, the `toPrecision()` method returns the number as is, without any rounding or truncation.
        
        Example:
        
        ```jsx
        let num = 12345.6789;
        
        console.log(num.toPrecision());   // 12345.6789
        console.log(num.toPrecision(2));  // 1.2e+4
        console.log(num.toPrecision(4));  // 1.235e+4
        console.log(num.toPrecision(8));  // 12345.679
        ```
        
        In the first example, since no precision is specified, the number is returned as is.
        
        In the second example, the number is rounded off to two significant digits, resulting in the scientific notation representation `1.2e+4`.
        
        In the third example, the number is rounded off to four significant digits, resulting in the scientific notation representation `1.235e+4`.
        
        In the fourth example, the number is rounded off to eight significant digits, resulting in the decimal representation `12345.679`.
        
    11. `Number.prototype.toString()` is a method that returns a string representing the specified number object. It can take a single argument, which specifies the radix (base) of the number system to be used when converting the number to a string. If the radix is not specified or is 10, the number is converted to a decimal (base 10) string.
        
        Here's an example:
        
        ```jsx
        const num = 42;
        console.log(num.toString()); // "42"
        console.log(num.toString(2)); // "101010"
        console.log(num.toString(16)); // "2a"
        ```
        
        In the first line, we create a variable `num` with the value `42`. We then call `toString()` on `num` with no arguments, which converts the number to a decimal string.
        
        In the second line, we call `toString()` with an argument of `2`, which converts the number to a binary string.
        
        In the third line, we call `toString()` with an argument of `16`, which converts the number to a hexadecimal string.
        
    12. `Number.prototype.valueOf()` is a method in JavaScript that returns the primitive value of a `Number` object. The `valueOf()` method is called automatically by JavaScript when a `Number` object is used in a context where a primitive value is expected, such as when using arithmetic operators.
        
        Here is an example:
        
        ```jsx
        const numObj = new Number(10);
        console.log(numObj.valueOf()); // 10
        ```
        
        In the example above, we create a new `Number` object `numObj` with a value of 10. The `valueOf()` method is then called on `numObj`, which returns the primitive value of 10.
        
        The `valueOf()` method can be used to extract the primitive value of a `Number` object and perform arithmetic operations on it.
        
        Here's an example:
        
        ```jsx
        const numObj1 = new Number(5);
        const numObj2 = new Number(10);
        console.log(numObj1.valueOf() + numObj2.valueOf()); // 15
        ```
        
        In the example above, we create two `Number` objects `numObj1` and `numObj2` with values of 5 and 10 respectively. We then extract the primitive value of each `Number` object using the `valueOf()` method and perform an addition operation on them. The result of the addition is 15.
        
- **Queue**
    - **Resource**
        
        [JavaScript Data Structures - Queues](https://youtu.be/yKhJHsW0Zm4)
        
    
    Queues are known as First In First Out also known as FIFO data structure
    
    A queue works based on the first-in, first-out (FIFO) principle, which is different from a stack, which works based on the last-in, first-out (LIFO) principle.
    
    Here is an example of a Queue data structure implemented in JavaScript
    
    ```jsx
    class Queue {
      constructor() {
        this.items = [];
      }
    
      enqueue(item) {
    		// push() will add the element in the end of the array
        this.items.push(item);
      }
    
      dequeue() {
        if (this.isEmpty()) {
          return null;
        }
    		// shift() will remove the first element in the original array
    		// Note: shift() change the original array by removing the first 
    		// elemet in array
        return this.items.shift();
      }
    
    	// front() method is used to check which element is 
    	// going to be removed next
      front() {
        if (this.isEmpty()) {
          return null;
        }
        return this.items[0];
      }
    
      isEmpty() {
        return this.items.length === 0;
      }
    
    	print() {
        for(let i=0; this.items.length > i; i++){
    			console.log(this.items[i])
    		}
      }
    
      size() {
        return this.items.length;
      }
    }
    
    // Example usage:
    const queue = new Queue();
    queue.enqueue('a');
    queue.enqueue('b');
    queue.enqueue('c');
    queue.print()
    console.log(queue.size()); // Output: 3
    console.log(queue.front()); // Output: 'a'
    console.log(queue.dequeue()); // Output: 'a'
    console.log(queue.dequeue()); // Output: 'b'
    console.log(queue.size()); // Output: 1
    ```
    
    In this example, the `Queue` class has several methods for adding, removing, and inspecting elements in the queue:
    
    - `enqueue(item)` adds an item to the end of the queue.
    - `dequeue()` removes and returns the item at the front of the queue. If the queue is empty, it returns `null`.
    - `front()` returns the item at the front of the queue without removing it. If the queue is empty, it returns `null`.
    - `isEmpty()` returns a boolean indicating whether the queue is empty.
    - `size()` returns the number of elements in the queue.
    
    In the example usage, we create a new queue, add three items to it, and then use the various methods to manipulate and inspect the queue.
    
- **Stack**
    - **Resource**
        
        
    
    Stack are known as Last In First Out also known as LIFO data structure
    
    In JavaScript, a Stack is a data structure that follows the Last-In-First-Out (LIFO) principle, where the last element added to the stack is the first element to be removed. A real-world example of a stack is a stack of books where the last book added is the first one to be taken out.
    
    Here's an example of how to use a Stack in JavaScript:
    
    ```jsx
    class Stack {
      constructor() {
        this.items = [];
      }
    
      push(item) {
    		// push() method adds new items to the end of an array.
    		// push() method changes the length of the array.
    		// push() method returns the new length.
        this.items.push(item);
      }
    
      pop() {
        if (this.isEmpty()) {
          return null;
        }
    		// pop() method removes the last element of an array.
    		// pop() method changes the original array.
    		// pop() method returns the removed element.
        return this.items.pop();
      }
    
      peek() {
        if (this.isEmpty()) {
          return null;
        }
        return this.items[this.items.length - 1];
      }
    
      isEmpty() {
        return this.items.length === 0;
      }
    
      size() {
        return this.items.length;
      }
    }
    
    // Example usage:
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    console.log(stack.size()); // Output: 3
    console.log(stack.peek()); // Output: 3
    console.log(stack.pop()); // Output: 3
    console.log(stack.pop()); // Output: 2
    console.log(stack.size()); // Output: 1
    ```
    
    In this example, we define a `Stack` class with several methods for adding, removing, and inspecting elements in the stack:
    
    - `push(item)` adds an item to the top of the stack.
    - `pop()` removes and returns the item at the top of the stack. If the stack is empty, it returns `null`.
    - `peek()` returns the item at the top of the stack without removing it. If the stack is empty, it returns `null`.
    - `isEmpty()` returns a boolean indicating whether the stack is empty.
    - `size()` returns the number of elements in the stack.
    
    we create a new stack, pushed three items to it, and then use the various methods to manipulate and inspect the queue
    

---

## String Based Problems

### **1️⃣ Longest Substring Without Repeating Characters**

**Problem:** Determine the length of the longest substring in a given string that contains all unique characters.

**Solution:**

```jsx
function lengthOfLongestSubstring(s) {
  let seen = new Map();
  let start = 0;
  let maxLength = 0;

  for (let end = 0; end < s.length; end++) {
    if (seen.has(s[end])) {
      start = Math.max(seen.get(s[end]) + 1, start);
    }
    seen.set(s[end], end);
    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}

// Example usage:
console.log(lengthOfLongestSubstring("abcabcbb")); // Output: 3 ("abc")
console.log(lengthOfLongestSubstring("bbbbb"));    // Output: 1 ("b")
```

**Explanation:** This approach utilizes a sliding window technique with two pointers (`start` and `end`) to track the current substring. A `Map` stores the last seen index of each character. As we iterate through the string, if a character is repeated, we adjust the `start` pointer to ensure all characters in the window are unique.

---

### **2️⃣ Longest Palindromic Substring**

**Problem:** Find the longest substring in a given string that reads the same forward and backward.

**Solution:**

```jsx
function longestPalindrome(s) {
  if (s.length < 2) return s;

  let start = 0, maxLength = 1;

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }

  for (let i = 0; i < s.length; i++) {
    let len1 = expandAroundCenter(i, i);   // Odd length palindromes
    let len2 = expandAroundCenter(i, i + 1); // Even length palindromes
    let len = Math.max(len1, len2);

    if (len > maxLength) {
      start = i - Math.floor((len - 1) / 2);
      maxLength = len;
    }
  }

  return s.substring(start, start + maxLength);
}

// Example usage:
console.log(longestPalindrome("babad")); // Output: "bab" or "aba"
console.log(longestPalindrome("cbbd"));  // Output: "bb"
```

**Explanation:** This solution employs the "expand around center" technique. For each character (and each pair of characters for even-length palindromes), it expands outward while the characters on both sides are equal, thus identifying the longest palindromic substring centered at that position.

---

### **3️⃣ String Concatenation**

**Problem:** Demonstrate how to concatenate two or more strings in JavaScript.

**Solution:**

```jsx
let str1 = "Hello";
let str2 = "World";

// Using the + operator
let result1 = str1 + " " + str2;
console.log(result1); // Output: "Hello World"

// Using the concat() method
let result2 = str1.concat(" ", str2);
console.log(result2); // Output: "Hello World"
```

**Explanation:** In JavaScript, strings can be concatenated using the `+` operator or the `concat()` method. Both methods combine multiple strings into one.

### **1️⃣ Check if Two Strings are Anagrams**

👉 Two words are **anagrams** if they have the same characters in the same frequency but in a different order.

**Example:** `"listen"` and `"silent"` are anagrams.

### **Solution**

```jsx
const isAnagram = (str1, str2) => {
  if (str1.length !== str2.length) return false;

  const sortedStr1 = str1.toLowerCase().split("").sort().join("");
  const sortedStr2 = str2.toLowerCase().split("").sort().join("");

  return sortedStr1 === sortedStr2;
};

console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));   // false
```

✅ **Time Complexity:** `O(n log n)` (because of sorting)

✅ **Space Complexity:** `O(n)`

---

## **2️⃣ Reverse a String**

👉 Reverse the given string **without using built-in reverse()**.

### **Solution**

```jsx
javascript
CopyEdit
const reverseString = (str) => {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
};

console.log(reverseString("hello")); // "olleh"

```

✅ **Time Complexity:** `O(n)`

✅ **Space Complexity:** `O(n)`

---

## **3️⃣ Check if a String is a Palindrome**

👉 A **palindrome** is a word that reads the same forward and backward.

**Example:** `"racecar"`, `"madam"`

### **Solution**

```jsx
javascript
CopyEdit
const isPalindrome = (str) => {
  return str === str.split("").reverse().join("");
};

console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false

```

✅ **Time Complexity:** `O(n)`

✅ **Space Complexity:** `O(n)`

---

## **4️⃣ Find the First Non-Repeating Character**

👉 Find the **first character that appears only once** in the string.

**Example:** `"swiss"` → **First non-repeating character = `'w'`**

### **Solution**

```jsx
javascript
CopyEdit
const firstNonRepeatingChar = (str) => {
  const charMap = {};

  for (let char of str) {
    charMap[char] = (charMap[char] || 0) + 1;
  }

  for (let char of str) {
    if (charMap[char] === 1) return char;
  }

  return null;
};

console.log(firstNonRepeatingChar("swiss")); // "w"
console.log(firstNonRepeatingChar("aabbcc")); // null

```

✅ **Time Complexity:** `O(n)`

✅ **Space Complexity:** `O(n)`

---

## **5️⃣ Count Occurrences of Each Character**

👉 Count how many times each character appears in a string.

### **Solution**

```jsx
javascript
CopyEdit
const countCharacterFrequency = (str) => {
  const frequencyMap = {};

  for (let char of str) {
    frequencyMap[char] = (frequencyMap[char] || 0) + 1;
  }

  return frequencyMap;
};

console.log(countCharacterFrequency("hello"));
// { h: 1, e: 1, l: 2, o: 1 }

```

✅ **Time Complexity:** `O(n)`

✅ **Space Complexity:** `O(n)`

---

## **6️⃣ Find All Substrings of a String**

👉 Generate **all possible substrings** of a given string.

### **Solution**

```jsx
javascript
CopyEdit
const getAllSubstrings = (str) => {
  let substrings = [];

  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      substrings.push(str.substring(i, j));
    }
  }

  return substrings;
};

console.log(getAllSubstrings("abc"));
// [ 'a', 'ab', 'abc', 'b', 'bc', 'c' ]

```

✅ **Time Complexity:** `O(n²)`

✅ **Space Complexity:** `O(n²)`

---

## **7️⃣ Find the Longest Common Prefix**

👉 Find the **longest prefix** that is common in an array of strings.

**Example:** `["flower", "flow", "flight"]` → **Output: `"fl"`**

### **Solution**

```jsx
javascript
CopyEdit
const longestCommonPrefix = (strs) => {
  if (!strs.length) return "";

  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return "";
    }
  }

  return prefix;
};

console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"])); // ""

```

✅ **Time Complexity:** `O(n * m)` (where `n` = number of strings, `m` = length of the shortest string)

✅ **Space Complexity:** `O(1)`

---

## **8️⃣ Find if One String is a Rotation of Another**

👉 Check if one string is a **rotation** of another string.

**Example:** `"waterbottle"` is a rotation of `"erbottlewat"`

### **Solution**

```jsx
javascript
CopyEdit
const isRotation = (s1, s2) => {
  if (s1.length !== s2.length) return false;
  return (s1 + s1).includes(s2);
};

console.log(isRotation("waterbottle", "erbottlewat")); // true
console.log(isRotation("hello", "llohe")); // true
console.log(isRotation("hello", "olelh")); // false

```

✅ **Time Complexity:** `O(n)`

✅ **Space Complexity:** `O(n)`

---

## **9️⃣ Find the Most Frequent Character**

👉 Find the character that appears **the most** in a string.

### **Solution**

```jsx
javascript
CopyEdit
const mostFrequentChar = (str) => {
  const freqMap = {};
  let maxChar = "", maxCount = 0;

  for (let char of str) {
    freqMap[char] = (freqMap[char] || 0) + 1;
    if (freqMap[char] > maxCount) {
      maxCount = freqMap[char];
      maxChar = char;
    }
  }

  return maxChar;
};

console.log(mostFrequentChar("aabbbccccd")); // "c"

```

✅ **Time Complexity:** `O(n)`

✅ **Space Complexity:** `O(n)`

---

## Array Based Problems

## **1️⃣ Product of Array Except Self**

**Problem:** Given an array of numbers, create a new array where each element at index `i` is the product of all the numbers in the original array except the one at `i`.

**Solution:**

```jsx
function productExceptSelf(nums) {
  const length = nums.length;
  const result = new Array(length).fill(1);
  let leftProduct = 1;
  let rightProduct = 1;

  for (let i = 0; i < length; i++) {
    result[i] *= leftProduct;
    leftProduct *= nums[i];
  }

  for (let i = length - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return result;
}

// Example usage:
console.log(productExceptSelf([1, 2, 3, 4])); // Output: [24, 12, 8, 6]
```

**Explanation:** This approach calculates the product of all elements to the left and right of each index without using division, ensuring an efficient solution.

---

## **2️⃣ Find Unique Pairs with Given Sum**

**Problem:** Find the number of unique pairs in an array whose sum equals a given value `k`.

**Solution:**

```jsx
javascript
CopyEdit
function countUniquePairs(nums, k) {
  const seen = new Set();
  const pairs = new Set();

  for (const num of nums) {
    const complement = k - num;
    if (seen.has(complement)) {
      const pair = [num, complement].sort((a, b) => a - b);
      pairs.add(pair.toString());
    }
    seen.add(num);
  }

  return pairs.size;
}

// Example usage:
console.log(countUniquePairs([1, 5, 7, -1, 5], 6)); // Output: 2 (Pairs: [1, 5] and [7, -1])

```

**Explanation:** Using a set to track seen numbers and another set to store unique pairs ensures that each pair is counted only once.

---

## **3️⃣ Remove Duplicates from Sorted Array**

**Problem:** Given a sorted array, remove the duplicates in-place such that each element appears only once and return the new length.

**Solution:**

```jsx
javascript
CopyEdit
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let uniqueIndex = 0;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[uniqueIndex]) {
      uniqueIndex++;
      nums[uniqueIndex] = nums[i];
    }
  }

  return uniqueIndex + 1;
}

// Example usage:
const nums = [1, 1, 2, 2, 3];
const length = removeDuplicates(nums);
console.log(length); // Output: 3
console.log(nums.slice(0, length)); // Output: [1, 2, 3]

```

**Explanation:** By maintaining a `uniqueIndex`, we can overwrite duplicates and keep only unique elements in the array.

---

## **4️⃣ Merge Intervals**

**Problem:** Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.

**Solution:**

```jsx
javascript
CopyEdit
function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const current = intervals[i];

    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push(current);
    }
  }

  return merged;
}

// Example usage:
console.log(mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]]));
// Output: [[1, 6], [8, 10], [15, 18]]

```

**Explanation:** After sorting the intervals by their start times, we iterate through and merge overlapping intervals by comparing the current interval's start with the last merged interval's end.

---

## **5️⃣ Rotate Array**

**Problem:** Rotate an array to the right by `k` steps, where `k` is non-negative.

**Solution:**

```jsx
javascript
CopyEdit
function rotateArray(nums, k) {
  k = k % nums.length;
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
}

function reverse(nums, start, end) {
  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
}

// Example usage:
const nums = [1, 2, 3, 4, 5, 6, 7];
rotateArray(nums, 3);
console.log(nums); // Output: [5, 6, 7, 1, 2, 3, 4]

```

**Explanation:** This solution involves reversing the entire array, then reversing the first `k` elements, and finally reversing the remaining elements to achieve the desired rotation.

---

### Find Duplicates in array

```jsx
function findDuplicates(array) {
  const seen = new Set();
  const duplicates = [];
  
  for (const item of array) {
    if (seen.has(item)) {
      duplicates.push(item);
    } else {
      seen.add(item);
    }
  }
  
  return duplicates;
}

findDuplicates([1, 2, 3, 1, 2, 4, 5]); // [1, 2]
```

---

## STARR Framework Application

**Use**: Structuring interview responses to highlight your problem-solving abilities with concrete examples and measurable results.

## Interview Questions for Freshworks

**Use**: Demonstrates your interest in the company and helps assess team dynamics and technical environment.

### **Event Delegation**

Event delegation is a technique where you attach a single event listener to a parent element that handles events for all its children through event bubbling, rather than attaching individual listeners to each child element.