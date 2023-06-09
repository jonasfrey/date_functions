
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
    f_o_ts_range__year__from_n_ts_ms_utc
} from "./client.module.js"

//md: # usage 
//md: (just ignore the 'f_deno_test stuff') 


let n_ts_ms_utc__2023_06_06_13_14_32 = 1686057272545;
await f_deno_test_all_and_print_summary(
    [
        //md: # search a timezone and get iso string
        f_deno_test("f_s_isotimezone__from_s_timezone", () => {
            f_assert_equals(
                f_s_isotimezone__from_s_timezone('Zurich'),
                'Europe/Zurich'
            );
        }),
        //md: # check if daylight saving time is on (check if 'summertime' is on)
        f_deno_test("f_b_daylight_saving_time", () => {
            f_assert_equals(
                f_b_daylight_saving_time(new Date("2023-06-01 10:20:20")),
                true
            );

        }),
        //md: # get the timeoffset from a timezone 
        f_deno_test("f_n_ms_offset_from_s_timezone_n_ts_ms__daylight_saving_time", () => {

            f_assert_equals(
                f_n_ms_offset_from_s_timezone_n_ts_ms(
                    'Europe/Zurich', 
                    new Date("2023-06-02 00:00:00").getTime()
                ),
                2*60*60*1000
            );

        }),
        //md: # get the timeoffset from a timezone (in winter it is one hour less)
        f_deno_test("f_n_ms_offset_from_s_timezone_n_ts_ms", () => {

            f_assert_equals(
                f_n_ms_offset_from_s_timezone_n_ts_ms(
                    'Europe/Zurich', 
                    new Date("2023-01-02 00:00:00").getTime()
                ),
                1*60*60*1000
            );

        }),
        //md: # convert a date to YYYY-MM-DD HH:II:SS (by providing a timezone)


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

        //md: # get a O_ts_range object ({n_ts_ms_ut__start:...,n_ts_ms_ut__end:..., ...})
        //md: you can get a specific time range from n_ts_ms_ut
        //md: for example the start of the month and the end of the month,

        f_deno_test("f_o_ts_range__day__from_n_ts_ms_utc", () => {
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


    ]
)


//./readme.md:end


console.log("done")
console.log("run this script with 'deno test myscript.js' if you see no test output")