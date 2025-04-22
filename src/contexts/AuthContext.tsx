import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define user types and roles
type UserRole = 'admin' | 'employee';

interface AdminRole {
  type: 'admin';
  position: 'Farm Manager' | 'Finance Manager' | 'Operations Manager' | 'HR Manager' | 'Supply Chain Manager' | 'Veterinarian' | 'Crop Production Manager';
}

interface EmployeeRole {
  type: 'employee';
  position: 'Farm Attendant' | 'Cow Attendant' | 'Labourer' | 'Field Worker' | 'Veterinary Assistant' | 'Driver' | 'Cleaner' | 'Intern' | 'Storekeeper' | 'Security Guard';
}

type Role = AdminRole | EmployeeRole;

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  profilePhoto?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: Role) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample user data (in a real app, this would come from an API)
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@gecofarm.com',
    role: { type: 'admin', position: 'Farm Manager' },
    profilePhoto: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    name: 'Employee User',
    email: 'employee@gecofarm.com',
    role: { type: 'employee', position: 'Farm Attendant' },
    profilePhoto: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('gecoFarmUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password') { // In a real app, you'd verify the password hash
        setUser(foundUser);
        localStorage.setItem('gecoFarmUser', JSON.stringify(foundUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: Role) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real application, you would send this data to your backend
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 11),
        name,
        email,
        role,
        profilePhoto: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      };
      
      setUser(newUser);
      localStorage.setItem('gecoFarmUser', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gecoFarmUser');
  };

  const isAdmin = () => {
    return user?.role.type === 'admin';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};