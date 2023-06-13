<!-- {"s_msg":"this file was automatically generated","s_by":"f_generate_markdown.module.js","s_ts_created":"Tue Jun 13 2023 15:09:02 GMT+0200 (Central European Summer Time)","n_ts_created":1686661742257} -->
# import libs
```javascript

import {
    f_assert_equals, 
    f_deno_test, 
    f_deno_test_summary,
    f_deno_test_all_and_print_summary 
} from "https://deno.land/x/deno_test_server_and_client_side@0.4/mod.js"

import {
    f_b_daylight_saving_time,
    f_s_isotimezone__from_s_timezone,
    f_s_ymd__from_n_ts_ms_utc,
    f_s_dmy__from_n_ts_ms_utc,
    f_s_hms__from_n_ts_ms_utc,
    f_s_ymd_hms__from_n_ts_ms_utc,
    f_n_ms_offset_from_s_timezone_n_ts_ms
} from "./client.module.js"

```
# usage
(just ignore the 'f_deno_test stuff')
```javascript


let n_ts_ms_utc__2023_06_06_13_14_32 = 1686057272545;
await f_deno_test_all_and_print_summary(
    [
```
# search a timezone and get iso string
```javascript
        f_deno_test("f_s_isotimezone__from_s_timezone", () => {
            f_assert_equals(
                f_s_isotimezone__from_s_timezone('Zurich'),
                'Europe/Zurich'
            );
        }),
```
# check if daylight saving time is on (check if 'summertime' is on)
```javascript
        f_deno_test("f_b_daylight_saving_time", () => {
            f_assert_equals(
                f_b_daylight_saving_time(new Date("2023-06-01 10:20:20")),
                true
            );

        }),
```
# get the timeoffset from a timezone
```javascript
        f_deno_test("f_n_ms_offset_from_s_timezone_n_ts_ms__daylight_saving_time", () => {

            f_assert_equals(
                f_n_ms_offset_from_s_timezone_n_ts_ms(
                    'Europe/Zurich', 
                    new Date("2023-06-02 00:00:00").getTime()
                ),
                2*60*60*1000
            );

        }),
```
# get the timeoffset from a timezone (in winter it is one hour less)
```javascript
        f_deno_test("f_n_ms_offset_from_s_timezone_n_ts_ms", () => {

            f_assert_equals(
                f_n_ms_offset_from_s_timezone_n_ts_ms(
                    'Europe/Zurich', 
                    new Date("2023-01-02 00:00:00").getTime()
                ),
                1*60*60*1000
            );

        }),
```
# convert a date to YYYY-MM-DD HH:II:SS (by providing a timezone)
```javascript


        f_deno_test("f_s_ymd__utc", () => {
            f_assert_equals(
                f_s_ymd__from_n_ts_ms_utc(
                    n_ts_ms_utc__2023_06_06_13_14_32, 
                    'UTC'
                ),
                '2023-06-06'
            );
        }),
        f_deno_test("f_s_hms__utc", () => {
            f_assert_equals(
                f_s_hms__from_n_ts_ms_utc(
                    n_ts_ms_utc__2023_06_06_13_14_32, 
                    'UTC'
                ),
                '13:14:32'
            );
        }),
        f_deno_test("f_s_ymd_hms__utc", () => {
            f_assert_equals(
                f_s_ymd_hms__from_n_ts_ms_utc(
                    n_ts_ms_utc__2023_06_06_13_14_32, 
                    'UTC'
                ),
                '2023-06-06 13:14:32'
            );
        }),

        f_deno_test("f_s_ymd", () => {
            f_assert_equals(
                f_s_ymd__from_n_ts_ms_utc(
                    n_ts_ms_utc__2023_06_06_13_14_32, 
                    'Europe/Zurich'
                ),
                '2023-06-06'
            );
        }),
        f_deno_test("f_s_hms", () => {
            f_assert_equals(
                f_s_hms__from_n_ts_ms_utc(
                    n_ts_ms_utc__2023_06_06_13_14_32, 
                    'Europe/Zurich'
                ),
                '15:14:32'
            );
        }),
        f_deno_test("f_s_ymd_hms", () => {
            f_assert_equals(
                f_s_ymd_hms__from_n_ts_ms_utc(
                    n_ts_ms_utc__2023_06_06_13_14_32, 
                    'Europe/Zurich'
                ),
                '2023-06-06 15:14:32'
            );
        }),

        f_deno_test("f_s_dmy", () => {
            f_assert_equals(
                f_s_dmy__from_n_ts_ms_utc(
                    n_ts_ms_utc__2023_06_06_13_14_32, 
                    'Europe/Zurich'
                ),
                '06-06-2023'
            );
        }),

    ]
)


```