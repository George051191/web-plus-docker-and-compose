import { useContext } from 'react';
import { UserContext } from '../../utils/context';
import { GoodCard } from '../good-card';
import styles from './main-page.module.css'


export const CardListView = ({ lastCards, topCards, isLogin }) => {
  return (
    <>
      <section className={styles.box}>
        <h2 className="text text_type_h2 text_color_primary mb-16">
          Недавно добавленные
        </h2>
        <div className={styles.cards_box}>
          {lastCards && <GoodCardList cards={lastCards} isLogin={isLogin} />}
        </div>
       
      </section>
      <section className={styles.box}>
        <h2 className="text text_type_h2 text_color_primary mb-16">
          Популярные
        </h2>
        <div className={styles.cards_box}>
          {topCards && <GoodCardList cards={topCards} isLogin={isLogin} />}
        </div>
      </section>
    </>
  );
};


const GoodCardList = ({ cards, isLogin }) => {
    const [user] = useContext(UserContext)

    return cards.map((cardInfo) => {
    const { name, price, raised, link, image, id, owner } = cardInfo
    const key = `${user.id}${id}`

    return (
      <GoodCard
        id={id}
        key={key}
        isLogin={isLogin}
        price={price}
        name={name}
        current={raised}
        total={price}
        img={image}
      />
    );
  });
};