/* 
  clientid : 
  charts   :
*/
okchart.init({
  clientid: '',
  authContainer: 'embed-api-auth-container',
  charts: [{
    type: 'uv-pv', // to identify both types of chart and selector
    container: 'chart-container',
    selector: 'view-selector-container',
    options: {}
  }]
})