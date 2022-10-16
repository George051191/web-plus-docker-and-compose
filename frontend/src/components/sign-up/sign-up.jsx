import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./sign-up.module.css";
import { Input, Button, Textarea } from "../ui";
import { NavLink } from "react-router-dom";
import avatarIcon from "../../images/icons/avatar.svg";
import { UserContext } from "../../utils/context";
import { getUser, loginUser, registerUser } from "../../utils/api";
import { MINIMUM_PASSWORD_LENGTH, MINIMUM_USERNAME_LENGTH, MAXIMUM_DESCRIPTION_LENGTH } from '../../utils/constants'

export const SignUp = ({ extraClass = "" }) => {
  const [user, setUser] = useContext(UserContext);
  const [userData, setUserData] = React.useState({
    username: '',
    email: '',
    password: '',
    description: '',
    avatar: ''
  });
  const [step, setStep] = React.useState(1);
  const history = useHistory();

  useEffect(() => {
    console.log(step, userData);
  }, [step, userData]);

  const onChangeInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const usernameValid = userData.username.length >= MINIMUM_USERNAME_LENGTH
  const passwordValid = userData.password.length >= MINIMUM_PASSWORD_LENGTH
  const descriptionValid = userData.description.length < MAXIMUM_DESCRIPTION_LENGTH
  const stepOneDisabled = !usernameValid || !passwordValid


  const stepTwoDisabled = !descriptionValid

  const handleSubmit = async () => {
    if (step === 1) {
      setStep(2);
    } else {
      const user = await registerUser(userData);
      const { access_token } = await loginUser(
        userData.username,
        userData.password
      );
      if (access_token) {
        const userDto = await getUser();

        if (userDto.id) {
          setUser({ ...userDto });
          history.replace({ pathname: "/" });
        }
      }
    }
  };

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <h2
        className={`text text_type_h2 text_color_primary mb-16 ${styles.title}`}
      >
        {`Регистрация ${step === 1 ? "1/2" : "2/2"}`}
      </h2>
      <form className={styles.form}>
        {step === 1 ? (
          <StepOne onChangeInput={onChangeInput} />
        ) : (
          <StepTwo onChangeInput={onChangeInput} />
        )}
        <Button
          type="button"
          kind="secondary"
          text={`${step === 1 ? "Далее" : "Зарегистрироваться"}`}
          disabled={step === 1 ? stepOneDisabled : stepTwoDisabled}
          extraClass={styles.btn}
          onClick={handleSubmit}
        />
      </form>
      <div className={styles.links_box}>
        <p
          className={`text text_type_main text_color_primary mb-9 ${styles.text}`}
        >
          Уже зарегистрированы?
        </p>
        <NavLink
          to="/signin"
          className={`text text_type_button text_color_primary ${styles.nav}`}
        >
          Войти
        </NavLink>
      </div>
    </div>
  );
};

const StepOne = ({ onChangeInput }) => {
  return (
    <>
      <Input
        name="username"
        type="username"
        id={1}
        placeholder="Придумайте юзернейм"
        label="Юзернейм"
        onChange={onChangeInput}
        extraClass="mb-16"
        required={true}
      />
      <Input
        name="email"
        type="email"
        id={2}
        placeholder="Укажите тут"
        label="E-mail"
        onChange={onChangeInput}
        extraClass="mb-16"
        required={true}
      />
      <Input
        name="password"
        type="password"
        id={3}
        placeholder="Придумайте пароль"
        label="Пароль"
        onChange={onChangeInput}
        minLength={MINIMUM_PASSWORD_LENGTH}
        required={true}
      />
    </>
  );
};

const StepTwo = ({ onChangeInput }) => {
  return (
    <>
      <Textarea
        name="description"
        type="description"
        id={5}
        placeholder="Расскажите о себе"
        label="О себе"
        onChange={onChangeInput}
        extraClass="mb-16"
        maxLength={MAXIMUM_DESCRIPTION_LENGTH}
      />
      <Input
        name="avatar"
        type="url"
        id={7}
        placeholder="Укажите тут ссылку на аватар"
        label="Аватар"
        onChange={onChangeInput}
        extraClass="mb-16"
        required={true}
      />
    </>
  );
};
