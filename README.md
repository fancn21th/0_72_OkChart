# OKCHART

> a chart component for OKCHEM.com

## Code Style

- ES2015 with old fashion code

  > say farewell to ES5

- Inheritance

  > refer to: Professional JavaScript for Web Developers 3rd Edition

  ```javascript
  function inheritPrototype(subType, superType) {
    var prototype = Object.create(superType.prototype) //创建对象
    prototype.constructor = subType //增强对象
    subType.prototype = prototype //指定对象
  }

  function SuperType(name) {
    this.name = name
    this.colors = ['red', 'blue', 'green']
  }

  SuperType.prototype.sayName = function() {
    alert(this.name)
  }

  function SubType(name, age) {
    SuperType.call(this, name)
    this.age = age
  }

  inheritPrototype(SubType, SuperType)
  SubType.prototype.sayAge = function() {
    alert(this.age)
  }
  ```

## Architecture Design

- MVP

  - Model (multiple model per view)
  - View (multiple view per page)
  - Presenter (1 per page)

- Type aka key
  - Key Flow
    - client key -> view and model/models

## Bad Design

- Default Model Query
  > By default the model send query to `ga` and it is accidentally in consistency with the default state of view selector which is a bad-convention

## Workflow

- FR

- Code

  - Create

    - model
    - view
      - chart
      - selector
        - selector control (only if absent)
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
    - css
      > BEM
      - selector control style

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

        - URL - https://developers.google.com/analytics/devguides/reporting/core/dimsmets

      - Verification (optional)

        - URL - https://analytics.google.com/analytics/web

        - Customization 自定义

          - Dashboards 信息中心

- Converter
  - data
    - from `ga` data to `g2` data
  - query
    - from `selector` data to `ga api params` data
