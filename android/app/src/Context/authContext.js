import React, { createContext, useState,useEffect } from 'react';

export const AuthContext = createContext();
//import { AsyncStorage } from 'react-native';

export const AuthProvider = ({ children }) => {
    const[userData,setUserData]=useState(null);
 // const [accessToken, setAccessToken] = useState(null);
 // const[address,setAddress]=useState(null);
 // const[refreshAlertData,setRefreshAlertData]=useState(false);

  //const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const checkToken = async () => {
//       //const token = await AsyncStorage.getItem('userToken');
//       //const token ='47|qvkxPNtzKn0A0i4WvrqoobCwgQAxqMkcrr1Po53Sacd126ff'
//       const token=accessToken;
//       if (token) {
//         setAccessToken(token);
//       }
//       setIsLoading(false);
//     };
//     checkToken();
//   }, []);


  return (
    <AuthContext.Provider value={{userData,setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};