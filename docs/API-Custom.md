# Custom API

## API 规范

- Restful
- JSON

## Query

> https://developers.google.com/analytics/devguides/reporting/core/v3/reference#q_summary

- 字段

  > dimensions, metrics 字段详细设计参考 相应的章节

  - dimensions // 维度 - v1 迭代必要
    - string
    - required
  - end-date // 结束日期 - v1 迭代必要
    - string
    - required
    - 格式
      - `2019-01-01` // yyyy-MM-dd
  - max-results // 分页记录数
    - number
    - optional
  - metrics // 指标 - v1 迭代必要
    - string
    - optional
  - sort // 排序
    - string
    - optional
  - start-date // 起始日期 - v1 迭代必要
    - string
    - required
    - 格式
      - `2019-01-01` // yyyy-MM-dd

- 范例

  ```JSON
  {
    dimensions: "ok:buyer,ok:supplier"
    end-date: "2019-01-01"
    max-results: 10000
    metrics: "ok:buyer,ok:supplier"
    sort: undefined
    start-date: "2019-01-01"
  }
  ```

## Response

> https://developers.google.com/analytics/devguides/reporting/core/v3/reference#data_response

- 字段

  - columnHeaders // 返回表列信息 - v1 迭代必要
    - array of object
  - itemsPerPage
    - number
  - query
    - object
  - rows // 返回表列信息 - v1 迭代必要
    - array of array of string
  - totalResults
    - number
  - totalsForAllResults
    - object

- 范例

## Dimensions & Metrics

- metrics

  - buyer
    - `ok:buyer`
  - supplier
    - `ok:supplier`

- dimensions
  - date
    - `ga:date`
