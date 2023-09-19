import Cards from '../../components/Cards/Cards.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCountries, getAllActivities } from '../../redux/actions';
import styles from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getAllActivities());
  }, [dispatch]);

 return (
   <>
     <div className={styles.cardContainer}>
       <Cards />
     </div>
   </>
 );
};

export default Home;
