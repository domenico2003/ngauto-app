export const SET_PROFILE = "SET_PROFILE";
export const SET_PROFILEDETAILS = "SET_PROFILEDETAILS";
export const SET_ALIMENTAZIONI = "SET_ALIMENTAZIONI";
export const SET_CAMBI = "SET_CAMBI";
export const SET_MARCHE = "SET_MARCHE";

export const setProfileAction = (dato) => {
  return { type: SET_PROFILE, payload: dato };
};
export const setProfileDetailsAction = (dato) => {
  return { type: SET_PROFILEDETAILS, payload: dato };
};

export const setAlimentazioniAction = (dato) => {
  return { type: SET_ALIMENTAZIONI, payload: dato };
};
export const setCambiAction = (dato) => {
  return { type: SET_CAMBI, payload: dato };
};
export const setMarcheAction = (dato) => {
  return { type: SET_MARCHE, payload: dato };
};

export const profileFetch = () => {
  return async (dispatch) => {
    const URL = "http://localhost:3001/utente/me";
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();
        dispatch(setProfileAction(dato));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const DetailsProfileFetch = (id) => {
  return async (dispatch) => {
    const URL = "http://localhost:3001/utente/" + id;
    const headers = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();

        dispatch(setProfileDetailsAction(dato));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const AlimentazioniFetch = () => {
  return async (dispatch) => {
    const URL = "http://localhost:3001/automobili/all/alimentazioni";
    const headers = {};
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();

        dispatch(setAlimentazioniAction(dato));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const cambiFetch = () => {
  return async (dispatch) => {
    const URL = "http://localhost:3001/automobili/all/cambi";
    const headers = {};
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();

        dispatch(setCambiAction(dato));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const marcheFetch = () => {
  return async (dispatch) => {
    const URL = "http://localhost:3001/automobili/all/marche";
    const headers = {};
    try {
      let risposta = await fetch(URL, headers);
      if (risposta.ok) {
        let dato = await risposta.json();

        dispatch(setMarcheAction(dato));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
