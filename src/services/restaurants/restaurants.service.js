import { mocks } from "./mock";

export const restaurantsRequest = (location) => {
  return new Promise((result, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject("not found");
    }
    result(mock);
  });
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
    };
  });
  return mappedResults;
};
