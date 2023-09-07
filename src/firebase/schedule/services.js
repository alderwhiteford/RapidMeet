import { stringToUniqueNumber } from "../../utils/strings";
import { db } from "../config";
import { collection, doc, setDoc, updateDoc, onSnapshot, arrayUnion } from "firebase/firestore"; 

// DISCLAIMER: Params that start with 'existing' will be fetched from state and passed to the API call

const scheduleInit = {
  name: '',
  start_time: '',
  end_time: '',
  user_names: [],
  user_emails: [],
  user_ids: [],
  availability: {}
}

export async function createSchedule({ name, start_time, end_time }) {
  const newSchedule = { ...scheduleInit, name, start_time, end_time }
  const newScheduleRef = doc(collection(db, "schedule"));

  try {
    await setDoc(newScheduleRef, newSchedule)
    return newSchedule; // Handle success
  }
  catch (error) {
    return // Throw error
  }
}

export async function getScheduleById({ scheduleId }) {
  return new Promise(async (resolve, reject) => {
    const docRef = doc(db, 'schedule', scheduleId);

    const unsubscribe = onSnapshot(docRef, 
      (snapshot) => {
        resolve(snapshot.data());
      },
      (error) => {
        reject({ error, unsubscribe }); // Throw error
    });
  });
}

export async function addScheduleUser({ scheduleId, user_name, user_email, existing_user_ids, existing_user_emails }) {
  const user_id = stringToUniqueNumber(user_name);

  if (existing_user_ids.includes(user_id) || existing_user_emails.includes(user_email)) {
    return // Throw error
   }
  
  const scheduleRef = doc(db, "schedule", scheduleId);
  try {
    await updateDoc(scheduleRef, {
      user_ids: arrayUnion(user_id),
      user_names: arrayUnion(user_name)
    })
    return // Handle success
  }
  catch (error) {
    return // Throw error
  };
}

export async function updateUserAvailability({ scheduleId, user_id, availability, existing_availability, existing_user_ids }) {
  if (!existing_user_ids.includes(user_id)) {
    return // Throw error
  }

  for (let time of availability) {
    if (!existing_availability[time]) {
      existing_availability[time] = [];
    }
    existing_availability[time].push(user_id);
  }

  const scheduleRef = doc(db, "schedule", scheduleId);
  try {
    await updateDoc(scheduleRef, {
      availability: existing_availability
    });
    return // Handle success
  } 
  catch (error) {
    return // Throw error
  }
}
