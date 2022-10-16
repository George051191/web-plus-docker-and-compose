import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import giftImg from '../../images/gift.jpg';
import { addOffer, getCard, copyWish } from '../../utils/api';
import { makeRightDeclension, priceArr } from '../../utils/constants';
import { Button, ButtonReturn, LoadingBox, Modal, Input } from '../ui';
import { UserSupportedCard } from '../user-supported-card';
import styles from './gift-page.module.css';
import { useParams, useHistory, useLocation } from 'react-router-dom';

export const GiftPage = ({ extraClass = '' }) => {
  const history = useHistory();
  const current = useLocation();
  const { id } = useParams();
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [currentSupportedBtn, setCurrentSupportedBtn] = React.useState(100);
  const [anotherSum, setAnotherSum] = React.useState(0);
  
  const [wishData, setWishData] = React.useState({});
  React.useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      getCard(id).then((res) => {
        setWishData(res);
      });
    }
  }, [id]);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handleGoToShop = () => {
    window.open(wishData.link, '_blank');
  };

  const handleCopyClick = () => {
    copyWish(wishData.id).then(()=>history.push('/wishlist'))
  }

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleSupportClick = () => {
    return addOffer({amount: parseInt(anotherSum), itemId: wishData.id, hidden: false }).then(()=>history.replace({pathname: current}))
  }
  const handleSupportedBtnsClick = (e) => {
    const value = e.target.closest('button').getAttribute('id');
    setAnotherSum(+value);
  };

  const handleChangeInput = (e) => {
    setAnotherSum(e.target.value);
  };

  return (
    <section className={`${styles.content} ${extraClass}`}>
      <ButtonReturn />
      <h1 className="text text_type_h1 mb-16">{wishData.name}</h1>
      <div className={styles.data_box}>
        <img className={styles.img} src={wishData.image} alt="Фото подарка." />
        <div className={styles.gift_data}>
          <h2 className="text text_type_h1 mb-16">{`${wishData.price} руб.`}</h2>

          <p className="text text_type_main" style={{ maxWidth: '75%' }}>
            {`Добавлено ${new Date(wishData.createdAt).toLocaleDateString()} пользователем `}
            <NavLink
              to={`/users/${wishData?.owner?.username}`}
              className={`text text_type_main text_color_primary ${styles.link}`}
            >
              {`${wishData?.owner?.username} ${"\u{2197}"}`}
            </NavLink>
          </p>
          <LoadingBox
            current={wishData.raised}
            total={wishData.price}
            extraClass={styles.load}
          />
          <div className={styles.btns_box}>
            <Button
              type="support"
              kind="secondary"
              text="Перейти в магазин"
              extraClass={styles.btn}
              onClick={handleGoToShop}
            />
            <Button
              type="button"
              kind="secondary"
              text="Поддержать"
              extraClass={styles.btn}
              onClick={handlePopupOpen}
            />
            <Button
              type="button"
              kind="support"
              text="Добавить в вишлист"
              extraClass={styles.btn}
              onClick={handleCopyClick}
            />
          </div>
        </div>
      </div>
      <div className={styles.supported_box}>
        <div className={styles.subtitle_box}>
          <h2 className="text text_ty-e_h2">Список поддержавших</h2>
        </div>

        {wishData?.offers?.map((offer) => (

          <UserSupportedCard
            name="Clara Zieme"
            amount={300}
            date="2 дня назад"
          />
        ))}
        <UserSupportedCard name="Clara Zieme" amount={300} date="2 дня назад" />
      </div>

      {isPopupOpen && (
        <Modal
          onClose={handlePopupClose}
          extraClass={styles.modal}
          isCloseBtn={true}
        >
          <div className={styles.popup}>
            <h2 className="text text_type_h2 mb-20">Поддержите любой суммой</h2>
            <div className={`mb-20 ${styles.gift_btns_box}`}>
              {priceArr.map((item, index) => {
                return (
                  <Button
                    key={index}
                    id={item}
                    type="button"
                    extraClass={styles.price_btn}
                    text={`${item} руб`}
                    kind={
                      currentSupportedBtn === item && !anotherSum
                        ? 'primary'
                        : 'support'
                    }
                    onClick={handleSupportedBtnsClick}
                  />
                );
              })}
              <Input
                type="number"
                extraInputClass={styles.price_input}
                placeholder="Сумма предложения"
                value={anotherSum}
                onChange={handleChangeInput}
              />
            </div>
            <Button
              type="button"
              kind="secondary"
              text="Поддержать"
              onClick={handleSupportClick}
              extraClass={styles.supported_btn}
            />
          </div>
        </Modal>
      )}
    </section>
  );
};
