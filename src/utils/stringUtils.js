export default {
  extractGoogleMapLink(link) {
    let startIndex = link.indexOf('"');
    let endIndex = link.indexOf('"', startIndex + 1);
    return startIndex && endIndex
      ? link.toString().substring(startIndex + 1, endIndex)
      : "#";
  },
  generatedTitleQueryGooglePlaces(string) {
    let result = "";
    let titleWord = "";
    for (let i in string) {
      if (string[i] === " ") {
        result += titleWord + "+";
        titleWord = "";
      } else if (string[i] !== " " && i != string.length - 1) {
        titleWord += string[i];
      } else if (i == string.length - 1) {
        titleWord += string[i];
        result += titleWord;
      }
    }
    return result;
  },
  generateGoogleMapsLink(coordinates, title) {
    const mapLocationTitle = this.generatedTitleQueryGooglePlaces(title);
    return `https://www.google.com/maps/place/${mapLocationTitle}/@${coordinates.lat},${coordinates.lng},17z/data=!3m1!4b1`;
    
  },
  generateUUID() {
    let d = new Date().getTime(),
      d2 = (performance && performance.now && performance.now() * 1000) || 0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = Math.random() * 16;
      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
    });
  },
  validateEmail(string) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(string);
  },
  validatePassword(string) {
    const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
    return passwordPattern.test(string) && string.length >= 7;
  },
  returnSubString(string) {
    if (string.length > 60) {
      return string.replace(/^(.{60}[^\s]*).*/, "$1") + "...";
    } else {
      return string;
    }
  },
};
