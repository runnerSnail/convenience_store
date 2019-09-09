// #[cfg(test)]
// mod tests {
//     #[test]
//     fn it_works() {
//         assert_eq!(2 + 2, 4);
//     }
// }
#[no_mangle]
pub extern fn threadcount(x: i32) -> i32 {
    let result: i32 = num_cpus::get() as i32;
    return result * x;
}