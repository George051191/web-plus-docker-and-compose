import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import styles from "./app.module.css";
import { UserContext } from "../../utils/context";
import { Header } from "../header";
import { Footer } from "../footer";
import { SignIn } from "../sign-in";
import { SignUp } from "../sign-up";
import { MainPage } from "../main-page";
import { ProfilePage } from "../profile-page";
import { UserPage } from "../user-page";
import { SearchPage } from "../search-page";
import { WishlistPage } from "../wishlist-page";
import { GiftPage } from "../gift-page";
import { getUser } from "../../utils/api";
import { PrivateRoute } from '../private-route'

function App() {
  const [userCtx, setUserCtx] = React.useState(null);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      getUser().then((res) => {
        setUserCtx(res);
      });
    }
  }, []);

  return (
    <div className={styles.app}>
      <UserContext.Provider value={[userCtx, setUserCtx]}>
        <BrowserRouter>
          <Header />
          <main className={styles.content}>
            <Switch>
              <Route path="/signin" render={() => {
                return userCtx ? <Redirect to='/gifts/line' /> : <SignIn />
              }}>
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <PrivateRoute path="/gifts">
                <MainPage />
              </PrivateRoute>
              <PrivateRoute path="/profile">
                <ProfilePage />
              </PrivateRoute>
              <PrivateRoute path="/users/:id">
                <UserPage />
              </PrivateRoute>
              <PrivateRoute path="/search">
                <SearchPage query={search} />
              </PrivateRoute>
              <PrivateRoute path="/wishlist">
                <WishlistPage />
              </PrivateRoute>
              <PrivateRoute path="/gift/:id">
                <GiftPage />
              </PrivateRoute>
              <Redirect from='/' to='/signin' />
            </Switch>
          </main>
          <Footer />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
