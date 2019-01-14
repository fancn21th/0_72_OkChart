import Observer from '../Utils/Observer'

const Model = function (query) {
  this.query = query;
  this.pv_uv = new Observer();
};

Model.prototype = {
  getPvUv: function (params) {
    this.query.query(params).then(data => {
      this.pv_uv.notify(data);
    })
  },
};

export default Model
