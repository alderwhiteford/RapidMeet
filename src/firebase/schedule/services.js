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
    const newScheduleWithID = { ...newSchedule, id: newScheduleRef.id };
    return newScheduleWithID; // Handle success
  }
  catch (error) {
    return // Throw error
  }
}

export async function getScheduleById({ scheduleId }) {
  const docRef = doc(db, 'schedule', scheduleId);

  return new Promise((resolve, reject) => {
    let unsubscribe;

    unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          resolve({ success: true, data: snapshot.data() });
        } else {
          const error = new Error('Document does not exist.');
          reject({ success: false, error, unsubscribe });
        }
      },
      (error) => {
        reject({ success: false, error, unsubscribe });
      }
    );
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
