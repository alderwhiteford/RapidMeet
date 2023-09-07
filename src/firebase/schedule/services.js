import { stringToUniqueNumber } from "../../utils/strings";
import { db } from "../config";
import { collection, doc, setDoc, updateDoc, onSnapshot, arrayUnion } from "firebase/firestore"; 

// DISCLAIMER: Params that start with 'existing' will be fetched from state and passed to the API call

const scheduleInit = {
  name: '',
  start_time: '',
  end_time: '',
  // user_names: [],
  // user_emails: [],
  // user_ids: [],
  users: {},
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

export async function addScheduleUser({ scheduleId, user_name, user_email, existing_users }) {
  const user_id = stringToUniqueNumber(user_name);

  if (existing_users[user_id]) {
    return // Throw error
   }
  
  const scheduleRef = doc(db, "schedule", scheduleId);
  try {
    await updateDoc(scheduleRef, {
      [`users.${user_id}`]: {user_name, user_email}
    })
    return // Handle success
  }
  catch (error) {
    return // Throw error
  };
}

export async function updateUserAvailability({ scheduleId, user_id, availability, existing_availability, existing_users}) {
  if (!existing_users[user_id]) {
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
