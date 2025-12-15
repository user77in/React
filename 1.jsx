import { useState } from 'react';

function ExampleCard({ title, description, code }) {
  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-blue-400 mb-2">{title}</h3>
      <p className="text-slate-400 mb-4">{description}</p>
      <pre className="bg-slate-900 p-4 rounded overflow-x-auto text-sm">
        <code className="text-green-400">{code}</code>
      </pre>
    </div>
  );
}

export default function AxiosGuide() {
  const [activeSection, setActiveSection] = useState('get');

  const sections = ['get', 'post', 'put', 'patch', 'delete', 'config', 'interceptors', 'error'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Axios in React - Real World Examples
        </h1>
        <p className="text-slate-400 mb-8">Practical mini components for each HTTP method</p>

        <div className="flex gap-2 mb-8 flex-wrap">
          {sections.map(section => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeSection === section
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {section.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {activeSection === 'get' && (
            <>
              <ExampleCard
                title="1. Fetch User Profile"
                description="Basic GET request to retrieve user data"
                code={`import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          \`https://api.example.com/users/\${userId}\`
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}`}
              />

              <ExampleCard
                title="2. Search with Query Parameters"
                description="GET with dynamic query params for searching"
                code={`function ProductSearch() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);

  const searchProducts = async () => {
    const params = new URLSearchParams({
      q: query,
      limit: 10,
      sort: 'price'
    });

    const response = await fetch(
      \\\`https://api.example.com/products?\\\${params}\\\`
    );
    const data = await response.json();
    setProducts(data);
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      <button onClick={searchProducts}>Search</button>
      
      {products.map(p => (
        <div key={p.id}>{p.name} - {p.price}</div>
      ))}
    </div>
  );
}`}
              />

              <ExampleCard
                title="3. Authenticated GET Request"
                description="GET with authorization headers"
                code={`function ProtectedData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch('https://api.example.com/dashboard', {
        headers: {
          'Authorization': \`Bearer \${token}\`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setData(await response.json());
      }
    };

    fetchProtectedData();
  }, []);

  return data ? <div>{JSON.stringify(data)}</div> : null;
}`}
              />
            </>
          )}

          {activeSection === 'post' && (
            <>
              <ExampleCard
                title="1. Create New User (Signup)"
                description="POST request to create a resource"
                code={`function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('User created successfully!');
      } else {
        setMessage(\`Error: \${data.message}\`);
      }
    } catch (error) {
      setMessage('Network error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Name"
      />
      <input
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="Email"
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        placeholder="Password"
      />
      <button type="submit">Sign Up</button>
      {message && <p>{message}</p>}
    </form>
  );
}`}
              />

              <ExampleCard
                title="2. Upload Image with FormData"
                description="POST multipart form data for file uploads"
                code={`function ImageUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('caption', 'My photo');

    try {
      const response = await fetch('https://api.example.com/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log('Uploaded:', data.url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}`}
              />

              <ExampleCard
                title="3. Login with Credentials"
                description="POST for authentication and storing tokens"
                code={`function LoginForm() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api.example.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/dashboard';
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials({
          ...credentials, 
          email: e.target.value
        })}
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({
          ...credentials, 
          password: e.target.value
        })}
      />
      <button type="submit">Login</button>
    </form>
  );
}`}
              />
            </>
          )}

          {activeSection === 'put' && (
            <>
              <ExampleCard
                title="1. Update User Profile (Complete)"
                description="PUT replaces entire resource"
                code={`function EditProfile({ userId }) {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    phone: ''
  });

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        \`https://api.example.com/users/\${userId}\`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': \`Bearer \${localStorage.getItem('authToken')}\`
          },
          body: JSON.stringify(profile)
        }
      );

      if (response.ok) {
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <div>
      <input
        value={profile.name}
        onChange={(e) => setProfile({...profile, name: e.target.value})}
        placeholder="Name"
      />
      <input
        value={profile.email}
        onChange={(e) => setProfile({...profile, email: e.target.value})}
        placeholder="Email"
      />
      <textarea
        value={profile.bio}
        onChange={(e) => setProfile({...profile, bio: e.target.value})}
        placeholder="Bio"
      />
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
}`}
              />

              <ExampleCard
                title="2. Replace Document"
                description="PUT for complete resource replacement"
                code={`function DocumentEditor({ docId }) {
  const [document, setDocument] = useState({
    title: '',
    content: '',
    tags: [],
    status: 'draft'
  });

  const saveDocument = async () => {
    const response = await fetch(
      \`https://api.example.com/documents/\${docId}\`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(document)
      }
    );

    if (response.ok) {
      console.log('Document saved');
    }
  };

  return (
    <div>
      <input
        value={document.title}
        onChange={(e) => setDocument({
          ...document, 
          title: e.target.value
        })}
      />
      <textarea
        value={document.content}
        onChange={(e) => setDocument({
          ...document, 
          content: e.target.value
        })}
      />
      <button onClick={saveDocument}>Save</button>
    </div>
  );
}`}
              />
            </>
          )}

          {activeSection === 'patch' && (
            <>
              <ExampleCard
                title="1. Update Single Field"
                description="PATCH for partial updates"
                code={`function ToggleStatus({ taskId, currentStatus }) {
  const [status, setStatus] = useState(currentStatus);

  const updateStatus = async (newStatus) => {
    try {
      const response = await fetch(
        \`https://api.example.com/tasks/\${taskId}\`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        }
      );

      if (response.ok) {
        setStatus(newStatus);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div>
      <select value={status} onChange={(e) => updateStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}`}
              />

              <ExampleCard
                title="2. Like/Unlike Post"
                description="PATCH to increment counters"
                code={`function LikeButton({ postId, initialLikes, isLiked }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(isLiked);

  const toggleLike = async () => {
    const newLiked = !liked;
    
    try {
      const response = await fetch(
        \`https://api.example.com/posts/\${postId}/like\`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: newLiked ? 'like' : 'unlike' })
        }
      );

      if (response.ok) {
        setLiked(newLiked);
        setLikes(prev => newLiked ? prev + 1 : prev - 1);
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  return (
    <button onClick={toggleLike}>
      {liked ? '❤️' : '🤍'} {likes}
    </button>
  );
}`}
              />

              <ExampleCard
                title="3. Update Settings Partially"
                description="PATCH specific settings fields"
                code={`function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false
  });

  const updateSetting = async (key, value) => {
    try {
      await fetch('https://api.example.com/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: value })
      });

      setSettings(prev => ({ ...prev, [key]: value }));
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={settings.emailNotifications}
          onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
        />
        Email Notifications
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.pushNotifications}
          onChange={(e) => updateSetting('pushNotifications', e.target.checked)}
        />
        Push Notifications
      </label>
    </div>
  );
}`}
              />
            </>
          )}

          {activeSection === 'delete' && (
            <>
              <ExampleCard
                title="1. Delete User Account"
                description="DELETE with confirmation"
                code={`function DeleteAccount({ userId }) {
  const [confirming, setConfirming] = useState(false);

  const handleDelete = async () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }

    try {
      const response = await fetch(
        \`https://api.example.com/users/\${userId}\`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': \`Bearer \${localStorage.getItem('authToken')}\`
          }
        }
      );

      if (response.ok) {
        alert('Account deleted');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>
        {confirming ? 'Click again to confirm' : 'Delete Account'}
      </button>
      {confirming && (
        <button onClick={() => setConfirming(false)}>Cancel</button>
      )}
    </div>
  );
}`}
              />

              <ExampleCard
                title="2. Remove Item from Cart"
                description="DELETE single item"
                code={`function CartItem({ itemId, onRemove }) {
  const [removing, setRemoving] = useState(false);

  const removeItem = async () => {
    setRemoving(true);
    
    try {
      const response = await fetch(
        \`https://api.example.com/cart/\${itemId}\`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        onRemove(itemId);
      }
    } catch (error) {
      console.error('Remove failed:', error);
      setRemoving(false);
    }
  };

  return (
    <button onClick={removeItem} disabled={removing}>
      {removing ? 'Removing...' : 'Remove'}
    </button>
  );
}`}
              />

              <ExampleCard
                title="3. Bulk Delete with Body"
                description="DELETE multiple items"
                code={`function BulkDelete() {
  const [selectedIds, setSelectedIds] = useState([1, 2, 3]);

  const deleteSelected = async () => {
    try {
      const response = await fetch('https://api.example.com/posts/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds })
      });

      if (response.ok) {
        console.log('Items deleted');
        setSelectedIds([]);
      }
    } catch (error) {
      console.error('Bulk delete failed:', error);
    }
  };

  return (
    <button onClick={deleteSelected}>
      Delete {selectedIds.length} items
    </button>
  );
}`}
              />
            </>
          )}

          {activeSection === 'config' && (
            <>
              <ExampleCard
                title="1. API Client Setup"
                description="Reusable fetch wrapper configuration"
                code={`// api.js - Centralized API configuration
const API_BASE_URL = 'https://api.example.com';

const apiClient = {
  get: async (endpoint, options = {}) => {
    const response = await fetch(\`\${API_BASE_URL}\${endpoint}\`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    return response.json();
  },

  post: async (endpoint, data, options = {}) => {
    const response = await fetch(\`\${API_BASE_URL}\${endpoint}\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(data),
      ...options
    });
    return response.json();
  }
};

// Usage in component
function MyComponent() {
  const fetchData = async () => {
    const data = await apiClient.get('/users');
    console.log(data);
  };

  return <button onClick={fetchData}>Fetch</button>;
}`}
              />

              <ExampleCard
                title="2. Timeout Configuration"
                description="Add request timeouts"
                code={`function DataFetcher() {
  const fetchWithTimeout = async (url, timeout = 5000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  };

  const loadData = async () => {
    try {
      const data = await fetchWithTimeout(
        'https://api.example.com/data',
        3000
      );
      console.log(data);
    } catch (error) {
      console.error('Failed:', error.message);
    }
  };

  return <button onClick={loadData}>Load Data</button>;
}`}
              />

              <ExampleCard
                title="3. Custom Headers & Auth"
                description="Add authorization and custom headers"
                code={`// hooks/useAuthFetch.js
function useAuthFetch() {
  const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${token}\`,
        'X-App-Version': '1.0.0',
        ...options.headers
      }
    });

    if (response.status === 401) {
      window.location.href = '/login';
      return;
    }

    return response.json();
  };

  return { authFetch };
}

// Usage
function ProtectedComponent() {
  const { authFetch } = useAuthFetch();

  const loadData = async () => {
    const data = await authFetch('https://api.example.com/protected');
    console.log(data);
  };

  return <button onClick={loadData}>Load</button>;
}`}
              />
            </>
          )}

          {activeSection === 'interceptors' && (
            <>
              <ExampleCard
                title="1. Request Interceptor Pattern"
                description="Modify all requests before sending"
                code={`// utils/fetchInterceptor.js
class FetchInterceptor {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const token = localStorage.getItem('authToken');
    
    console.log('Request:', endpoint);

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? \`Bearer \${token}\` : '',
        ...options.headers
      }
    };

    const response = await fetch(\`\${this.baseURL}\${endpoint}\`, config);
    return this.handleResponse(response);
  }

  async handleResponse(response) {
    console.log('Response:', response.status);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  }
}

const api = new FetchInterceptor('https://api.example.com');

// Usage
function MyComponent() {
  const fetchUsers = async () => {
    const users = await api.request('/users');
    console.log(users);
  };

  return <button onClick={fetchUsers}>Fetch</button>;
}`}
              />

              <ExampleCard
                title="2. Token Refresh Interceptor"
                description="Auto-refresh expired tokens"
                code={`// hooks/useApiClient.js
function useApiClient() {
  const apiCall = async (url, options = {}) => {
    let token = localStorage.getItem('authToken');
    
    const makeRequest = async (authToken) => {
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': \`Bearer \${authToken}\`
        }
      });
    };

    let response = await makeRequest(token);

    if (response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      
      const refreshResponse = await fetch(
        'https://api.example.com/auth/refresh',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken })
        }
      );

      if (refreshResponse.ok) {
        const { token: newToken } = await refreshResponse.json();
        localStorage.setItem('authToken', newToken);
        response = await makeRequest(newToken);
      } else {
        window.location.href = '/login';
        return;
      }
    }

    return response.json();
  };

  return { apiCall };
}`}
              />

              <ExampleCard
                title="3. Response Transform Interceptor"
                description="Transform all API responses"
                code={`// utils/api.js
const transformKeys = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  
  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => 
      letter.toUpperCase()
    );
    acc[camelKey] = transformKeys(obj[key]);
    return acc;
  }, {});
};

const apiRequest = async (url, options = {}) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return transformKeys(data);
};

// Usage - transforms snake_case to camelCase
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await apiRequest('https://api.example.com/users');
      setUsers(data);
    };
    loadUsers();
  }, []);

  return users.map(u => <div key={u.id}>{u.userName}</div>);
}`}
              />
            </>
          )}

          {activeSection === 'error' && (
            <>
              <ExampleCard
                title="1. Comprehensive Error Handling"
                description="Handle all types of errors"
                code={`function DataLoader() {
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data');

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Resource not found');
        } else if (response.status === 500) {
          throw new Error('Server error');
        } else {
          throw new Error(\`HTTP error: \${response.status}\`);
        }
      }

      const data = await response.json();
      return data;

    } catch (error) {
      if (error.name === 'TypeError') {
        setError('Network error. Check your connection.');
      } else if (error.name === 'AbortError') {
        setError('Request timeout');
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Load</button>
      {error && <div>{error}</div>}
    </div>
  );
}`}
              />

              <ExampleCard
                title="2. Retry Logic"
                description="Automatically retry failed requests"
                code={`function DataFetcherWithRetry() {
  const [status, setStatus] = useState('idle');

  const fetchWithRetry = async (url, maxRetries = 3) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        setStatus(\`Attempt \${i + 1}/\${maxRetries}\`);
        
        const response = await fetch(url);
        
        if (response.ok) {
          setStatus('success');
          return await response.json();
        }

        if (response.status >= 400 && response.status < 500) {
          throw new Error('Client error - no retry');
        }

        if (i === maxRetries - 1) {
          throw new Error('Max retries reached');
        }

        await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));

      } catch (error) {
        if (i === maxRetries - 1) {
          setStatus(\`failed: \${error.message}\`);
          throw error;
        }
      }
    }
  };

  const loadData = () => {
    fetchWithRetry('https://api.example.com/data');
  };

  return (
    <div>
      <button onClick={loadData}>Load Data</button>
      <p>Status: {status}</p>
    </div>
  );
}`}
              />

              <ExampleCard
                title="3. Global Error Boundary"
                description="Catch and display API errors"
                code={`// hooks/useApi.js
function useApi() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const callApi = async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
      }

      const data = await response.json();
      return data;

    } catch (err) {
      const friendlyError = {
        message: err.message,
        timestamp: new Date().toISOString(),
        url: url
      };
      
      setError(friendlyError);
      console.error('API Error:', friendlyError);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, error, loading };
}

// Usage
function MyComponent() {
  const { callApi, error, loading } = useApi();

  const fetchData = async () => {
    await callApi('https://api.example.com/data');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <button onClick={fetchData}>Fetch</button>;
}`}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}