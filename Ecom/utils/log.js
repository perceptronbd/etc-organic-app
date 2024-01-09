export const Style = {
  base: [
    "color: #fff",
    "background-color: #444",
    "padding: 2px 4px",
    "border-radius: 2px",
    "font-family: 'Courier New', Courier, monospace",
  ],
  warning: ["color: #eee", "background-color: #ffa500"],
  success: ["background-color: #228b22"],
  danger: ["background-color: #dc143c", "text-decoration: underline"],
  api: ["color: #5f9ea0", "font-style: italic"],
  code: [
    "background-color: #333",
    "font-family: 'Courier New', Courier, monospace",
    "border-left: 3px solid #f0e68c",
  ],
  effects: ["text-shadow: 1px 1px 2px black", "font-weight: bold"],
  function: ["color: #ba55d3", "font-weight: bold"],
};

export const log = (text, variables = [], extra = []) => {
  let style = Style.base.join(";") + ";";
  style += extra.join(";"); // Add any additional styles
  if (variables.length > 0) {
    console.log(`%c${text}`, style, ...variables);
  } else {
    console.log(`%c${text}`, style);
  }
};

// Usage examples:
//   log("Normal Logs");
//   log("Warning Logs", [], Style.warning);
//   log("Success Logs", [], Style.success);
//   log("Danger Logs", [], Style.danger);
//   log("API Call", [], Style.api);
//   log("Code Block Example", [], Style.code);
//   log("Special Effects", [], Style.effects);
//   log("Function Call", [], Style.function);

//   // Logging with variables
//   const username = 'Alice';
//   const points = 1200;
//   log("User %s has %d points", [username, points]);
