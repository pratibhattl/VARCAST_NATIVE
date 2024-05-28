import AsyncStorage from '@react-native-async-storage/async-storage';

// const getData = async key => {
//   let value = await AsyncStorage.getItem(key);
//   return value;
// };
async function getData(key, defaultValue = null) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)

      .then(value => {
        try {
          if (value !== null) {
            resolve(JSON.parse(value));
          } else {
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

const setData = async (key, value) => {
  let resp = await AsyncStorage.setItem(key, JSON.stringify(value));
};

const deleteData = async () => {
  let resp = await AsyncStorage.clear();
};

export {getData, setData, deleteData};
