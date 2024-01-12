import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { getUserDetails } from "../api/user/authUser";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const getData = async () => {
      try {
        //get user token form the local storage
        AsyncStorage.getItem("user-token").then((token) => {
          if (token) {
            getUserDetails(token).then((res) => {
              //fetch user details from the server
              const { data, status } = res;
              if (status === 500) {
                //if server error then set user to original value and loading to false
                AsyncStorage.getItem("user-data").then((value) => {
                  if (value) {
                    setUser(JSON.parse(value));

                    setLoading(false);
                  }
                });
              } else {
                AsyncStorage.mergeItem("user-data", JSON.stringify(data)).then(
                  //if no error then merge the fetched data with the local storage and loading to false
                  AsyncStorage.getItem("user-data").then((value) => {
                    if (value) {
                      setUser(JSON.parse(value));

                      setLoading(false);
                    }
                  }),
                );
              }
            });
          }
        });
      } catch (e) {
        console.log("error:", e);
      }
    };
    getData();
  }, []);

  return { user, loading };
};
