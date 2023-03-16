import { mocks } from "./mock";

export const restaurantsRequest = (location = "51.219448,4.402464") => {
  return new Promise((result, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject("not found");
    }
    result(mock);
  });
};

restaurantsRequest()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log("error");
  });
