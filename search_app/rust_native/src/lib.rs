use enigo::*;
use std::{thread, time};

#[no_mangle]
pub extern fn threadcount(x: i32) -> i32 {
    let result: i32 = num_cpus::get() as i32;
    return result * x;
}

#[no_mangle]
pub extern fn clipoard_out(x:i32){
    let mut enigo = Enigo::new();
    // 根据系统不同触发不同操作
    if cfg!(target_os = "windows") {
        enigo.key_down(Key::Control);
    }else {
        enigo.key_down(Key::Command);
    }
    enigo.key_click(Key::Layout('v'));
    enigo.key_up(Key::Command);
}