TextComponent
input component (type=text)
no validator
not submitted
#0 should be created
# => SHOW message="default"
#1 WHEN input is created
#4 WHEN input touched
#6 WHEN input changed to empty
#8 WHEN input changed to "xxx"
=> SHOW message="default_active"
#2 WHEN input is active
#3 WHEN touching input
#5 WHEN changing input to empty
#7 WHEN changing input to "xxx"
when submitted with value
=> SHOW message="default"
#1 WHEN given_input === correct
#2 WHEN input has been touched
#3 WHEN input was changed to "x"
#4 WHEN input is changed to empty
#5 WHEN input is changed to valid input
=> SHOW message="default_active"
#6 WHEN input is changing to "x"
=> SHOW message="has_success"
#7 WHEN input is active
when submitted without value
=> SHOW message="default"
#1 WHEN input not changed
#3 WHEN input touched
#5 WHEN input changed to "x"
#6 WHEN input changed to empty
#7 WHEN input changed to "xxx"
#8 WHEN input has changed correctly
=> SHOW message="default_active"
#2 WHEN input is active
#4 WHEN input is changing to "x"
=> SHOW message="has_success"
#8 WHEN input has correctly changed
VALIDATOR=required
not submitted
#0 should be created
=> SHOW message="default"
#1 WHEN input created
#4 WHEN input is touched
#6 WHEN input is not changed
#8 WHEN input changed to "xxx"
=> SHOW message="default_active"
#2 WHEN input is active
#3 WHEN touching input
#5 WHEN input is not changing
#7 WHEN input is changing to "xxx"
when submitted with value
=> SHOW message="default"
#1 WHEN input has not changed
#3 WHEN input has been touched
#5 WHEN input shrinked to "x"
#6 WHEN input changed to empty
#7 WHEN input extended to "xxx"
=> SHOW message="default_active"
#4 WHEN input is shrinking to "x"
#4 WHEN input is extending to "xxx"
=> SHOW message="has_success"
#2 WHEN input is not changing

describe('=> SHOW message="default"', () => {
});
describe('=> SHOW message="default_active"', () => {
});
describe('=> SHOW message="has_success"', () => {
});


WHEN input has changed correctly