const logger = (store) => (next) => (action) => {
  //To show us anytime that a new action is dispatched
  console.group(action.type);
  console.log('The action: ', action);

  //Invoking next(action) is going to be dispatched passing at the action so that will update the state
  const returnValue = next(action);
  console.log('The new state: ', store.getState());

  console.log('returnValue', returnValue);
  console.groupEnd();
  return returnValue;
};

export default logger;