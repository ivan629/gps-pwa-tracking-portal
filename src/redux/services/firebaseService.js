import { isNil, forEach } from 'lodash';
import { db } from '../../config/db';
import store from '../store';
import { UNIQUE_USER_ID_SET, USERS_DATA_SET } from '../actions/locationDetectionActions';

class FirebaseService {
  constructor() {
    this.userRef = db.ref('/users');
  }

  get uniqueUserId() {
    return store.getState().locationMonitoring.uniqueUserId;
  }

  async setAllUsersData() {
    const users = await this.userRef.once('value');
    const usersValues = users.val();
    const newUsers = [];

    if (!isNil(usersValues)) {
      forEach(usersValues, (user, userKey) => {
        if (userKey !== this.uniqueUserId) {
          newUsers.push(user);
        }
      })
    }

    store.dispatch({ type: USERS_DATA_SET, payload: newUsers });
    return newUsers;
  }

  async handlePositionSet (position) {
    const isInitialUserLogin = isNil(this.uniqueUserId);

    if (isInitialUserLogin) {
      this.userRef.push(position).then((snap) => store.dispatch({ type: UNIQUE_USER_ID_SET, payload: snap.key }));
    } else {
      this.userRef.child(this.uniqueUserId).update(position);
      await this.setAllUsersData();
    }
  };

  clearCurrentUserPositionHistory () {
    if(!isNil(this.uniqueUserId)) {
      this.userRef.child(this.uniqueUserId).remove();
    }
  };
}

export const firebaseService = new FirebaseService();
