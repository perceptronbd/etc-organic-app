import React from "react";
import { FormInput } from "../../components";

const CustomerDetails = () => {
  return (
    <div className="grid grid-cols-1 gap-y-2">
      <div>
        <FormInput
          id={"customerName"}
          label={"Customer Name"}
          placeholder={"Customer Name"}
          pattern={"[0-9]+"}
          name={"customerName"}
          errorMessage={"Please enter a valid name"}
          required
        />
      </div>
      <div>
        <FormInput
          id={"customerNumber"}
          label={"Customer Number"}
          placeholder={"Customer Number"}
          pattern={"[0-9]+"}
          name={"customerNumber"}
          errorMessage={"Please enter a valid number"}
          required
        />
      </div>
      <div>
        <FormInput
          id={"customerUserId"}
          label={"Customer User ID"}
          placeholder={"Customer User ID"}
          pattern={"[0-9]+"}
          name={"customerUserId"}
          errorMessage={"Please enter a valid User ID"}
          required
        />
      </div>
    </div>
  );
};

export default CustomerDetails;
