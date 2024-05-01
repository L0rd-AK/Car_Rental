import { createContext, useState } from "react";
import auth from "../firebase/firebase.config";
import {
    GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();




const AuthProvider = ({children}) => {
const [user,setUser]=useState(null)
const [loading,setLoading]=useState(true)
const [blogs, setBlogs] = useState([])

  // create user with email and password
  const create_user_with_email = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // signIn with email and password

  const signIn_with_email = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // login with google
  const signIn_Google = () => {
    return signInWithPopup(auth, provider)
  };

  // update profile
  const update_profile = (name, imgURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: imgURL,
    });
  };
  // sign Out
  const logOut = () => {
    return signOut(auth);
  };

  // email verification
  const email_verification = () => {
    return sendEmailVerification(auth.currentUser);
  };

// fetching blog
  useEffect(() => {
      axios.get('/blogs.json')
          .then((response) => setBlogs(response.data))
  }, [])

useEffect(() => {
const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    console.log(currentUser);
    setUser(currentUser)
    setLoading(false);
  } else {
    console.log("no user");
  }
})


return () => {
  unsubscribe()
}
}, [])


  const info = {
    signIn_Google,
    update_profile,
    email_verification,
    create_user_with_email,
    signIn_with_email,
    logOut,
    signInWithPopup,
    user,
    loading,
    blogs
  };

  return <AuthContext.Provider value={info}>
    {children}
  </AuthContext.Provider>;
};
export default AuthProvider;