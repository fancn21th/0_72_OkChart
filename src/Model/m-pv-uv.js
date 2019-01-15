import Observer from '../Utils/Observer'
import convert from '../DataConverter/dc-pv-uv'

const Model = function (query) {
  this.query = query;
  this.pv_uv = new Observer();
};

Model.prototype = {
  getPvUv: function (params) {
    this.query.query(params).then(response => {
      console.log(response)
      this.pv_uv.notify(convert(response.rows));
    })
  },
};

export default Model
