# OKCHART

> a chart component for okchem.com

## Code Style

- ES2015 with old fashion code

## Architecture Design

- MVP

- key
  - client key - chart key
  - selector key - view key
  - model key - event key

## Workfow

- FR

  http://115.29.196.46/story-view-2301-5-project-131.html

- Code Update

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

    - Chart Demo

      https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html

    - API reference

      https://www.yuque.com/antv/g2-docs/api-g2

    - 3 functions
      - constructor
      - init
      - render

  - Selector
    - selector control
      - update html builder

- Model (data)

  - API

    - Google Embeded API

      - Query

      https://developers.google.com/analytics/devguides/reporting/core/v3/reference

      - Metrics & Dimesions

      https://developers.google.com/analytics/devguides/reporting/core/dimsmets

      - Verification (optional)

        - 自定义

          - 信息中心

        - URL - https://analytics.google.com/analytics/web

  - converter
    - data
    - query
