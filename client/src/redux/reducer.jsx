// Importa los tipos de acciones definidos previamente
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

// Define el estado inicial del almacenamiento Redux
const initialState = {
  countries: [], // Lista de todos los países
  filteredCountries: [], // Lista de países filtrados (resultado de filtros y ordenamientos)
  activities: [], // Lista de actividades
  detailCountry: [], // Detalles de un país específico
};

// Define el reducer que gestionará las acciones y actualizará el estado
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      // Actualiza la lista de países con los datos obtenidos de la acción
      return { ...state, countries: action.payload };

    case GET_COUNTRY:
      // Actualiza los detalles del país con los datos obtenidos de la acción
      return {
        ...state,
        detailCountry: action.payload,
      };

    case CLEAR_DETAIL:
      // Borra los detalles del país (se utiliza para limpiar los detalles)
      return {
        ...state,
        detailCountry: action.payload,
      };

    case GET_ACTIVITIES:
      // Actualiza la lista de actividades con los datos obtenidos de la acción
      return {
        ...state,
        activities: action.payload,
      };

    case GET_COUNTRY_BY_NAME:
      // Actualiza la lista de países filtrados por nombre con los datos obtenidos de la acción
      return {
        ...state,
        filteredCountries: action.payload,
      };

    case BY_NAME:
      // Ordena la lista de países filtrados por nombre (ascendente o descendente)
      let sortedCountries = [...state.filteredCountries.length ? state.filteredCountries : state.countries];

      sortedCountries.sort((a, b) => {
        if (action.payload === 'Ascendente') {
          return a.Nombre.localeCompare(b.Nombre);
        } else if (action.payload === 'Descendente') {
          return b.Nombre.localeCompare(a.Nombre);
        }
        return 0;
      });

      return {
        ...state,
        filteredCountries: sortedCountries,
      };

    case BY_CONTINENT:
      // Filtra la lista de países por continente (o muestra todos si se selecciona 'All')
      if (action.payload === 'All') {
        return {
          ...state,
          filteredCountries: state.countries,
        };
      }

      let filteredByContinent = state.countries.filter(
        (country) => country.Continente === action.payload
      );

      return {
        ...state,
        filteredCountries: filteredByContinent,
      };

    case BY_POPULATION:
      // Ordena la lista de países filtrados por población (ascendente o descendente)
      let populationSorted = [...state.filteredCountries.length ? state.filteredCountries : state.countries];

      populationSorted.sort((a, b) => {
        const populationA = parseInt(a.Población);
        const populationB = parseInt(b.Población);

        if (action.payload === 'Ascendente') {
          return populationA - populationB;
        } else if (action.payload === 'Descendente') {
          return populationB - populationA;
        }
        return 0;
      });

      return {
        ...state,
        filteredCountries: populationSorted,
      };

    case BY_ACTIVITY:
      // Filtra la lista de países por actividad (o muestra todos si se selecciona 'All')
      let filteredByActivity = [];

      if (action.payload === 'All') {
        filteredByActivity = state.countries.filter((country) => country.Activities.length > 0);
      } else {
        filteredByActivity = state.countries.filter((country) =>
          country.Activities.some((activity) => activity.Nombre === action.payload)
        );
      }

      return {
        ...state,
        filteredCountries: filteredByActivity,
      };

    default:
      // Devuelve el estado sin cambios si la acción no es reconocida
      return { ...state };
  }
};

export default rootReducer; // Exporta el reducer para su uso en la aplicación
