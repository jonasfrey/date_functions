<!-- {"s_msg":"this file was automatically generated","s_by":"f_generate_markdown.module.js","s_ts_created":"Wed Nov 01 2023 16:22:04 GMT+0100 (Central European Standard Time)","n_ts_created":1698852124386} -->
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
    f_measure_time,
    f_n_ts_ms__rounded_to
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
                    f_measure_time();// output: f_measure_time: 'my_custom_timer' diff: 1.24 Seconds
                    return f_res(true)
                },1234)
```
# round a unix timestamp to a given unit
```javascript
                var n_ts_ms_rounded = f_n_ts_ms__rounded_to(
                    new Date(
                        Date.UTC(2023, 2, 2, 20, 22, 11, 444)
                    ).getTime(),
                    'milliseconds', 
                    500
                );
                f_assert_equals(
                    n_ts_ms_rounded, 
                    new Date(
                        Date.UTC(2023, 2, 2, 20, 22, 11, 500)
                    ).getTime()
                )
```
round to '12', (12, 24, 36...) seconds
```javascript

                f_assert_equals(
                    f_n_ts_ms__rounded_to(
                        new Date(Date.UTC(2023, 2, 2, 20, 22, 23)).getTime(),
                        'seconds', 
                        12
                    ), 
                    new Date(Date.UTC(2023, 2, 2, 20, 22, 24)).getTime()
                )

```
round down every time
```javascript
                f_assert_equals(
                    f_n_ts_ms__rounded_to(
                        new Date(Date.UTC(2023, 2, 2, 20, 22, 23)).getTime(),
                        'seconds', 
                        12,
                        false,//b_closest 
                        true// b_round_down
                    ), 
                    new Date(Date.UTC(2023, 2, 2, 20, 22, 12)).getTime(), 
                )

```
practical example
```javascript
                f_assert_equals(
                    f_n_ts_ms__rounded_to(
                        new Date('2023-03-02 20:22:23').getTime(),
                        'minutes', 
                        10
                    ), 
                    new Date('2023-03-02 20:20:00').getTime()
                )

                f_assert_equals(
                    f_s_ymd_hms__from_n_ts_ms_utc(f_n_ts_ms__rounded_to(
                        new Date('2023-03-02 20:22:23').getTime(),
                        'hours', 
                        6
                    ), 'UTC'), 
                    '2023-03-02 18:00:00'
                )
                f_assert_equals(
                    f_s_ymd_hms__from_n_ts_ms_utc(f_n_ts_ms__rounded_to(
                        new Date('2023-03-17 20:22:23').getTime(),
                        'days', 
                        6
                    ), 'UTC'), 
                    '2023-03-18 00:00:00'
                )
                // f_assert_equals(
                //     f_s_ymd_hms__from_n_ts_ms_utc(f_n_ts_ms__rounded_to(
                //         new Date('2023-09-23 20:22:23').getTime(),
                //         'months', 
                //         3
                //     ), 'UTC'), 
                //     '2023-09-01 00:00:00'
                // )


```