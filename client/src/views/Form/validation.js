export const validate = (data) => {
  const regexName = /^[a-zA-Z\s]+$/;
  let errors = {};

  if (!data.Nombre) errors.Nombre = 'Name activity required';
  else if (data.Nombre.length > 20) errors.Nombre = 'Name too long';
  else if (!regexName.test(data.Nombre))
    errors.Nombre = 'You can only use letters';

  if (data.Dificultad === 0) errors.Dificultad = 'Choose difficulty';
  if (data.Duración === 0) errors.Duración = 'Choose duration';
  if (data.Temporada === '') errors.Temporada = 'Choose a season';

  if (!data.countries.length)
    errors.countries = 'You must select at least one country';

  return errors;
};
