import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { validate } from './validation';
import styles from './Form.module.css';

const Form = () => {
  const duration = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  const allCountries = useSelector((state) => state.countries).sort((a, b) => {
    if (a.Nombre < b.Nombre) {
      return -1;
    }
    if (a.Nombre > b.Nombre) {
      return 1;
    }
    return 0;
  });

  const [form, setForm] = useState({
    Nombre: '',
    Dificultad: 0,
    Duración: 0,
    Temporada: '',
    countries: [],
  });

  useEffect(() => {
    const checkFormComplete = () => {
      if (
        !form.Nombre ||
        !form.Dificultad ||
        !form.Duración ||
        !form.Temporada ||
        !form.countries.length
      ) {
        setFormComplete(false);
      } else {
        setFormComplete(true);
      }
    };
    checkFormComplete();
  }, [form]);

  const [errors, setErrors] = useState({});
  const [formComplete, setFormComplete] = useState(false);
  const [created, setCreated] = useState('');

  const handleInputs = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({ ...form, [e.target.name]: e.target.value }));
  };

  const selectCountry = (e) => {
    if (!form.countries.includes(e.target.value)) {
      setForm({
        ...form,
        countries: [...form.countries, e.target.value],
      });
    }
    setErrors(validate({ ...form, countries: e.target.value }));
    e.target.value = '';
  };

  const handleDelete = (name) => {
    setForm({
      ...form,
      countries: form.countries.filter((country) => country !== name),
    });
  };

  const clearForm = () => {
    setFormComplete(false);
    setForm({
      Nombre: '',
      Dificultad: 0,
      Duración: 0,
      Temporada: '',
      countries: [],
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (formComplete === true) {
      await axios.post('/activities', form);
      setCreated('Activity successfully created');
    }
    clearForm();
  };

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <div className={styles.inputsContainer}>
        <h1 className={styles.title}>Create an activity</h1>

        <div className={styles.nameContainer}>
          <label>Activity Name</label>
          <input
            className={styles.inputName}
            onChange={handleInputs}
            placeholder="Activity Name..."
            type="text"
            value={form.Nombre}
            name="Nombre"
          />
          <span className={styles.spans}>{errors.Nombre}</span>
        </div>

        <div className={styles.diffContainer}>
          <label>Difficulty</label>
          <select
            className={styles.selects}
            onChange={handleInputs}
            value={form.Dificultad}
            name="Dificultad"
          >
            <option value="hidden" hidden>
              1 to 5
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <span className={styles.spans}>{errors.Dificultad}</span>
        </div>

        <div className={styles.durationContainer}>
          <label>Duration</label>
          <select
            className={styles.selects}
            onChange={handleInputs}
            value={form.Duración}
            name="Duración"
          >
            <option value="" hidden>
              Hours
            </option>

            {duration.map((e, index) => (
              <option key={index} value={e} name="Duración">
                {e}
              </option>
            ))}
          </select>
          <span className={styles.spans}>{errors.Duración}</span>
        </div>

        <div className={styles.seasonContainer}>
          <label>Season</label>
          <select
            className={styles.selects}
            onChange={handleInputs}
            value={form.Temporada}
            name="Temporada"
          >
            <option value="">Select a season</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
          </select>
          <span className={styles.spans}>{errors.Temporada}</span>
        </div>

        <div className={styles.countryContainer}>
  <div className={styles.listCountries}>
    <label>Country</label>
    <select
      className={styles.selects}
      onChange={(e) => selectCountry(e.target.value)} // Llama a la función selectCountry con el valor seleccionado
      value="" // Establece el valor seleccionado en blanco para que se restablezca después de seleccionar un país
    >
      <option value="" disabled>
        Select countries
      </option>
      {allCountries.map((country) => (
        <option key={country.id} value={country.Nombre}>
          {country.Nombre}
        </option>
      ))}
    </select>
    <span className={styles.spans}>{errors.countries}</span>
  
</div>

          <div className={styles.selectedCountry}>
            {form.countries.map((c, i) => (
              <div key={i}>
                <span className={styles.countryName}>{c}</span>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(c)}
                  type="button"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.createButton}
            disabled={!formComplete}
            type="submit"
          >
            Create
          </button>
          <button onClick={clearForm} className={styles.clearButton}>
            Clear
          </button>
        </div>
        <span>{created}</span>

        <NavLink to="/home">
          <button className={styles.homeButton}>Back to Home</button>
        </NavLink>
      </div>
    </form>
  );
};

export default Form;
