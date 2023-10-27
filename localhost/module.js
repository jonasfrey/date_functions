
class O_utc_date_components{
    constructor(
        n_ts_ms
    ){
        let o_date = new Date(n_ts_ms);
        this.n_ts_ms = o_date.getTime()
        this.o_date = o_date;
        this.n_year = o_date.getUTCFullYear();
        this.n_month = o_date.getUTCMonth()+1;
        this.n_day = o_date.getUTCDate();
        this.n_hours = o_date.getUTCHours();
        this.n_minutes = o_date.getUTCMinutes();
        this.n_seconds = o_date.getUTCSeconds();

        this.s_month_zeropadded = this.n_month.toString().padStart(2,'0');
        this.s_day_zeropadded = this.n_day.toString().padStart(2,'0');
        this.s_hours_zeropadded = this.n_hours.toString().padStart(2,'0');
        this.s_minutes_zeropadded = this.n_minutes.toString().padStart(2,'0');
        this.s_seconds_zeropadded = this.n_seconds.toString().padStart(2,'0');

        this.s_ymd = `${this.n_year}-${this.s_month_zeropadded}-${this.s_day_zeropadded}`
        this.s_dmy = `${this.s_day_zeropadded}-${this.s_month_zeropadded}-${this.n_year}`
        this.s_hms = `${this.s_hours_zeropadded}:${this.s_minutes_zeropadded}:${this.s_seconds_zeropadded}`
        this.s_ymd_hms = `${this.n_year}-${this.s_month_zeropadded}-${this.s_day_zeropadded} ${this.s_hours_zeropadded}:${this.s_minutes_zeropadded}:${this.s_seconds_zeropadded}`
    }
}


let f_n_minutes_timezone_offset_daylight_saving_time = function(
    o_date
){
    var o_date__jan = new Date(o_date.getFullYear(), 0, 1);
    var o_date__jun = new Date(o_date.getFullYear(), 6, 1);
    let n_minutes_timezone_offset_daylight_saving_time = Math.max(
        o_date__jan.getTimezoneOffset(), 
        o_date__jun.getTimezoneOffset()
        );
    return n_minutes_timezone_offset_daylight_saving_time;
}
let f_b_daylight_saving_time = function(
    o_date
){
    return o_date.getTimezoneOffset() < f_n_minutes_timezone_offset_daylight_saving_time(o_date);
}

let f_s_isotimezone__from_s_timezone = function(
    s_timezone
){
    let a_s_timezone = [
        ...Intl.supportedValuesOf('timeZone'), 
        "UTC"
    ]
    
    let a_s_timezone__filtered = a_s_timezone.filter(
        s=> s.toLowerCase().includes(s_timezone.toLowerCase())
    );
    if(a_s_timezone__filtered.length == 0){
        let s_msg = `timezone ${s_timezone} has not been found, please select a timezone from ${a_s_timezone}`
        throw new Error(s_msg);
        // console.error(s_msg);
        // return false
    }
    return a_s_timezone__filtered[0]
}


let f_n_ms_offset_from_s_timezone_n_ts_ms =  function(
    s_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone, 
    n_ts_ms = new Date().getTime()
){
    let o_date = new Date(n_ts_ms)
    let s_timezone_greenwich_gmt_plus_zero = "UTC"
    let s_isotimezone = f_s_isotimezone__from_s_timezone(s_timezone);
    let n_ts_ms_utc = new Date(o_date.toLocaleString('en-US', {timeZone: s_timezone_greenwich_gmt_plus_zero})).getTime()
    let n_ts_ms_lt = new Date(o_date.toLocaleString('en-US', {timeZone: s_isotimezone})).getTime()
    let n_ms_diff = n_ts_ms_lt - n_ts_ms_utc;
    return n_ms_diff
}


let f_o_utc_date_components__from_n_ts_ms_and_s_timezone = function(
    n_ts_ms, 
    s_timezone
){
    if(n_ts_ms instanceof Date){
        n_ts_ms = n_ts_ms.getTime()
    }
    // if(!s_timezone){
    //     console.error(`please provide a timezone, (default is ${Intl.DateTimeFormat().resolvedOptions().timeZone})`)
    // }
    let n_ms_offset = f_n_ms_offset_from_s_timezone_n_ts_ms(s_timezone, new Date(n_ts_ms));
    
    let n_ts_ms_with_offset = n_ts_ms + n_ms_offset; 
    let o_utc_date_components = new O_utc_date_components(
        n_ts_ms_with_offset
    );

    return o_utc_date_components
}
let f_s_ymd__from_n_ts_ms_utc = function(
    n_ts_ms, 
    s_timezone
){
    // if(!s_timezone){
    //     console.error(`please provide a timezone, (default is ${Intl.DateTimeFormat().resolvedOptions().timeZone})`)
    // }
    return f_o_utc_date_components__from_n_ts_ms_and_s_timezone(n_ts_ms, s_timezone).s_ymd
}
let f_s_dmy__from_n_ts_ms_utc = function(
    n_ts_ms, 
    s_timezone
){
    // if(!s_timezone){
    //     console.error(`please provide a timezone, (default is ${Intl.DateTimeFormat().resolvedOptions().timeZone})`)
    // }
    return f_o_utc_date_components__from_n_ts_ms_and_s_timezone(n_ts_ms, s_timezone).s_dmy 
}
let f_s_hms__from_n_ts_ms_utc = function(
    n_ts_ms, 
    s_timezone
){
    // if(!s_timezone){
    //     console.error(`please provide a timezone, (default is ${Intl.DateTimeFormat().resolvedOptions().timeZone})`)
    // }
    return f_o_utc_date_components__from_n_ts_ms_and_s_timezone(n_ts_ms, s_timezone).s_hms 
}
let f_s_ymd_hms__from_n_ts_ms_utc = function(
    n_ts_ms, 
    s_timezone
){
    return f_o_utc_date_components__from_n_ts_ms_and_s_timezone(n_ts_ms, s_timezone).s_ymd_hms 
}

let f_s_ts_formatted__from_o_utc_date_components = function(
    o_utc_date_components, 
    s_ts_format = '${n_year}-{n_month_zeropadded}-${n_minutes.toFixed(2)}'
){
    let a_s_prop = Object.keys(o_utc_date_components);
    let s_f = `
${a_s_prop.map(function(s){
    let v = o_utc_date_components[s];
    let value = v; 
    if(['string', 'object'].includes(typeof v)){
        value = `'${v}'`
    }
    return `let ${s} = ${value};`
}).join("\n")}
return \`${s_ts_format}\`
`
    let f_s = new Function(s_f);
    let s = f_s();
    return s
}
let f_s_ts_formatted = function(
    n_ts_ms, 
    s_timezone, 
    s_ts_format
){
    let o_utc_date_components = f_o_utc_date_components__from_n_ts_ms_and_s_timezone(
        n_ts_ms, 
        s_timezone
    )
    return f_s_ts_formatted__from_o_utc_date_components(
        o_utc_date_components, 
        s_ts_format
    )
}

class O_ts_range{
    constructor(
        n_ts_ms_ut__start,
        n_ts_ms_ut__end,
    ){
        this.n_ts_ms_ut__start = n_ts_ms_ut__start
        this.n_ts_ms_ut__end = n_ts_ms_ut__end
        this.s_ts_ymd_hms_ut__start = f_s_ymd_hms__from_n_ts_ms_utc(n_ts_ms_ut__start, 'UTC')
        this.s_ts_ymd_hms_ut__end = f_s_ymd_hms__from_n_ts_ms_utc(n_ts_ms_ut__end, 'UTC')
    }
}
let f_o_ts_range__day__from_n_ts_ms_utc = function(
    n_ts_ms_utc
){

    let n_ts_ms_ut__limit_start = 0;
    let n_ts_ms_ut__limit_end = 0;
    let o_date = new Date(n_ts_ms_utc);
    o_date = new Date(o_date.setUTCHours(0))
    o_date = new Date(o_date.setUTCMinutes(0))
    o_date = new Date(o_date.setUTCSeconds(0))
    n_ts_ms_ut__limit_start = o_date.getTime()
    o_date = new Date(o_date.setUTCHours(23))
    o_date = new Date(o_date.setUTCMinutes(59))
    o_date = new Date(o_date.setUTCSeconds(59))
    n_ts_ms_ut__limit_end = o_date.getTime() + 1 * 1000
    return new O_ts_range(
        n_ts_ms_ut__limit_start, 
        n_ts_ms_ut__limit_end
    )

}

let f_o_ts_range__week__from_n_ts_ms_utc = function(
    n_ts_ms_utc
){

    let n_ts_ms_ut__limit_start = 0;
    let n_ts_ms_ut__limit_end = 0;
    let o_date = new Date(n_ts_ms_utc);

    let n_idx_day_in_week = o_date.getUTCDay()
    let n_day_in_month = o_date.getUTCDate(); 
    let n_diff_days_week_start = n_idx_day_in_week;
    let n_diff_days_week_end = 7 - n_idx_day_in_week;
    o_date = new Date(o_date.setUTCDate(n_day_in_month-(n_diff_days_week_start-1)))
    o_date = new Date(o_date.setUTCHours(0))
    o_date = new Date(o_date.setUTCMinutes(0))
    o_date = new Date(o_date.setUTCSeconds(0))
    n_ts_ms_ut__limit_start = o_date.getTime()
    o_date = new Date(o_date.setUTCDate(n_day_in_month+n_diff_days_week_end))
    o_date = new Date(o_date.setUTCHours(23))
    o_date = new Date(o_date.setUTCMinutes(59))
    o_date = new Date(o_date.setUTCSeconds(59))
    n_ts_ms_ut__limit_end = o_date.getTime() + 1 * 1000
    return new O_ts_range(
        n_ts_ms_ut__limit_start, 
        n_ts_ms_ut__limit_end
    )

}
let f_o_ts_range__month__from_n_ts_ms_utc = function(
    n_ts_ms_utc
){

    let n_ts_ms_ut__limit_start = 0;
    let n_ts_ms_ut__limit_end = 0;
    let o_date = new Date(n_ts_ms_utc);

    let n_idx_month = o_date.getUTCMonth();
    o_date = new Date(o_date.setDate(1))
    o_date = new Date(o_date.setUTCHours(0))
    o_date = new Date(o_date.setUTCMinutes(0))
    o_date = new Date(o_date.setUTCSeconds(0))
    n_ts_ms_ut__limit_start = o_date.getTime()
    o_date = new Date(o_date.setUTCMonth(n_idx_month+1))
    o_date = new Date(o_date.setDate(0))
    o_date = new Date(o_date.setUTCHours(0))
    o_date = new Date(o_date.setUTCMinutes(0))
    o_date = new Date(o_date.setUTCSeconds(0))
    n_ts_ms_ut__limit_end = o_date.getTime() 
    return new O_ts_range(
        n_ts_ms_ut__limit_start, 
        n_ts_ms_ut__limit_end
    )

}
let f_o_ts_range__year__from_n_ts_ms_utc = function(
    n_ts_ms_utc
){

    let n_ts_ms_ut__limit_start = 0;
    let n_ts_ms_ut__limit_end = 0;
    let o_date = new Date(n_ts_ms_utc);

    let n_utc_full_year = o_date.getUTCFullYear();
    o_date = new Date(o_date.setUTCMonth(0))
    o_date = new Date(o_date.setDate(1))
    o_date = new Date(o_date.setUTCHours(0))
    o_date = new Date(o_date.setUTCMinutes(0))
    o_date = new Date(o_date.setUTCSeconds(0))
    n_ts_ms_ut__limit_start = o_date.getTime()
    o_date = new Date(o_date.setUTCFullYear(n_utc_full_year+1))
    o_date = new Date(o_date.setUTCMonth(0))
    o_date = new Date(o_date.setDate(1))
    o_date = new Date(o_date.setUTCHours(0))
    o_date = new Date(o_date.setUTCMinutes(0))
    o_date = new Date(o_date.setUTCSeconds(0))
    n_ts_ms_ut__limit_end = o_date.getTime() 
    return new O_ts_range(
        n_ts_ms_ut__limit_start, 
        n_ts_ms_ut__limit_end
    )

}
let f_s_timestring_from_n_ms = function(
    n_ms, 
    n_digits_after_decimal_point = 2, 
    a_s_milliseconds_s_seconds_s_minutes_s_hours_s_days = [
        'Milliseconds', 
        'Seconds', 
        'Minutes', 
        'Hours', 
        'Days', 
    ]
){
    //returns a timestring in a human readable format, 
    // eg. 33 milliseconds, 58.2 seconds, 2.17 minutes, 1.2 hours, 
    let n_sec = (n_ms / 1000)
    let n_min = (n_ms / 1000 / 60 )
    let n_hours = (n_ms / 1000 / 60 / 60)
    let n_days = (n_ms / 1000 / 60 / 60 / 24)
    
    if(n_sec < 1){
        return [
            `${n_ms.toFixed(n_digits_after_decimal_point)}`,
            a_s_milliseconds_s_seconds_s_minutes_s_hours_s_days[0]
        ].join(' ')
    }
    if(n_min < 1){
        return [
            `${n_sec.toFixed(n_digits_after_decimal_point)}`,
            a_s_milliseconds_s_seconds_s_minutes_s_hours_s_days[1]
        ].join(' ')
    }
    if(n_hours < 1){
        return [
            `${n_min.toFixed(n_digits_after_decimal_point)}`,
            a_s_milliseconds_s_seconds_s_minutes_s_hours_s_days[2]
        ].join(' ')
    }
    if(n_days < 1){
        return [
            `${n_hours.toFixed(n_digits_after_decimal_point)}`,
            a_s_milliseconds_s_seconds_s_minutes_s_hours_s_days[3]
        ].join(' ')
    }
    return [
        `${n_days.toFixed(n_digits_after_decimal_point)}`,
        a_s_milliseconds_s_seconds_s_minutes_s_hours_s_days[4]
    ].join(' ')
}

export {
    f_b_daylight_saving_time,
    f_s_isotimezone__from_s_timezone,
    f_s_ymd__from_n_ts_ms_utc,
    f_s_dmy__from_n_ts_ms_utc,
    f_s_hms__from_n_ts_ms_utc,
    f_s_ymd_hms__from_n_ts_ms_utc,
    f_s_ts_formatted,
    f_n_ms_offset_from_s_timezone_n_ts_ms, 
    f_o_ts_range__day__from_n_ts_ms_utc,
    f_o_ts_range__week__from_n_ts_ms_utc,
    f_o_ts_range__month__from_n_ts_ms_utc, 
    f_o_ts_range__year__from_n_ts_ms_utc, 
    f_s_timestring_from_n_ms,
    O_ts_range
}