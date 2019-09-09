#[no_mangle]
pub extern fn threadcount(x: i32) -> i32 {
    let result: i32 = num_cpus::get() as i32;
    return result * x;
}