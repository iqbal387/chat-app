import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";

import Theme from "Theme";
import Routes from "routes/Routes";
import { useAuthStore } from "stores/user.store";
import { getCurrentUser } from "models/user";
import Loading from "components/atoms/Loading";
import Alert from "components/atoms/Alert";

const App = () => {
  // router
  const location = useLocation();

  // store
  const setUser = useAuthStore(({ setUser }) => setUser);

  // state
  const [loading, setLoading] = useState(true);

  const isAuthPages = useCallback(
    () => location.pathname === "/login" || location.pathname === "/register",
    [location]
  );

  const isUnauthorized = useCallback(
    (error) => error.response.status === 401 || error.response.status === "401",
    []
  );

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        setUser(res.data.user);

        if (isAuthPages()) {
          return (window.location = "/");
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (isAuthPages()) return setLoading(false);

        if (!isUnauthorized(err)) {
          setLoading(false);
        }
      });
  }, [setUser, isAuthPages, isUnauthorized]);

  axios.interceptors.response.use(
    (response) => {
      return Promise.resolve(response);
    },
    (error) => {
      if (isUnauthorized(error) && !isAuthPages()) {
        window.location = "/login";
      }
      return Promise.reject(error);
    }
  );

  if (loading) return <Loading />;

  return (
    <Theme>
      <Routes />
      <Alert />
    </Theme>
  );
};

export default App;
