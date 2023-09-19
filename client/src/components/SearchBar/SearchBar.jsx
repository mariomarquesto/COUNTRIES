import styles from './SearchBar.module.css';

export const SearchBar = ({ searchCountry }) => {
  
  const handleChange = (e) => {
    searchCountry(e.target.value);
  };

  return (
    <div>
      <input
        className={styles.inputSearch}
        placeholder="Search a country..."
        type="search"
        onChange={handleChange}
        id="site-search" 
        name="q"
      />
    </div>
  );
};
