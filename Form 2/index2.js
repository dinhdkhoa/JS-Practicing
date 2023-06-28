function Validator(formId, submitFunction) {
  const formRules = {};
  const validData = {};
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

  const getParent = (currentElement, parentElementSelector) => {
    let parentElement = currentElement.parentElement;
    while (parentElement) {
      if (parentElement.matches(parentElementSelector)) {
        return parentElement;
      }
      parentElement = parentElement.parentElement;
    }
    return null;
  };

  const handleValidate = (e) => {
    const rules = formRules[e.target.name];
    let errorMessage = null;
    for (const rule of rules) {
      errorMessage = rule(e.target.value);
      if (errorMessage) {
        break;
      }
    }
    const parentElement = getParent(e.target, ".form-group");
    if (parentElement) {
      const errorSpan = parentElement.querySelector(".form-message");
      if (errorSpan) {
        errorSpan.innerText = errorMessage || "";
        parentElement.classList.toggle("invalid", !!errorMessage);
        if (validData[e.target.name]) {
          delete validData[e.target.name];
        }
      }
    }
  };

  const handleClear = (e) => {
    const parentElement = getParent(e.target, ".form-group");
    if (parentElement) {
      parentElement.classList.remove("invalid");
      const errorSpan = parentElement.querySelector(".form-message");
      if (errorSpan) {
        errorSpan.innerText = "";
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = validData;
    const isValid =
      Object.keys(validData).length === Object.keys(formRules).length;
    if (isValid && submitFunction) {
      submitFunction(data);
    }
  };

  const formElement = document.querySelector(formId);
  if (formElement) {
    const inputElements = formElement.querySelectorAll("input");

    for (const input of inputElements) {
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

      input.addEventListener("blur", handleValidate);
      input.addEventListener("input", handleClear);
    }

    formElement.addEventListener("submit", handleSubmit);
  }
}
