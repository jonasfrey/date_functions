let b_deno = "Deno" in window;
let o_mod__asserts = null;
if(b_deno){
    o_mod__asserts = await import('https://deno.land/std@0.190.0/testing/asserts.ts');
}
let f_assert_equals = function(
    v1, 
    v2
){

    if(b_deno){

        return o_mod__asserts.assertEquals(v1,v2)
    }
    if(typeof v1 == 'object'){
        v1 = JSON.stringify(v1)
        v2 = JSON.stringify(v2)
    }
    
    let b = v1 === v2;
    let s_v1 = (typeof v1 == "string") ? `'${v1}'` : v1;
    let s_v2 = (typeof v2 == "string") ? `'${v2}'` : v2;

    if(!b){
        throw new Error(
`Values are not equal.
        
[Diff] Actual / Expected

Actual     ${s_v1} (t: ${typeof v1})
Expected   ${s_v2} (t: ${typeof v2})
`);
    }
}
class O_test{
    constructor(
        s_name, 
        f_fun,
    ){
        this.s_name = s_name
        this.f_fun = f_fun
        this.o_error = false, 
        this.n_ms_start = new Date();
        this.n_ms_end = null;
        this.s_output = ``
    }
}
let a_o_test = []
let f_deno_test = function(
    s_name_test,
    f_fun
){
    if(b_deno){
        return Deno.test(s_name_test, f_fun)
    }
    let o_test = new O_test(
        s_name_test, 
        f_fun
    );
    try {
        o_test.n_ms_start = window.performance.now();
        o_test.f_fun()
    } catch (error) {
        o_test.o_error = error
    }
    o_test.n_ms_end = window.performance.now();
    o_test.s_output_summary = `${o_test.s_name} ... ${(o_test.error == null) ? 'SUCCESS' : 'FAILED'} (${(o_test.n_ms_end-o_test.n_ms_start).toFixed(4)}ms)`
    console.log(o_test.s_output_summary)
    if(o_test.o_error){
        o_test.s_output_error = `
        ${o_test.s_name}
        ${o_test.o_error.toString()}
            `
        console.log(o_test.s_output_error)
    }

    a_o_test.push(o_test)
}

let f_deno_test_summary = function(){
    let a_o_test__failed = a_o_test.filter(o=>o.o_error);
    let s = `
    TEST SUMMARY: 




    
    ${a_o_test__failed.length}/${a_o_test.length} tests failed 
    ${a_o_test.map(o=>o.s_output_summary).join("\n")}

    ${(a_o_test__failed.length > 0) ? 'ERRORS': ''}
    ${a_o_test__failed.map(o=>o.s_output_error).join("\n")}
    `
    console.log(s)
}


export {
    f_assert_equals, 
    f_deno_test, 
    f_deno_test_summary
}

