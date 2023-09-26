import { stringToUniqueNumber } from "../../../utils/strings";
import { db } from "../config";
import { collection, doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore"; 

// DISCLAIMER: Params that start with 'existing' will be fetched from state and passed to the API call

const scheduleInit = {
  name: '',
  start_time: '',
  end_time: '',
  dates: [],
  users: {},
  availability: {},
  timezone: '',
}

export async function createSchedule({ name, start_time, end_time, dates, timezone }) {
  const newSchedule = { ...scheduleInit, name, start_time, end_time, dates, timezone }
  const newScheduleRef = doc(collection(db, "schedule"));

  await setDoc(newScheduleRef, newSchedule)
  const newScheduleWithID = { ...newSchedule, id: newScheduleRef.id };
  return newScheduleWithID;
};

export async function addScheduleUser({ scheduleId, user_name, user_email, existing_users }) {
  const user_id = stringToUniqueNumber(user_name);

  if (existing_users[user_id]) {
    throw new Error('User already exists!') 
   }
  
  const scheduleRef = doc(db, "schedule", scheduleId);
  await updateDoc(scheduleRef, {
    [`users.${user_id}`]: {user_name, user_email}
  })
};

export async function updateUserAvailability({ scheduleId, user_id, availability, existing_availability, existing_users}) {
  if (!existing_users[user_id]) {
    throw new Error('User already exists!') 
  }

  for (let time of availability) {
    if (!existing_availability[time]) {
      existing_availability[time] = [];
    }
    existing_availability[time].push(user_id);
  }

  const scheduleRef = doc(db, "schedule", scheduleId);
  await updateDoc(scheduleRef, {
    availability: existing_availability
  });
};

