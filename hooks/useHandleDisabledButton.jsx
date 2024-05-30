import { useEffect } from "react";

export const useHandleDisabledButton = (
  setDisable,
  values,
  errors,
  touched,
  signedin
) => {
  function isEmpty(obj) {
    return Object.entries(obj).length === 0;
  }
  function isNotEmpty(obj) {
    return Object.entries(obj).length > 0;
  }

  useEffect(() => {
    const checkInputs = () => {
      const touchedisNotEmpty = isNotEmpty(touched);

      if (touchedisNotEmpty) {
        if (isNotEmpty(errors)) setDisable(true);
        else setDisable(false);
      }
    };
    checkInputs();
  }, [values, signedin, errors, touched]);
};
