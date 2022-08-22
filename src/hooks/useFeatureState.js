import { useSelector } from "react-redux";

const useFeatureState = (feature) => {
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