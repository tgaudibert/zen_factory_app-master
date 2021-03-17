import fr from "./fr.json";
import en from "./en.json";

const data = {
  fr,
  en
};

export const setAppLang = () => {
  let trad = Localization.locale.split("-")[0];// Set par défaut une Langue si la langue du téléphone n'est pas traduite dans un JSON
  if (!data.hasOwnProperty(trad)) {
    trad = "en";
  }
  return trad;
};



export const inApptranslate = (lang = "en", keyWord = "NOT_DEFINE") => {
  return data[lang].hasOwnProperty(keyWord)
    ? data[lang][keyWord]
    : data[lang]["NOT_DEFINE"];
};
