#include "../job-contract.mligo"

let _u = Test.reset_state 5n ([] : tez list)

let _deposit_amount_test = 
  List.iter
    (fun((original_price, expected_deposit) : tez * tez) ->
      let deposit = Test.run deposit_amount(original_price) in
      let _ = Test.log("expected deposit", expected_deposit) in
      let _ = Test.log("actual deposit", deposit) in
      assert(Test.michelson_equal deposit expected_deposit)
    )
    [(15tez,1.5tez);(1399tez,139.9tez);(1201tez,120.1tez)]