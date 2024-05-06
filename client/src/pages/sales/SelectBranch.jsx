import React from "react";

const SelectBranch = ({ branches, selectedBranch, setSelectedBranch }) => {
  return (
    <div className="mb-6">
      <label className="font-semibold">Branch</label>
      <select
        className="mt-2 w-full bg-[#E6E6E6] px-2 py-2"
        value={selectedBranch} // Make sure to set the value of the select element
        onChange={(e) => setSelectedBranch(e.target.value)} // Move the onChange event to the select element
      >
        {branches.map((branch) => (
          <option key={branch} value={branch}>
            {branch}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBranch;
