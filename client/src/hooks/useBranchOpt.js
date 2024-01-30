import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const useBranchOpt = () => {
  const branches = useSelector((state) => state.branch.branches);

  const [branchOpts, setBranchOpts] = useState({
    "Select Branch": [{ value: "Select Branch", label: "Select Branch" }],
  });

  useEffect(() => {
    const options = branches.reduce((acc, branch) => {
      const  category  = 'Branches';
      if (acc[category]) {
        acc[category].push({ value: branch._id, label: branch.name });
      } else {
        acc[category] = [{ value: branch._id, label: branch.name }];
      }
      return acc;
    }, {});

    setBranchOpts((prevOptions) => ({ ...prevOptions, ...options }));
  }, [branches]);

  return { branchOpts };
};
