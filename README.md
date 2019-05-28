# OKCHART

> a chart component for OKCHEM.COM

## Dev Env Setup

- editor

  - vscode is preferred
  - prettier is a MUST

- install

  - run `npm i`

- hosts

  - due to the custom okchem api request, a fake host domain need to be appended in local dev environment

    - for windows

      > host file located at `C:\Windows\System32\drivers\etc`

      ```text
      # append to host file
      127.0.0.1 abc.devokchem2.com
      ```

## Code Style

- ES2015 intertwined with old fashion code

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

  - Model
    - One model, multiple views
    - Pipeline
  - View
    - For one model only
  - Presenter
    - One presenter for one page

- Type aka key

- Data Flow

  - Flow

    - selector data
    - filtered selector data
    - query data
    - ga response data
    - universal data processing
    - custom data processing
    - view data

  - Data Pipeline

    > due to the async data request, the data flow is split into two pieces

    - query data pipeline

      - filterSelectorData
      - queryConverter
        - ids
        - metrics
        - dimensions
        - date
        - sort
        - maxResult

    - fetch data

      > based on query data

      - cache data

        > based on filtered selector data

      - response data
        > response data is an array

    - view data pipeline

      > based on response data from fetch data

      - universal view data pipeline

        - filter working date

          > only if workingDate in selector data

        - group by specified field index

          > only if groupByFieldIdx in model config

          > sumFieldIndex is needed

          - field index is based on the array that calculate against

        - sort by specified field (not index)

          > only if sortField in in model config

          - field index is based on the array that calculate against

      - custom view data pipeline

        > based on universal view data

## Okchar Dev Workflow Ver.2

### File Structure

> along with data flow

- default selector

  > at very first time, data flow starts with default selector

  - location
    - Config/DefaultSelector

- selector filter

  > for ga response data cache, a unique key is a must

  - location
    - Config/SelectorFilter

- query converter

  > define how selector data is about to be converted into query data

  - location
    - Config/QueryConverter

- model config

  - location

    - Config/Model

  - properties
    - customConverters
    - groupFieldIndex
    - sumFieldIndex
    - sortField

### Detailed Design

## Okchar Dev Workflow Ver.1

### File Structure

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

  - Verification (optional)

    - Check With Diagram

      - URL - https://analytics.google.com/analytics/web

      - Customization 自定义

        - Dashboards 信息中心 (Custom Goal)

    - Check With Pure Data

      - URL - https://ga-dev-tools.appspot.com/query-explorer/

### Detailed Design

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

- Converter
  - data
    - from `ga` data to `g2` data
  - query
    - from `selector` data to `ga api params` data
