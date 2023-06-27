function Validator(formId) {
  const formRules = {};
  const validatorFunctions = {
    require: (input, message = "Vui lòng không bỏ trống") => {
      return input.trim() ? undefined : message;
    },
    email: (input) =>
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)
        ? undefined
        : "Vui lòng nhập đúng định dạng Email!!!",
    min: (min) => (input) =>
      input.length >= min ? undefined : `Độ dài phải dài hơn ${min} kí tự`,
    max: (max) => (input) =>
      input.length >= max ? undefined : `Độ dài phải ngắn hơn ${max} kí tự`,
  };

  const handleValidate = (e) => {
    const rules = formRules[e.target.name];
    let errorMessage;
    for (const rule of rules) {
      errorMessage = rule(e.target.value);
      if (errorMessage) break;
    }
    console.log(errorMessage);
  };

  const formElement = document.querySelector(formId);
  if (formElement) {
    const inputElements = formElement.querySelectorAll("input");

    for (var input of inputElements) {
      const rules = input.getAttribute("rule").split("|");

      rules.forEach((rule) => {
        let ruleFunction;

        if (rule.includes(":")) {
          const [ruleName, ruleValue] = rule.split(":");
          ruleFunction = validatorFunctions[ruleName](ruleValue);
        } else {
          ruleFunction = validatorFunctions[rule];
        }

        if (formRules[input.name]) {
          formRules[input.name].push(ruleFunction);
        } else {
          formRules[input.name] = [ruleFunction];
        }
      });

      input.onblur = handleValidate;
    }
  }
}
