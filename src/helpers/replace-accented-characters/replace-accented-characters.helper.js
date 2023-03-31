export const replaceAccentedCharacters = (str) => {
  const accentMap = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ö: "o",
    ő: "o",
    ú: "u",
    ü: "u",
    ű: "u",
    Á: "A",
    É: "E",
    Í: "I",
    Ó: "O",
    Ö: "O",
    Ő: "O",
    Ú: "U",
    Ü: "U",
    Ű: "U",
  };
  return str.replace(/[áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/g, function (matchedChar) {
    return accentMap[matchedChar];
  });
};
