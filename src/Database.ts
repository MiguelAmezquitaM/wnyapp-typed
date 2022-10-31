
// import firebase from '@react-native-firebase/app';
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({
  apiKey: "AIzaSyC_vJeFDBdcBAYfWHSFNjhNnzkSb7Modd0",
    authDomain: "wnyapp-c105f.firebaseapp.com",
    projectId: "wnyapp-c105f",
    storageBucket: "wnyapp-c105f.appspot.com",
    messagingSenderId: "851818461329",
    appId: "1:851818461329:web:3f6f9c319841518dbde730",
    measurementId: "G-ZC7BPJB2N5",
    databaseURL: 'https://wnyapp-c105f.firabaseio.com'
})

export const fireDB = getFirestore()
export default app