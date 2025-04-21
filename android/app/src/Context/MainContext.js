import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const [token, setToken] = useState(null);
  const [pageRefresh, setPageRefresh] = useState(false);
  const [homeData, setHomeData] = useState(null);
  const [countryListData, setCountryListData] = useState([]);

  // useEffect(() => {
  //   const getToken = async () => {
  //     const storedToken = await AsyncStorage.getItem('token');
  //     setToken(storedToken);
  //   };
  //   getToken();
  // }, []);

  return (
    <AuthContext.Provider value={{
      userData, setUserData
      , token, setToken
      , pageRefresh, setPageRefresh
      , homeData, setHomeData
    }}>
      {children}
    </AuthContext.Provider>
  );
};