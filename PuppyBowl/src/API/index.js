const COHORT_NAME = "2410-FTB-ET-WEB-FT";
const API = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT_NAME}/players`;
export const fetchAllData = async () => {
  const response = await fetch(API);
  const result = await response.json();
  return result;
};

export const postData = async (obj) => {
  try {
    const resonse = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: obj.name,
        breed: obj.breed,
        imageUrl:
          obj.imageUrl.length === 0
            ? "https://learndotresources.s3.amazonaws.com/workshop/60ad725bbe74cd0004a6cba0/puppybowl-default-dog.png"
            : imageUrl,
      }),
    });
    const result = await resonse.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = async (id) => {
  try {
    const resonse = await fetch(`${API}/${id}`, {
      method: "DElETE",
    });
    const result = await resonse.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
