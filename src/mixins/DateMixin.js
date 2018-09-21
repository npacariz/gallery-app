let moment = require("moment");
export const mixins = {
  filters: {
    formatDate(value) {
      return moment(value).format("ll");
    },
    diffForHumans(value) {
      return moment(value).fromNow();
    }
  }
};
