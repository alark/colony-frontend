import axios from 'axios';
import PropTypes from 'prop-types';
import React, { createContext, useReducer, useContext } from 'react';

const initialState = { loggedIn: false, name: {} };
const store  = createContext(initialState);

const { Provider } = store;

const BASE_URL = 'https://animal-colony-76d9b.firebaseapp.com/api';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REGISTER = 'REGISTER';
const COLONY = 'COLONY';
const ANIMALS = 'ANIMALS';
const SORT = 'SORT';
const ALPHASORT = 'ALPHASORT'

axios.defaults.withCredentials = true;

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer((prevState, action) => {
    const { type, payload } = action;

    switch (type) {
      case LOGIN: {
        // Store the profile data in the state
        console.log(payload);
        return { ...prevState, loggedIn: true, ...payload };
      }

      case REGISTER: {
        // Store registered profile in the state
        return { ...prevState, loggedIn: true, ...payload };
      }

      case COLONY: {
        const colonies = [payload, ...prevState.ownedColonies]
        return { ...prevState, ownedColonies: colonies };
      }

      case SORT: {
        const colonies = [...prevState.ownedColonies]
        colonies.sort((a,b) => { 
          if (a[payload] < b[payload])  {
            return -1;  //locations swap
          }
          if (a[payload] > b[payload]) {
            return 1;
          }
          return 0;
        });
        return { ...prevState, ownedColonies: colonies};
      }

      case ALPHASORT: {
        const colonies = [...prevState.ownedColonies]
        colonies.sort((a,b) => {
          if(a[payload].toLowerCase() < b[payload].toLowerCase()) {
            return -1;
          } 
          if(a[payload].toLowerCase() > b[payload].toLowerCase()) {
            return 1;
          } 
          return 0;
        });
        return { ...prevState, ownedColonies: colonies};
      }

      case ANIMALS: {
        // Store colony animals in the state
        return {
          ...prevState, colonyId: payload.colonyId, colonySize: payload.colonySize, animals: payload.animals,
        };
      }

      case LOGOUT: {
        // Reset state to logged out
        return initialState;
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

const useProfileProvider = () => {
  const { state, dispatch } = useContext(store);

  const login = credentials => axios
    .post(`${BASE_URL}/login`, credentials)
    .then(({ data }) => {
      dispatch({ type: LOGIN, payload: data });
    });

  const register = credentials => axios
    .post(`${BASE_URL}/user`, credentials)
    .then(({ data }) => {
      dispatch({ type: REGISTER, payload: data });
    });

  const logout = () => dispatch({
    type: LOGOUT,
  });

  const addColony = newColony => axios
    .post(`${BASE_URL}/colony`, newColony)
    .then(({ data }) => {
      dispatch({ type: COLONY, payload: data });
    });


  const getAnimals = async pageInfo => axios
    .post(`${BASE_URL}/colony/animals`, pageInfo)
    .then(({ data }) => {
      dispatch({ type: ANIMALS, payload: data });
    });


    const sortList = (sortBy) => {
      dispatch({ type: SORT, payload: sortBy });
    };

    const sortAlpha = (sortBy) => {
      dispatch({ type: ALPHASORT, payload: sortBy });
    };


  return {
    state,
    dispatch,
    login,
    logout,
    register,
    addColony,
    getAnimals,
    sortList,
    sortAlpha,
  };
};

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ProfileProvider, useProfileProvider };
