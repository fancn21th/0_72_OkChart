okchart.init({
  clientId:
    '62894052188-ndunchslu23481qdh95rdogu39q5bd0l.apps.googleusercontent.com',
  authContainer: 'embed-api-auth-container',
  viewSelector: 'view-selector-container',
  charts: [
    {
      type: 'pv-uv',
      container: 'chart-container',
    },
    {
      type: 'distribution',
      container: 'user-distribution-container',
    },
    {
      type: 'buyers-regist',
      container: 'chart-container2',
    },
    {
      type: 'buyers-regist-distribution',
      container: 'chart-container3',
    },
  ],
})
