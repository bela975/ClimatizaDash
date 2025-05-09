const admin = require("firebase-admin");
const serviceAccount = require('../keys/sensor-dashboard-2qx49-firebase-adminsdk-fbsvc-ee1b602d4a.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sensor-dashboard-2qx49-default-rtdb.firebaseio.com"
})

const db = admin.database()
const ref = db.ref("sensors")
const dht11Ref = ref.child("dht11")