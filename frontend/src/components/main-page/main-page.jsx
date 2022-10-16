import React, { useEffect } from 'react';
import {
  Route,
  useRouteMatch,
  useLocation,
  Redirect,
} from 'react-router-dom';
import { UserContext } from '../../utils/context';
import { Collection } from '../collection';
import { Subheader } from './subheader';
import { getLastCards, getTopCards } from '../../utils/api';
import { CollectionsView } from './collections-view';
import { CardListView } from './card-lists-view';
import styles from './main-page.module.css';



export const MainPage = ({ extraClass = '' }) => {
  const [user] = React.useContext(UserContext);
  const [lastCards, setLastCards] = React.useState([]);
  const [topCards, setTopCards] = React.useState([]);
  const [pagData, setPagData] = React.useState({});

  const { path, url } = useRouteMatch();
  const location = useLocation();
  const isLogin = !!user.id;

  useEffect(() => {
    Promise.all([getLastCards(), getTopCards()]).then(([last, top]) => {
      setLastCards(last);
      setTopCards(top);
    });
  }, []);

  const linePath = `${path}/line`
  const collectionsPath = `${path}/collections`

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <Subheader path={path} location={location} isLogin={isLogin}/>
      <Route
        path={linePath}
        render={() => (
          <CardListView
            lastCards={lastCards}
            topCards={topCards}
            isLogin={isLogin}
          />
        )}
      />
      {/* <Route
        exact
        path={collectionsPath}
        render={() => <CollectionsView url={url} />}
      />
      <Route path={`${path}/collections/:id`} render={() => <Collection />} /> */}
      <Redirect from={path} to={linePath}/>
    </div>
  );
};
