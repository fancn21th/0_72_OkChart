# OKCHART

> a chart component for okchem.com

## Code Style

- ES2015 with old fashion code

## Architecture Design

- MVP

  - Model (1 per view)
  - View (n per page)
  - Presenter (1 per page)

- Type aka key
  - client key - chart key
  - selector key - view key
  - model key - event key
  - selector control type

## Workfow

- FR

  http://115.29.196.46/story-view-2301-5-project-131.html

- Code

  - Create

    - model
    - view
      - chart
      - selector
        - selector control
    - converter
      - data
      - query

  - Update
    - assets
      - client.js
      - index.html
    - factory
      - view
      - model
      - converter query
    - css
      - selector control style
      - BEM

## Detailed Design

- View

  - Chart

    - Chart Demo (Pick up a chart)

      https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html

    - API reference

      https://www.yuque.com/antv/g2-docs/api-g2

    - 3 functions (two process - create/update)
      - constructor
      - init
      - render

  - Selector
    - selector control
      - update html builder
        - right control

- Model (data)

  - API

    - Google Embeded API

      - Query

        - URL - https://developers.google.com/analytics/devguides/reporting/core/v3/reference
        - Query Params

        ```javascript
        const param = {
          ids,
          metrics: 'ga:pageviews,ga:uniquePageviews',
          dimensions: dimensionsStr,
          'start-date': startDateStr,
          'end-date': enDateStr,
        }
        ```

      - Metrics & Dimesions

      https://developers.google.com/analytics/devguides/reporting/core/dimsmets

      - Verification (optional)

        - URL - https://analytics.google.com/analytics/web

        - Customization 自定义

          - Dashboards 信息中心

- Converter
  - data
    - from `ga` data to `g2` data
  - query
    - from `selector` data to `ga api params` data
