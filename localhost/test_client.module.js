
//./readme.md:start
//md: # import libs

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
    f_n_measure_time,
    f_n_ts_ms__rounded_to
} from "./module.js"

//md: # usage 
//./readme.md:end


let n_ts_ms_utc__2023_06_06_13_14_32 = 1686057272545;
await f_deno_test_all_and_print_summary(
    [
        f_deno_test("f_s_isotimezone__from_s_timezone", () => {
            //./readme.md:start
            //md: # search a timezone and get iso string
            f_assert_equals(
                f_s_isotimezone__from_s_timezone('Zurich'),
                'Europe/Zurich'
                );
            //./readme.md:end
        }),
        
        f_deno_test("f_b_daylight_saving_time", () => {
            //./readme.md:start
            //md: # check if daylight saving time is on (check if 'summertime' is on)
            f_assert_equals(
                f_b_daylight_saving_time(new Date("2023-06-01 10:20:20")),
                true
                );
            //./readme.md:end

        }),
        f_deno_test("f_n_ms_offset_from_s_timezone_n_ts_ms__daylight_saving_time", () => {
            
            //./readme.md:start
            //md: # get the timeoffset from a timezone 
            f_assert_equals(
                f_n_ms_offset_from_s_timezone_n_ts_ms(
                    'Europe/Zurich', 
                    new Date("2023-06-02 00:00:00").getTime()
                ),
                2*60*60*1000
            );
            //./readme.md:end


        }),
        f_deno_test("f_n_ms_offset_from_s_timezone_n_ts_ms", () => {
            
            //./readme.md:start
            //md: # get the timeoffset from a timezone (in winter it is one hour less)
            f_assert_equals(
                f_n_ms_offset_from_s_timezone_n_ts_ms(
                    'Europe/Zurich', 
                    new Date("2023-01-02 00:00:00").getTime()
                ),
                1*60*60*1000
            );
            //./readme.md:end

        }),
        
        
        f_deno_test("f_s_ymd__utc", () => {
            //./readme.md:start
            //md: # convert a date to YYYY-MM-DD HH:II:SS (by providing a timezone)
            f_assert_equals(
                f_s_ymd__from_n_ts_ms_utc(
                    n_ts_ms_utc__2023_06_06_13_14_32, 
                    'UTC'
                ),
                '2023-06-06'
            );
            //./readme.md:end
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

        
        f_deno_test("f_o_ts_range__day__from_n_ts_ms_utc", () => {
            //./readme.md:start
            //md: # get a O_ts_range object ({n_ts_ms_ut__start:...,n_ts_ms_ut__end:..., ...})
            //md: you can get a specific time range from n_ts_ms_ut
            //md: for example the start of the month and the end of the month,
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
            //./readme.md:end
        }),
        f_deno_test("f_o_ts_range__week__from_n_ts_ms_utc", () => {
            let n_ts_ms = new Date(2022, 11, 26, 16, 50, 0);
            let o_ts_range = f_o_ts_range__week__from_n_ts_ms_utc(
                n_ts_ms
            );
            let o_start = new Date(o_ts_range.n_ts_ms_ut__start);
            let o_end = new Date(o_ts_range.n_ts_ms_ut__end);
            f_assert_equals(
                f_s_ymd_hms__from_n_ts_ms_utc(o_start.getTime(), 'UTC'),
                '2022-12-26 00:00:00', 
            )
            f_assert_equals(
                f_s_ymd_hms__from_n_ts_ms_utc(o_end.getTime(), 'UTC'),
                '2023-01-02 00:00:00', 
            )
        }),
        f_deno_test("f_o_ts_range__month__from_n_ts_ms_utc", () => {
            let n_ts_ms = new Date(2024, 1, 18, 18, 18, 18);
            let o_ts_range = f_o_ts_range__month__from_n_ts_ms_utc(
                n_ts_ms
            );
            let o_start = new Date(o_ts_range.n_ts_ms_ut__start);
            let o_end = new Date(o_ts_range.n_ts_ms_ut__end);
            f_assert_equals(
                f_s_ymd_hms__from_n_ts_ms_utc(o_start.getTime(), 'UTC'),
                '2024-02-01 00:00:00', 
            )
            f_assert_equals(
                f_s_ymd_hms__from_n_ts_ms_utc(o_end.getTime(), 'UTC'),
                '2024-02-29 00:00:00', //2024 is switchyear that occurs every 4 years so february has 29 days instead of 28
            )
        }),
        f_deno_test("f_o_ts_range__year__from_n_ts_ms_utc", () => {
            let n_ts_ms = new Date(2023, 1, 18, 18, 18, 18);
            let o_ts_range = f_o_ts_range__year__from_n_ts_ms_utc(
                n_ts_ms
            );
            // console.log(o_ts_range)
            let o_start = new Date(o_ts_range.n_ts_ms_ut__start);
            let o_end = new Date(o_ts_range.n_ts_ms_ut__end);

            f_assert_equals(
                f_s_ymd_hms__from_n_ts_ms_utc(o_start.getTime(), 'UTC'),
                '2023-01-01 00:00:00', 
            )
            f_assert_equals(
                f_s_ymd_hms__from_n_ts_ms_utc(o_end.getTime(), 'UTC'),
                '2024-01-01 00:00:00', //2024 is switchyear that occurs every 4 years so february has 29 days instead of 28
            )
            
        }),
        
        f_deno_test("f_s_timestring_from_n_ms", () => {
            //./readme.md:start
            //md: # get a string formatted depending on the milliseconds length
            //md: for example 12->12 milliseconds
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
            //./readme.md:end
        }),

        f_deno_test("f_n_measure_time", async () => {
            return new Promise((f_res)=>{
                //./readme.md:start
                //md: # a handy function to measure time/diff/delta/ms
                f_n_measure_time('my_custom_timer');
                window.setTimeout(()=>{
                    f_n_measure_time();// output: f_n_measure_time: 'my_custom_timer' diff: 1.24 Seconds
                    return f_res(true)
                },1234)

                f_n_measure_time();
                window.setTimeout(()=>{
                    f_n_measure_time();// output: f_n_measure_time: 'my_custom_timer' diff: 1.24 Seconds
                    return f_res(true)
                },1234)
                //./readme.md:end
            })
        }),
        f_deno_test("f_n_ts_ms__rounded_to", async () => {
            return new Promise((f_res)=>{
                //./readme.md:start
                //md: # round a unix timestamp to a given unit 
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
                //md: round to '12', (12, 24, 36...) seconds

                f_assert_equals(
                    f_n_ts_ms__rounded_to(
                        new Date(Date.UTC(2023, 2, 2, 20, 22, 23)).getTime(),
                        'seconds', 
                        12
                    ), 
                    new Date(Date.UTC(2023, 2, 2, 20, 22, 24)).getTime()
                )

                //md: round down every time
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

                //md: practical example 
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


                //./readme.md:end
            })
        })
        
    ]
)


console.log("done")
console.log("run this script with 'deno test myscript.js' if you see no test output")