export const validate = (data) => {
  const regexName = /^[a-zA-Z\s]+$/; // Expresión regular para validar el nombre (solo letras y espacios)
  let errors = {}; // Objeto para almacenar errores de validación

  // Validación del campo "Nombre" (Nombre de la actividad)
  if (!data.Nombre) errors.Nombre = 'Name activity required'; // Si el campo está vacío, muestra un error
  else if (data.Nombre.length > 20) errors.Nombre = 'Name too long'; // Si el nombre es demasiado largo, muestra un error
  else if (!regexName.test(data.Nombre)) errors.Nombre = 'You can only use letters'; // Si contiene caracteres no válidos, muestra un error

  // Validación del campo "Dificultad" (Dificultad de la actividad)
  if (data.Dificultad === 0) errors.Dificultad = 'Choose difficulty'; // Si no se ha seleccionado una dificultad, muestra un error

  // Validación del campo "Duración" (Duración de la actividad)
  if (data.Duración === 0) errors.Duración = 'Choose duration'; // Si no se ha seleccionado una duración, muestra un error

  // Validación del campo "Temporada" (Temporada de la actividad)
  if (data.Temporada === '') errors.Temporada = 'Choose a season'; // Si no se ha seleccionado una temporada, muestra un error

  // Validación de la lista de países seleccionados
  if (!data.countries.length) errors.countries = 'You must select at least one country'; // Si no se ha seleccionado ningún país, muestra un error

  return errors; // Devuelve el objeto de errores de validación
};
