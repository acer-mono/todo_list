import React from 'react';
import { useAuth } from 'reactfire';
import firebase from 'firebase';

export default function LogInForm() {
  const auth = useAuth();

  const login = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(result => console.log(result))
      .catch(result => console.log(result));
  };

  return (
    <button onClick={login} type="button">
      LOGIN WITH GOOGLE
    </button>
  );
}
