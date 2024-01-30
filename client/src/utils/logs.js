//DOC: logging function
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

export const Style = {
  base: [
    "color: #fff",
    "background-color: #333",
    "padding: 2px 4px",
    "border-radius: 5px",
    "font-family: 'Courier New', Courier, monospace",
  ],
  warning: ["color: #eee"],
  success: ["color: #00D800"],
  danger: ["color: #FF0000"],
  api: ["background-color: #AD8400", "font-style: bold"],
  code: ["background-color: #333", "border-left: 3px solid #f0e68c"],
  effects: ["background-color: #900C3F", "text-shadow: 1px 1px 2px black", "font-weight: bold"],
  function: ["background-color: #040A58", "font-weight: bold"],
};

export const logs = (text, variables = [], extra = []) => {
  let style = Style.base.join(";") + ";";
  style += extra.join(";"); // Add any additional styles
  if (variables.length > 0) {
    console.log(`%c${text}`, style, ...variables);
  } else {
    console.log(`%c${text}`, style);
  }
};
