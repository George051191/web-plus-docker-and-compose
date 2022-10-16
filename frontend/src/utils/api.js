import { URL } from "./constants";

const checkResponse = (res) => {
    if (res.ok || res.created) {
        return res.json();
    }
    return res.json().then((err) => {
        alert(err.message)
        return Promise.reject(err)
    });
};;
const headersWithContentType = { "Content-Type": "application/json" };

export const registerUser = (userData) => {
    return fetch(`${URL}/signup/`, {
        method: "POST",
        headers: headersWithContentType,
        body: JSON.stringify(userData),
    }).then(checkResponse).catch((err) => console.log(err.message));
};

export const loginUser = (username, password) => {
    return fetch(`${URL}/signin/`, {
            method: "POST",
            headers: headersWithContentType,
            body: JSON.stringify({ username, password }),
        })
        .then(checkResponse)
        .then((data) => {
            if (data.access_token) {
                localStorage.setItem("auth_token", data.access_token);
                return data;
            } else {
                return;
            }
        });
};

export const logoutUser = () => {
    localStorage.removeItem("auth_token");
};

export const refreshAndSet = (method, contextSetter) => {
    method().then(contextSetter)
}

export const refreshUser = (contextSetter) => {
    try {
        getUser().then(user => contextSetter(user))
    } catch (e) {
        console.error('Failed updating user')
    }
}

export const getUser = () => {
    return fetch(`${URL}/users/me/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
    }).then(checkResponse);
};

export const updateProfile = (user) => {
    return fetch(`${URL}/users/me/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(user)
    }).then(checkResponse);
};

export const getCards = (page = 1) => {
    return fetch(`${URL}/wishes/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
    }).then(checkResponse);
};

export const getOwnWishes = () => {
    return fetch(`${URL}/users/me/wishes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
    }).then(checkResponse);
};


export const removeWish = (id) => {
    return fetch(`${URL}/wishes/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
    }).then(checkResponse);
};



export const addOffer = (offer) => {
    return fetch(`${URL}/offers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(offer)
    }).then(checkResponse);
};


export const getTopCards = () => {
    return fetch(`${URL}/wishes/top`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
    }).then(checkResponse);
};

export const getLastCards = (page = 1) => {
    return fetch(`${URL}/wishes/last`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
    }).then(checkResponse);
};


export const getCard = (id) => {
    return fetch(`${URL}/wishes/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
    }).then(checkResponse);
};

export const sendCard = (wish) => {
    return fetch(`${URL}/wishes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(wish),
    }).then(checkResponse);
};

export const updateCard = (card, id) => {
    return fetch(`${URL}/wishes/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(card),
    }).then(checkResponse);
};

export const copyWish = (id) => {
    return fetch(`${URL}/wishes/${id}/copy`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        }
    }).then(checkResponse);
};



export const removeCard = (id) => {
    return fetch(`${URL}/wishes/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        }
    }).then(checkResponse);
};