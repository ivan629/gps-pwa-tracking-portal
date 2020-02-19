import { has, map, isNil } from 'lodash';
import { db } from '../../config/db';
import store from '../store';
import { UNIQUE_USER_ID_SET, USERS_DATA_SET } from '../actions/locationDetectionActions';

class FirebaseService {
  constructor() {
    this.userRef = db.ref('/users');
  }

  get uniqueUserId() {
    console.log(store.getState().locationMonitoring.uniqueUserId);
    return store.getState().locationMonitoring.uniqueUserId;
  }

  async getAllUsers() {
    const users = await this.userRef.once('value');

    return users.val();
  }

  async handlePositionSet (position) {
    const allUsers = await this.getAllUsers();
    const isInitialUserLogin = !has(allUsers, this.uniqueUserId);

    if (isInitialUserLogin) {
      this.userRef.push(position).then((snap) => store.dispatch({ type: UNIQUE_USER_ID_SET, payload: snap.key }));
    } else {
      this.userRef.child(this.uniqueUserId).update(position);
      const usersData = map(allUsers, userData => userData);

      store.dispatch({ type: USERS_DATA_SET, payload: usersData })
    }
  };

  clearCurrentUserPositionHistory () {
    if(!isNil(this.uniqueUserId)) {
      this.userRef.child(this.uniqueUserId).remove();
    }
  };
}

export const firebaseService = new FirebaseService();
