import React from 'react';
import { MAXIMUM_DESCRIPTION_LENGTH, MAXIMUM_USERNAME_LENGTH } from '../../utils/constants';
import { UserContext } from '../../utils/context';
import { Button, Input, Textarea } from '../ui';
import styles from './profile-page.module.css';
import { updateProfile, refreshUser } from '../../utils/api';
import { useHistory, useLocation } from 'react-router-dom';

export const ProfilePage = ({ extraClass = '' }) => {
  const history = useHistory();
  const location = useLocation();
  const [userCtx, setUserCtx] = React.useContext(UserContext);
  const [profileData, setProfileData] = React.useState({});

  const [personalData, setPersonalData] = React.useState({});

  console.log(userCtx);

  const changeProfileData = (event) => {
    const field = event.target.name;

    setProfileData({
      ...profileData,
      [field]: event.target.value,
    });
  };

  const changePersonalData = (event) => {
    const field = event.target.name;

    setPersonalData({
      ...personalData,
      [field]: event.target.value,
    });
  };

  const submitFormData = (event) => {
    const { value: submitKey } = event.nativeEvent.submitter;
    event.preventDefault();

    if (submitKey === 'profileData') {
      updateProfile(profileData).then(() => refreshUser(setUserCtx));
    }

    if (submitKey === 'personalData') {
      updateProfile(personalData).then(() => refreshUser(setUserCtx));
    }
  };

  return (
    <section className={`${styles.content} ${extraClass}`}>
      <h1 className={`text text_type_h1 text_color_primary ${styles.title}`}>
        Профиль {userCtx.username}
      </h1>
      <h2 className={`text text_type_h2 text_color_primary mb-20`}>
        Настройки профиля
      </h2>
      <form className={styles.form} onSubmit={submitFormData}>
        <label htmlFor="image" className={styles.img_box}>
          <div className={styles.avatar}>
            <img className={styles.img} src={userCtx.avatar} />
          </div>
        </label>
        <Input
          name="avatar"
          type="url"
          id="avatar"
          defaultValue={userCtx.avatar}
          placeholder="Укажите тут ссылку на аватар"
          label="Аватар"
          onChange={changeProfileData}
          extraClass="mb-16"
          required={true}
        />
        <Textarea
          name="about"
          type="text"
          id="about"
          defaultValue={userCtx.about}
          placeholder="Несколько предложений о себе"
          label="О себе"
          onChange={changeProfileData}
          maxLength={MAXIMUM_DESCRIPTION_LENGTH}
        />
        <p className={`text text_type_small mt-4 mb-16 ${styles.caption}`}>
          {`${
            profileData?.about?.length || 0
          }/${MAXIMUM_DESCRIPTION_LENGTH} символов`}
        </p>
        <Button
          type="submit"
          kind="secondary"
          text="Сохранить изменения"
          name="profileData"
          extraClass={styles.btn}
          value="profileData"
        />
        <h2
          className={`text text_type_h2 text_color_primary mb-16 ${styles.h2}`}
        >
          Личная информация
        </h2>
        <Input
          name="email"
          type="email"
          id={4}
          placeholder="Укажите тут"
          label="E-mail"
          onChange={changePersonalData}
          extraClass="mb-12"
          defaultValue={userCtx.email}
        />
        <Input
          name="password"
          type="password"
          id="password"
          placeholder="*******"
          label="Пароль"
          onChange={changePersonalData}
          extraClass="mb-16"
        />
        <Input
          name="username"
          type="text"
          id={5}
          placeholder="username"
          label="Юзернейм"
          onChange={changePersonalData}
          extraClass="mb-16"
          defaultValue={userCtx.username}
          maxLength={MAXIMUM_USERNAME_LENGTH}
        />
        <Button
          type="submit"
          kind="secondary"
          text="Сохранить изменения"
          name="personalData"
          extraClass={styles.btn}
          value="personalData"
        />
      </form>
    </section>
  );
};
