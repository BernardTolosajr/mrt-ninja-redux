import { firebaseDb } from './firebase';

const added = (snapshot) => ({
  type: 'FIREBASE_CHILD_ADDED',
  snapshot
})

const onLoad = (list) => ({
  type: 'FIREBASE_ONLOADED',
  list
})

export class FirebaseList {
  get path() {
    return this._path;
  }

  set path(value) {
    this._path = value;
  }

  subscribe(emit) {
    let ref = firebaseDb.ref('bounds/' + this.path)

    /*
    ref.once('value', snapshot => {
      console.log('onload', snapshot.val())
      emit(onLoad([]));
    });
    */

    ref.on('child_added', snapshot => {
      emit(added({
        bound: this.path,
        station: snapshot.key,
        status: snapshot.val()
      }))
    });

    ref.on('child_changed', snapshot => {
      emit(added({
        bound: this.path,
        station: snapshot.key,
        status: snapshot.val()
      }))
    });

    ref.on('child_removed', snapshot => {
      console.log('removed')
    });

    return () => ref.off();
  }
}
