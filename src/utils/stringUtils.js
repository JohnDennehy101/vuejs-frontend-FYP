export default {
    extractGoogleMapLink(link) {
      let startIndex = link.indexOf('"');
      let endIndex = link.indexOf('"', startIndex + 1);
      return link.toString().substring(startIndex + 1, endIndex);
    },
}