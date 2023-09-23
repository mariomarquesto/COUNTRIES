import axios from 'axios';
import {
  GET_COUNTRIES,
  GET_COUNTRY,
  GET_ACTIVITIES,
  GET_COUNTRY_BY_NAME,
  CLEAR_DETAIL,
  BY_CONTINENT,
  BY_ACTIVITY,
  BY_NAME,
  BY_POPULATION,
} from './action-types';

// Acción para obtener la lista de países
export const getCountries = () => async (dispatch) => {
  try {
    const apiData = await axios.get('/countries');
    const countries = apiData.data;
    dispatch({
      type: GET_COUNTRIES, // Tipo de acción
      payload: countries, // Datos obtenidos de la API
    });
  } catch (error) {
    // Manejo de errores
    console.error('Error fetching countries:', error);
  }
};

// Acción para obtener un país por su ID
export const getCountry = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/countries/${id}`);
    const country = response.data;
    dispatch({
      type: GET_COUNTRY, // Tipo de acción
      payload: country, // Datos del país obtenidos de la API
    });
  } catch (error) {
    // Manejo de errores
    console.error('Error fetching country:', error);
  }
};

// Acción para limpiar los detalles de un país
export const clearDetail = () => ({
  type: CLEAR_DETAIL, // Tipo de acción
  payload: [], // Datos a ser borrados o reiniciados
});

// Acción para obtener un país por su nombre
export const getCountryByName = (name) => async (dispatch) => {
  try {
    const apiData = await axios.get(`/countries?name=${name}`);
    const country = apiData.data;
    dispatch({
      type: GET_COUNTRY_BY_NAME, // Tipo de acción
      payload: country, // Datos del país obtenidos de la API
    });
  } catch (error) {
    // Manejo de errores
    console.error('Error fetching country by name:', error);
  }
};

// Acción para obtener la lista de actividades
export const getAllActivities = () => async (dispatch) => {
  try {
    const apiData = await axios.get('/activities');
    const activities = apiData.data;
    dispatch({
      type: GET_ACTIVITIES, // Tipo de acción
      payload: activities, // Datos de actividades obtenidos de la API
    });
  } catch (error) {
    // Manejo de errores
    console.error('Error fetching activities:', error);
  }
};

// Acción para ordenar por nombre
export const orderByName = (name) => {
  return {
    type: BY_NAME, // Tipo de acción
    payload: name, // Nombre utilizado para ordenar
  };
};

// Acción para filtrar por continente
export const continentFilter = (continents) => {
  return {
    type: BY_CONTINENT, // Tipo de acción
    payload: continents, // Continentes utilizados como filtro
  };
};

// Acción para ordenar por población
export const orderByPopulation = (pop) => {
  return {
    type: BY_POPULATION, // Tipo de acción
    payload: pop, // Población utilizada para ordenar
  };
};

// Acción para filtrar por actividad
export const activityFilter = (name) => {
  return {
    type: BY_ACTIVITY, // Tipo de acción
    payload: name, // Nombre de actividad utilizado como filtro
  };
};
