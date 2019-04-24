okchart.init({
  clientId:
    '62894052188-16nmlkpe3ns5k60dvctfsfrl1v2kr0i0.apps.googleusercontent.com',
  authContainer: 'embed-api-auth-container',
  viewSelector: 'view-selector-container',
  okBaseUrl: 'http://www.devokchem2.com', // Caution : this is a required field
  charts: [
    {
      type: 'ok-customer-overview',
      container: 'ok-customer-overview-container',
    },
    {
      type: 'ok-customer',
      container: 'ok-customer-container',
    },
    {
      type: 'overview',
      container: 'overview-container',
    },
    {
      type: 'pv-uv',
      container: 'pv-uv-container',
    },
    {
      type: 'distribution',
      container: 'distribution-container',
    },
    {
      type: 'source-top-15',
      container: 'source-top-15-container',
    },
    {
      type: 'buyers-regist',
      container: 'buyers-regist-container',
    },
    {
      type: 'buyers-regist-distribution',
      container: 'buyers-regist-distribution-container',
    },
    {
      type: 'suppliers-regist',
      container: 'suppliers-regist-container',
    },
    {
      type: 'suppliers-regist-distribution',
      container: 'suppliers-regist-distribution-container',
    },
  ],
})
