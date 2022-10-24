export const URL = "https://api.kupipodariday.project.nomoredomains.icu";

export const MINIMUM_PASSWORD_LENGTH = 3
export const MINIMUM_USERNAME_LENGTH = 3
export const MAXIMUM_DESCRIPTION_LENGTH = 200
export const MAXIMUM_USERNAME_LENGTH = 64

export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export const makeRightDeclension = (count, txt, cases = [2, 0, 1, 1, 1, 2]) =>
    txt[
        count % 100 > 4 && count % 100 < 20 ?
        2 :
        cases[count % 10 < 5 ? count % 10 : 5]
    ];

export const priceArr = [100, 300, 500, 1000, 3000];