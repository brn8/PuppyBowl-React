const COHORT_NAME = "2410-FTB-ET-WEB-FT";
const API = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT_NAME}/players`;
export const fetchAllData = async () => {
  const response = await fetch(API);
  const result = await response.json();
  return result;
};
