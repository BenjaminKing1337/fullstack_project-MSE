import { useQuasar } from "quasar";

const Utils = () => {
  const $q = useQuasar();
  const NotifySuccess = (message) => {
    $q.notify({
      position: "top",
      color: "positive",
      textColor: "white",
      icon: "cloud_done",
      message: message,
      actions: [
        {
          label: "Dismiss",
          color: "white",
          handler: () => {
            /* ... */
          },
        },
      ],
    });
  };
  const NotifyError = (message) => {
    $q.notify({
      position: "top",
      color: "negative",
      textColor: "white",
      icon: "warning",
      message: message,
      actions: [
        {
          label: "Dismiss",
          color: "white",
          handler: () => {
            /* ... */
          },
        },
      ],
    });
  };
  const validateNotRequiredField = (value, rule) => {
    let isFieldOk = true;
    if (value != "" && value != undefined && value.length < rule)
      isFieldOk = false;
    return isFieldOk;
  };
  return {
    NotifySuccess,
    NotifyError,
    validateNotRequiredField,
  };
};

export default Utils;
