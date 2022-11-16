import {db} from './firebase/config'
import { collection, addDoc } from "firebase/firestore"; 

async function addShoe() {
  try {
    let payload = {
      name: 'Adidas Stan Smith',
      rating: 5,
    }
    let ref = collection(db, 'inventory')
    let r = await addDoc(ref, payload);
    console.log(r)
  } catch (err) {
    console.log(err)
  }
}

export { addShoe }