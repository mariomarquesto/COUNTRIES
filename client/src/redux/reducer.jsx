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

const initialState = {
  countries: [],
  filteredCountries: [],
  activities: [],
  detailCountry: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return { ...state, countries: action.payload };

    case GET_COUNTRY:
      return {
        ...state,
        detailCountry: action.payload,
      };

    case CLEAR_DETAIL:
      return {
        ...state,
        detailCountry: action.payload,
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case GET_COUNTRY_BY_NAME:
      return {
        ...state,
        filteredCountries: action.payload,
      };

    case BY_NAME:
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
      return { ...state };
  }
};

export default rootReducer;
