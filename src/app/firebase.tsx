import { initializeApp } from "firebase/app"
import { 
    getDatabase,
    ref,
    onValue,
    set,
    push,
    update,
    remove,
    type DataSnapshot,
    type DatabaseReference
} from "firebase/database"

const firebaseConfig ={
    apiKey: "CBuc7JuanfWmscKLyIAJyOBoTA0k46PzBar8FJu4",
    authDomain: "climatizarecife-2025.firebaseapp.com",
    databaseURL: "https://climatizarecife-2025-default-rtdb.firebaseio.com/",
    projectId: "climatizarecife-2025",
    storageBucket: "climatizarecife-2025.appspot.com"
}

const app = initializeApp(firebaseConfig)

const database = getDatabase(app)

export {
    database,
    ref,
    onValue,
    set,
    push,
    update,
    remove,
}

export type {
    DataSnapshot,
    DatabaseReference
}