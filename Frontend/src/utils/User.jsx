import React, { useContext createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export const UserContext = createContext();

export const UserProvider = ({Navbar}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user', {
          headers: {
            Authorization: `Bearer ${document.cookie.split('=')[1]}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Navbar/>
    </UserContext.Provider>
  );
};
