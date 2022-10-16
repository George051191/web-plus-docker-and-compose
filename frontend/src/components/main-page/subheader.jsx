import { useHistory, Route } from "react-router-dom";
import { Button, ButtonReturn } from "../ui";
import styles from './main-page.module.css'

export const Subheader = ({ path, location, isLogin }) => {
  const history = useHistory();

  const onTabsClick = (e) => {
    history.push(`/gifts/${e.target.name ?? e.target.closest('button').name}`);
  };

  return (
    <div className={styles.tabs_box}>
      <Route path={`${path}/collections/:id`}>
        <ButtonReturn />
      </Route>
      <h1
        className={`text text_type_h1 text_color_primary mb-16 ${styles.title}`}
      >
        Подарки
      </h1>
      {/* <div className={styles.tabs}>
        <Button
          kind="secondary"
          type="button"
          name="line"
          text="Лента"
          extraClass={`${
            location.pathname.includes('/gifts/collections')
              ? styles.inactive
              : styles.shadow
          }`}
          onClick={onTabsClick}
          disabled={location.pathname === '/gifts/line'}
        />
        <Button
          kind="secondary"
          type="button"
          name="collections"
          text="Коллекции"
          extraClass={`${styles.right_btn} ${
            location.pathname === '/gifts/line'
              ? styles.inactive
              : styles.shadow
          }`}
          onClick={onTabsClick}
          disabled={
            location.pathname.includes('/gifts/collections') || !isLogin
          }
        />
      </div> */}
    </div>
  );
};