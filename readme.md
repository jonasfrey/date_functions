<!-- {"s_msg":"this file was automatically generated","s_by":"f_generate_markdown.module.js","s_ts_created":"Sat Oct 28 2023 22:15:16 GMT+0200 (Central European Summer Time)","n_ts_created":1698524116921} -->
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
    f_n_ms_offset_from_s_timezone_n_ts_ms, 
    f_o_ts_range__day__from_n_ts_ms_utc,
    f_o_ts_range__week__from_n_ts_ms_utc,
    f_o_ts_range__month__from_n_ts_ms_utc,
    f_o_ts_range__year__from_n_ts_ms_utc,
    f_s_timestring_from_n_ms,
    f_measure_time
} from "./module.js"

```
# usage
# search a timezone and get iso string
```javascript
            f_assert_equals(
                f_s_isotimezone__from_s_timezone('Zurich'),
                'Europe/Zurich'
                );
```
# check if daylight saving time is on (check if 'summertime' is on)
```javascript
            f_assert_equals(
                f_b_daylight_saving_time(new Date("2023-06-01 10:20:20")),
                true
                );
```
# get the timeoffset from a timezone
```javascript
            f_assert_equals(
                f_n_ms_offset_from_s_timezone_n_ts_ms(
                    'Europe/Zurich', 
                    new Date("2023-06-02 00:00:00").getTime()
                ),
                2*60*60*1000
            );
```
# get the timeoffset from a timezone (in winter it is one hour less)
```javascript
            f_assert_equals(
                f_n_ms_offset_from_s_timezone_n_ts_ms(
                    'Europe/Zurich', 
                    new Date("2023-01-02 00:00:00").getTime()
                ),
                1*60*60*1000
            );
```
# convert a date to YYYY-MM-DD HH:II:SS (by providing a timezone)
```javascript
            f_assert_equals(
                f_s_ymd__from_n_ts_ms_utc(
                    n_ts_ms_utc__2023_06_06_13_14_32, 
                    'UTC'
                ),
                '2023-06-06'
            );
```
# get a O_ts_range object ({n_ts_ms_ut__start:...,n_ts_ms_ut__end:..., ...})
you can get a specific time range from n_ts_ms_ut
for example the start of the month and the end of the month,
```javascript
            let n_ts_ms = new Date(2023, 6, 7, 16, 50, 0);
            let o_ts_range = f_o_ts_range__day__from_n_ts_ms_utc(
                n_ts_ms
            );
            let o_start = new Date(o_ts_range.n_ts_ms_ut__start);
            let o_end = new Date(o_ts_range.n_ts_ms_ut__end);
            f_assert_equals(
                f_s_ymd_hms__from_n_ts_ms_utc(o_start.getTime(), 'UTC'),
                '2023-07-07 00:00:00', 
            )
            f_assert_equals(
                f_s_ymd_hms__from_n_ts_ms_utc(o_end.getTime(), 'UTC'),
                '2023-07-08 00:00:00', 
            )
```
# get a string formatted depending on the milliseconds length
for example 12->12 milliseconds
```javascript
            f_assert_equals(
                f_s_timestring_from_n_ms(12, 1),
                '12.0 Milliseconds',
            )
            f_assert_equals(
                f_s_timestring_from_n_ms(1.2*1000, 1),
                '1.2 Seconds',
            )
            f_assert_equals(
                f_s_timestring_from_n_ms(1.2*1000*60, 1),
                '1.2 Minutes',
            )
            f_assert_equals(
                f_s_timestring_from_n_ms(1.2*1000*60*60, 1),
                '1.2 Hours',
            )
            f_assert_equals(
                f_s_timestring_from_n_ms(1.2*1000*60*60*24, 1),
                '1.2 Days',
            )
            //translations also possible
            let a_s_name_german = [
                'Millisekunden', 
                'Sekunden',
                'Minuten', 
                'Stunden', 
                'Tage'
            ]
            f_assert_equals(
                f_s_timestring_from_n_ms(12, 1, a_s_name_german),
                '12.0 Millisekunden',
            )
            f_assert_equals(
                f_s_timestring_from_n_ms(1.2*1000, 1, a_s_name_german),
                '1.2 Sekunden',
            )
            f_assert_equals(
                f_s_timestring_from_n_ms(1.2*1000*60, 1, a_s_name_german),
                '1.2 Minuten',
            )
            f_assert_equals(
                f_s_timestring_from_n_ms(1.2*1000*60*60, 1, a_s_name_german),
                '1.2 Stunden',
            )
            f_assert_equals(
                f_s_timestring_from_n_ms(1.2*1000*60*60*24, 1, a_s_name_german),
                '1.2 Tage',
            )
```
# a handy function to measure time/diff/delta/ms
```javascript
                f_measure_time('my_custom_timer');
                window.setTimeout(()=>{
                    f_measure_time();
                    return f_res(true)
                },1234)
```