export const createLiveStream = (values) => async dispatch => {
  console.log('hello')
  return new Promise( async (resolve, reject) => {
    try {
      console.log(values);
    } catch (error) {
      console.log('yes')
    }
  })
};
