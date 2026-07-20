/* eslint-disable react-hooks/immutability, react-hooks/refs, react-hooks/static-components, react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, @typescript-eslint/no-unused-vars */
import LoadingSpinner from './LoadingSpinner';

export default function APILoader() {
  return <LoadingSpinner overlay size={50} />;
}
