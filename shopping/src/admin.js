import { db } from "./firebase/config";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

async function getShoes() {
  try {
    let ref = collection(db, "inventory");
    let r = await getDocs(ref);
    if (!r) throw new Error("Failed to get listings");
    let list = [];
    r.forEach((doc) => {
      list.push({ id: doc.id, data: doc.data() });
    });
    return list;
  } catch (err) {
    console.log(err);
  }
}

async function addProfile(payload) {
  try {
    let ref = collection(db, "profile");
    let r = await addDoc(ref, payload);
    if (!r) throw new Error("Failed to get profile");
    let doc = { id: r.id, data: payload }
    return doc
  } catch (err) {
    console.log(err);
  }
}

async function loadProfile(payload) {
  try {
    let ref = collection(db, "profile");
    let q = query(ref, where("uid", "==", payload));
    let r = await getDocs(q)
    if (!r) throw new Error("Failed to get profile");
    let list = []
    r.forEach((doc) => {
      list.push({
        id: doc.id, data: doc.data()
      })
    })
    return list[0]
  } catch (err) {
    console.log(err);
  }
}

export { getShoes,addProfile, loadProfile};
