
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
    let n_ts_ms_utc = new Date(o_date.toLocaleString('ISO', {timeZone: s_timezone_greenwich_gmt_plus_zero})).getTime()
    let n_ts_ms_lt = new Date(o_date.toLocaleString('ISO', {timeZone: s_isotimezone})).getTime()
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


export {
    f_b_daylight_saving_time,
    f_s_isotimezone__from_s_timezone,
    f_s_ymd__from_n_ts_ms_utc,
    f_s_dmy__from_n_ts_ms_utc,
    f_s_hms__from_n_ts_ms_utc,
    f_s_ymd_hms__from_n_ts_ms_utc,
    f_s_ts_formatted,
    f_n_ms_offset_from_s_timezone_n_ts_ms
}