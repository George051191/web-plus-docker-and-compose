import React from "react";
import { Link, useHistory } from "react-router-dom";
import { copyWish } from "../../utils/api";
import { Button, LoadingBox } from "../ui";
import styles from "./good-card.module.css";

export const GoodCard = ({
  id,
  isLogin = false,
  isOwn = false,
  price = 0,
  name = "",
  current,
  total,
  img,
  onClick,
  extraClass = "",
}) => {
  console.log('cardId', ' ', `/gift/${id}`)
  const history = useHistory();
  const handleCopyClick = () => {
    copyWish(id).then(()=>history.push('/wishlist'))
  }
  return (
    <article
      id={id}
      className={`${styles.content} ${extraClass}`}
      onClick={onClick}
    >
      <Link to={`/gift/${id}`} className={styles.img_box}>
        <img className={styles.img} src={img} alt="Фото товара." />
      </Link>
      <div className={styles.data_box}>
        <p
          className={`text text_type_h1 text_color_primary mb-4 ${styles.price}`}
        >
          {name}
        </p>
        <p
          className={`text text_type_main text_color_primary mb-10 ${styles.name}`}
        >
          {`${price} руб.`}
        </p>
        <LoadingBox current={current} total={total} />
        {isLogin && !isOwn && (
          <Button
            extraClass={styles.btn}
            text="Добавить в вишлист"
            type="button"
            kind="additional"
            onClick={handleCopyClick}
          />
        )}
      </div>
    </article>
  );
};
