import {
  defaultDirection,
  defaultLocale,
  defaultColor,
  localeOptions,
  themeColorStorageKey,
  themeRadiusStorageKey,
} from "constants/defaultValues";

export const KNOWLARITY_CONFIGS = {
  ["x-api-key"]: "I0SOwyNRvk8o5Qm6gx9RI7MvzHTnxnX29HAqgnAG",
  Authorization: "5380801a-b93f-4047-a2bf-aa3243ffd378",
  channel: "Basic",
  baseUrl: "https://kpi.knowlarity.com",
  superReceptionistNumber: "+919513631312",
};

export const mapOrder = (array, order, key) => {
  // eslint-disable-next-line func-names
  array.sort(function (a, b) {
    const A = a[key];
    const B = b[key];
    if (order.indexOf(`${A}`) > order.indexOf(`${B}`)) {
      return 1;
    }
    return -1;
  });
  return array;
};

export const getDateWithFormat = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // January is 0!

  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${dd}.${mm}.${yyyy}`;
};

export const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
};

export const getDirection = () => {
  let direction = defaultDirection;

  try {
    if (localStorage.getItem("direction")) {
      const localValue = localStorage.getItem("direction");
      if (localValue === "rtl" || localValue === "ltr") {
        direction = localValue;
      }
    }
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js : getDirection -> error", error);
    direction = defaultDirection;
  }
  return {
    direction,
    isRtl: direction === "rtl",
  };
};
export const setDirection = (localValue) => {
  let direction = "ltr";
  if (localValue === "rtl" || localValue === "ltr") {
    direction = localValue;
  }
  try {
    localStorage.setItem("direction", direction);
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js : setDirection -> error", error);
  }
};

export const getCurrentColor = () => {
  let currentColor = defaultColor;
  try {
    if (localStorage.getItem(themeColorStorageKey)) {
      currentColor = localStorage.getItem(themeColorStorageKey);
    }
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js : getCurrentColor -> error", error);
    currentColor = defaultColor;
  }
  return currentColor;
};

export const setCurrentColor = (color) => {
  try {
    localStorage.setItem(themeColorStorageKey, color);
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js : setCurrentColor -> error", error);
  }
};

export const getCurrentRadius = () => {
  let currentRadius = "rounded";
  try {
    if (localStorage.getItem(themeRadiusStorageKey)) {
      currentRadius = localStorage.getItem(themeRadiusStorageKey);
    }
  } catch (error) {
    console.log(
      ">>>>: src/helpers/Utils.js : getCurrentRadius -> error",
      error
    );
    currentRadius = "rounded";
  }
  return currentRadius;
};
export const setCurrentRadius = (radius) => {
  try {
    localStorage.setItem(themeRadiusStorageKey, radius);
  } catch (error) {
    console.log(
      ">>>>: src/helpers/Utils.js : setCurrentRadius -> error",
      error
    );
  }
};

export const getCurrentLanguage = () => {
  let language = defaultLocale;
  try {
    language =
      localStorage.getItem("currentLanguage") &&
      localeOptions.filter(
        (x) => x.id === localStorage.getItem("currentLanguage")
      ).length > 0
        ? localStorage.getItem("currentLanguage")
        : defaultLocale;
  } catch (error) {
    console.log(
      ">>>>: src/helpers/Utils.js : getCurrentLanguage -> error",
      error
    );
    language = defaultLocale;
  }
  return language;
};
export const setCurrentLanguage = (locale) => {
  try {
    localStorage.setItem("currentLanguage", locale);
  } catch (error) {
    console.log(
      ">>>>: src/helpers/Utils.js : setCurrentLanguage -> error",
      error
    );
  }
};

export const getCurrentUser = () => {
  let user = null;
  try {
    user =
      localStorage.getItem("insa_accessor") != null
        ? JSON.parse(localStorage.getItem("insa_accessor"))
        : null;
    const insa_agentToken =
      localStorage.getItem("insa_agentToken") != null
        ? JSON.parse(localStorage.getItem("insa_agentToken"))
        : null;
    user = { ...user, insa_agentToken };
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js  : insa_accessor -> error", error);
    user = null;
  }
  return user;
};

export const setCurrentUser = (user) => {
  try {
    if (user) {
      localStorage.setItem("insa_accessor", JSON.stringify(user));
    } else {
      localStorage.removeItem("insa_accessor");
      localStorage.removeItem("insa_agentToken");
    }
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js : insa_accessor -> error", error);
  }
};

// export const getAgentToken = () => {
//   try {
//     user = localStorage.getItem('insa_accessor') != null
//       ? JSON.parse(localStorage.getItem('insa_accessor'))
//       : null;
//   }
// }
