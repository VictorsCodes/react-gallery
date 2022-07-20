import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCaFEKiGEt9YlNWVya4Iio2atDAW-u93fI',
  authDomain: 'react-gallery-f8874.firebaseapp.com',
  projectId: 'react-gallery-f8874',
  storageBucket: 'react-gallery-f8874.appspot.com',
  messagingSenderId: '74402525903',
  appId: '1:74402525903:web:88d49d3f78f4b5144c7dba',
}

const firebaseApp = initializeApp(firebaseConfig)

export const storage = getStorage(firebaseApp)
