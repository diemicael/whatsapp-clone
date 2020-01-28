const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

    constructor() {

        this._config = {
            apiKey: "AIzaSyBlmmdYHLwL2PJoOw1XZEEDRWihwTFqkkk",
            authDomain: "whatsapp-clone-16e8c.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-16e8c.firebaseio.com",
            projectId: "whatsapp-clone-16e8c",
            storageBucket: "whatsapp-clone-16e8c.appspot.com",
            messagingSenderId: "1069490636898",
            appId: "1:1069490636898:web:b9155f105749b80948293b",
            measurementId: "G-LDKLD9P6CR"
        }

        this.init();
    }

    init() {

        if (!window._initializedFirebase) {
            firebase.initializeApp(this._config);

            firebase.firestore().settings({});

            window._initializedFirebase = true;
        }

    }

    static db() {

        return firebase.firestore();

    }

    static hd() {

        return firebase.storage();

    }

    initAuth() {
        return new Promise((s, f) => {

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
            .then(result => {
                let token = result.credential.accessToken;
                let user = result.user;

                s({
                    user, 
                    token
                });
            })
            .catch(err => {
                f(err);
            });
        });
    }

}