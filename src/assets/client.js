okchart.init({
  clientId:
    '62894052188-ndunchslu23481qdh95rdogu39q5bd0l.apps.googleusercontent.com',
  authContainer: 'embed-api-auth-container',
  viewSelector: 'view-selector-container',
  charts: [
    {
      type: 'overview',
      container: 'overview-container',
    },
    // {
    //   type: 'pv-uv',
    //   container: 'pv-uv-container',
    // },
    // {
    //   type: 'distribution',
    //   container: 'distribution-container',
    // },
    // {
    //   type: 'source-top-15',
    //   container: 'source-top-15-container',
    // },
    // {
    //   type: 'buyers-regist',
    //   container: 'buyers-regist-container',
    // },
    {
      type: 'buyers-regist-distribution',
      container: 'buyers-regist-distribution-container',
    },
    // {
    //   type: 'suppliers-regist',
    //   container: 'suppliers-regist-container',
    // },
    // {
    //   type: 'suppliers-regist-distribution',
    //   container: 'suppliers-regist-distribution-container',
    // },
  ],
})
