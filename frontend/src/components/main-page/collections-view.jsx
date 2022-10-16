import { NavLink } from 'react-router-dom';
import styles from './main-page.module.css'

export const CollectionsView = ({  url }) => {
  return (
    <section className={styles.collection_box}>
      <NavLink
        className={`${styles.card} ${styles.fashion}`}
        to={`${url}/collections/1`}
      >
        <h3
          className={`text text_type_cardh3 text_color_secondary ${styles.text}`}
        >
          Стартерпак фэшонисты
        </h3>
      </NavLink>
      <NavLink
        className={`${styles.card} ${styles.witches}`}
        to={`${url}/collections/2`}
      >
        <h3
          className={`text text_type_cardh3 text_color_secondary ${styles.text}`}
        >
          Стартерпак современной ведьмы
        </h3>
      </NavLink>
      <NavLink
        className={`${styles.card} ${styles.director}`}
        to={`${url}/collections/3`}
      >
        <h3
          className={`text text_type_cardh3 text_color_secondary ${styles.text}`}
        >
          Стартерпак директора всего
        </h3>
      </NavLink>
      <NavLink
        className={`${styles.card} ${styles.home}`}
        to={`${url}/collections/4`}
      >
        <h3
          className={`text text_type_cardh3 text_color_secondary ${styles.text}`}
        >
          Стартерпак домоседа
        </h3>
      </NavLink>
      <NavLink
        className={`${styles.card} ${styles.music}`}
        to={`${url}/collections/5`}
      >
        <h3
          className={`text text_type_cardh3 text_color_secondary ${styles.text}`}
        >
          Стартерпак музыкального задрота
        </h3>
      </NavLink>
      <NavLink
        className={`${styles.card} ${styles.minimal}`}
        to={`${url}/collections/6`}
      >
        <h3
          className={`text text_type_cardh3 text_color_secondary ${styles.text}`}
        >
          Стартерпак минималиста
        </h3>
      </NavLink>
    </section>
  );
};
