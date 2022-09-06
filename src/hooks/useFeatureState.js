/*
This hook selects the state variables associated with a feature and returns
their values in an object. It expects only the feature's name as a parameter.
*/

import { useSelector } from "react-redux";

const useFeatureState = (feature) => {

  const validFeatures = ["cart", "customer", "products", "categories", "orders", "auth"];

  if (!validFeatures.includes(feature)) {
    throw new Error("Invalid feature name");
  }

  const data = useSelector(state => state[feature][feature]);
  const status = useSelector (state => state[feature].status);
  const error = useSelector(state => state[feature].error);
  return {
    [feature]: data,
    status,
    error
  };
};

export { useFeatureState };