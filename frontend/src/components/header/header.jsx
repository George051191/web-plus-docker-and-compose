import React from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import logo from '../../images/icons/logo.svg';
import giftIcon from '../../images/icons/gift.svg';
import likeIcon from '../../images/icons/like.svg';
import profileIcon from '../../images/icons/profile.svg';
import { Button } from '../ui/button/button';
import { Textarea } from '../ui';
import { UserContext } from '../../utils/context';
import { Modal } from '../ui/modal/modal';
import { Input } from '../ui/input/input';
import styles from './header.module.css';
import { logoutUser, sendCard } from '../../utils/api';

export const Header = ({ extraClass = '' }) => {
  const [userCtx, setUserCtx] = React.useContext(UserContext);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isGiftPopupOpen, setIsGiftPopupOpen] = React.useState(false);
  const [giftData, setGiftData] = React.useState({

  })
  const history = useHistory();
  const current = useLocation()
  const isLoggedIn = !!userCtx?.id

  const onSubmit = () => {
    if (isLoggedIn) {
      handleGiftPopupOpen();
    } else {
      history.push('/signin');
    }
  };


  const onChangeInput = (e) => {
    e.preventDefault();
    setGiftData({
      ...giftData,
      [e.target.name]: e.target.name === "price" ? parseInt(e.target.value) : e.target.value,
    });
    console.log(giftData);
  };

  const submitGift = (e) => {
    e.preventDefault();
    sendCard(giftData).then(()=>setIsGiftPopupOpen(false)).then(history.replace({ pathname: '/wishlist' }))
  };

  const handleProfilePopupOpen = () => {
    setIsProfilePopupOpen(true);
  };

  const handleGiftPopupOpen = () => {
    setIsGiftPopupOpen(true);
  };

  const handlePopupClose = () => {
    isProfilePopupOpen && setIsProfilePopupOpen(false);
    isGiftPopupOpen && setIsGiftPopupOpen(false);
  };

  const logout = () => {
    logoutUser()
    setUserCtx(null)
    handlePopupClose()
    history.push({ pathname: "/" })
  }

  return (
    <header className={`${styles.header} ${extraClass}`}>
      <NavLink className={styles.nav} to="/">
        <img className={styles.logo} src={logo} alt="Логотип." />
      </NavLink>
      {isLoggedIn && <HeaderLinks handleProfilePopupOpen={handleProfilePopupOpen} userName={userCtx.name}/>}
      <Button
        type="button"
        kind="primary"
        text={`${isLoggedIn ? 'Добавить подарок' : 'Войти в профиль'}`}
        onClick={onSubmit}
      />
      {isProfilePopupOpen && (
        <Modal onClose={handlePopupClose} extraClass={styles.modal}>
          <div className={styles.popup}>
            <button
              className={`text text_type_button text_color_primary ${styles.popup_btn} ${styles.logout}`}
              type="button"
              onClick={logout}
            >
              Выйти из профиля
            </button>
            <div className={styles.line} />
            <NavLink
              to="/profile"
              className={`text text_type_button text_color_primary ${styles.popup_btn} ${styles.edit}`}
              onClick={handlePopupClose}
            >
              Редактировать профиль
            </NavLink>
          </div>
        </Modal>
      )}
      {isGiftPopupOpen && (
        <Modal
          onClose={handlePopupClose}
          extraClass={styles.gift_modal}
          isCloseBtn={true}
        >
          <form className={styles.gift_form} onSubmit={submitGift}>
            <h2 className="text text_type_h2 mb-16">Добавить подарок</h2>
            <Input
              type="text"
              id={20}
              extraClass="mb-12"
              label="Название подарка"
              name="name"
              onChange={onChangeInput}
              placeholder="Укажите название подарка"
            />
            <Input
              type="url"
              id={21}
              extraClass="mb-12"
              name="link"
              label="Ссылка на магазин"
              onChange={onChangeInput}
              placeholder="Укажите ссылку"
            />
            <Input
              type="url"
              id={22}
              extraClass="mb-12"
              name="image"
              onChange={onChangeInput}
              label="Ссылка на изображение подарка"
              placeholder="Укажите ссылку"
            />
            <Textarea
              name="description"
              id={23}
              placeholder="Несколько слов о вашем желании"
              label="Расскажите о вашем подарке"
              onChange={onChangeInput}
              maxLength={1024}
            />
            <Input
              type="number"
              name="price"
              id={24}
              extraClass={`mb-16 ${styles.price_input}`}
              label="Стоимость подарка (руб.)"
              onChange={onChangeInput}
              placeholder="Укажите стоимость"
            />
            <Button
              type="submit"
              extraClass={styles.gift_btn}
              text="Добавить подарок"
              kind="secondary"
            />
          </form>
        </Modal>
      )}
    </header>
  );
};

const HeaderLinks = ({ handleProfilePopupOpen, userName }) => {
  const profileLabel = userName ? `Профиль ${userName}` : `Профиль`
  const { pathname } = useLocation()


  const setInactive = (isActive) => {
    const inactiveClassName = `${styles.nav} ${styles.nav_inactive}`

    return isActive ? inactiveClassName : styles.nav
  }

  return (
    <ul className={styles.nav_box}>
      <li className={styles.nav_link}>
        <NavLink className={setInactive} to="/gifts" >
          <img src={giftIcon} alt="Иконка подарков." />
          <p className="text text_type-main text_color_primary ml-3">Подарки</p>
        </NavLink>
      </li>
      <li className={styles.nav_link}>
        <NavLink className={setInactive} to="/wishlist">
          <img src={likeIcon} alt="Иконка лайка." />
          <p className="text text_type-main text_color_primary ml-3">
            Мой вишлист
          </p>
        </NavLink>
      </li>
      <li className={styles.nav_link}>
        <button className={styles.nav} onClick={handleProfilePopupOpen}>
          <img src={profileIcon} alt="Иконка профиля." />
          <p className="text text_type_main text_color_primary ml-3">{profileLabel}</p>
        </button>
      </li>
    </ul>
  );
};
