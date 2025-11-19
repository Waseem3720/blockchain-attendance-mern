// Validates department, class, student, and attendance chains
export const validateDepartmentChain = (deptChain) => {
  return deptChain.isValid();
};

export const validateClassChain = (classChain, parentDeptHash) => {
  if (classChain.chain[0].prev_hash !== parentDeptHash) return false;
  return classChain.isValid();
};

export const validateStudentChain = (studentChain, parentClassHash) => {
  if (studentChain.chain[0].prev_hash !== parentClassHash) return false;
  return studentChain.isValid();
};

// Full multi-level validation
export const validateAllChains = (departmentChain, classChains, studentChainsMap) => {
  if (!validateDepartmentChain(departmentChain)) return false;

  for (let cls of classChains) {
    const deptHash = departmentChain.getLatestBlock().hash;
    if (!validateClassChain(cls, deptHash)) return false;

    const students = studentChainsMap[cls.chain[0].transactions.classId] || [];
    for (let student of students) {
      const classHash = cls.getLatestBlock().hash;
      if (!validateStudentChain(student, classHash)) return false;
    }
  }

  return true;
};
