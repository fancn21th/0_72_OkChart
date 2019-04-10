# Custom API

## API 规范

- single API
- in JSON

## Query

> https://developers.google.com/analytics/devguides/reporting/core/v3/reference#q_summary

- 字段

  > dimensions, metrics 字段详细设计参考 相应的章节

  - metrics // 指标 - v1 迭代必要

    - string
    - optional

  - dimensions // 维度 - v1 迭代必要

    - string
    - required

  - start-date // 起始日期 - v1 迭代必要

    - string
    - required
    - 格式
      - `2019-01-01` // yyyy-MM-dd

  - end-date // 结束日期 - v1 迭代必要

    - string
    - required
    - 格式
      - `2019-01-01` // yyyy-MM-dd

  - max-results // 分页记录数

    - number
    - optional

  - sort // 排序

    - string
    - optional

- 范例

  ```javascript
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

  - rows // 返回表列信息 - v1 迭代必要

    - array of array of string

  - itemsPerPage

    - number

  - query

    - object

  - totalResults

    - number

  - totalsForAllResults
    - object

- 范例

  - TBD

## Dimensions & Metrics

- metrics

  - string
  - required
  - A list of comma-separated metrics, such as `ok:buyer,ok:supplier`
  - explorer
    - buyer
      - `ok:buyer`
    - supplier
      - `ok:supplier`

- dimensions
  - date
    - `ga:date`

## Detailed Design

- Buyer/Supplier Overview

  - query

    - table

    | Key         | Value                  |
    | ----------- | ---------------------- |
    | metrics     | "ok:buyer,ok:supplier" |
    | dimensions  | "ok:yearMonth"         |
    | start-date  | "2019-01-01"           |
    | end-date    | "2019-01-02"           |
    | max-results | n/a                    |
    | sort        | n/a                    |

    - example

    ```javascript
     {
       "query": {
        "start-date": "2019-01-01",
        "end-date": "2019-01-02",
        "dimensions": "ok:yearMonth",
        "metrics": "ok:buyer,ok:supplier",
        "max-results": 10000
      },
     }
    ```

  - response

    - table

    | Key                 | Value            |
    | ------------------- | ---------------- |
    | query               | refer to example |
    | itemsPerPage        | refer to example |
    | totalResults        | refer to example |
    | columnHeaders       | refer to example |
    | totalsForAllResults | refer to example |
    | rows                | refer to example |


    - example

    ```javascript
    {
      "query": {
        ... // as same as query request
      },
      "itemsPerPage": 10000,
      "totalResults": 2,
      "columnHeaders": [
        {
          "name": "ok:yearMonth",
          "columnType": "DIMENSION",
          "dataType": "STRING"
        },
        {
          "name": "ok:buyer",
          "columnType": "METRIC",
          "dataType": "STRING"
        },
        {
          "name": "ok:supplier",
          "columnType": "METRIC",
          "dataType": "STRING"
        }
      ],
      "totalsForAllResults": {
        "ok:buyer": "0",
        "ok:supplier": "0"
      },
      "rows": [["201901", "1", "2"], ["201902", "3", "4"]...]
    }
    ```

- Buyer/Supplier Line

  - query

    - table

    | Key         | Value                                              |
    | ----------- | -------------------------------------------------- |
    | metrics     | "ok:buyer,ok:supplier"                             |
    | dimensions  | "ok:date" or "ok:isoYearIsoWeek" or "ok:yearMonth" |
    | start-date  | "2019-01-01"                                       |
    | end-date    | "2019-01-02"                                       |
    | max-results | n/a                                                |
    | sort        | n/a                                                |

    - example

    ```javascript
     {
       "query": {
        "start-date": "2019-01-01",
        "end-date": "2019-01-02",
        "dimensions": "ok:yearMonth", // "ok:date" or "ok:isoYearIsoWeek" or "ok:yearMonth"
        "metrics": "ok:buyer,ok:supplier", // "ok:buyer" or  "ok:supplier"
        "max-results": 10000
      },
     }
    ```

  - response

    - table

    | Key                 | Value            |
    | ------------------- | ---------------- |
    | query               | refer to example |
    | itemsPerPage        | refer to example |
    | totalResults        | refer to example |
    | columnHeaders       | refer to example |
    | totalsForAllResults | refer to example |
    | rows                | refer to example |


    - example

    ```javascript
    {
      "query": {
        ... // as same as query request
      },
      "itemsPerPage": 10000,
      "totalResults": 2,
      "columnHeaders": [
        {
          "name": "ok:yearMonth", // "ok:date" or "ok:isoYearIsoWeek" or "ok:yearMonth"
          "columnType": "DIMENSION",
          "dataType": "STRING"
        },
        {
          "name": "ok:buyer",
          "columnType": "METRIC",
          "dataType": "STRING"
        },
        {
          "name": "ok:supplier",
          "columnType": "METRIC",
          "dataType": "STRING"
        }
      ],
      "totalsForAllResults": {
        "ok:buyer": "0",
        "ok:supplier": "0"
      },
      // when DIMENSION is "ok:isoYearIsoWeek" or "ok:yearMonth"
      "rows": [["201901", "1", "2"], ["201902", "3", "4"]...],
      // when DIMENSION is "ok:date"
      "rows": [["20190102", "1", "2"], ["20190102", "3", "4"]...]
    }
    ```
