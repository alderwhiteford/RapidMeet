import { stringToUniqueNumber } from "../../../utils/strings";
import { db } from "../config";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore"; 

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

export async function getUserByName({ user_name, existing_users }) {
  const user_id = stringToUniqueNumber(user_name);

  if (existing_users[user_id]) {
    return { id: user_id, name: user_name, email: existing_users[user_id].user_email };
  } else {
    throw new Error('User with this name does not exist in this event');
  }
};

export async function addScheduleUser({ scheduleId, user_name, user_email, existing_users }) {
  const user_id = stringToUniqueNumber(user_name);

  if (existing_users[user_id]) {
    throw new Error('User with this name already exists');
  }
  
  const scheduleRef = doc(db, "schedule", scheduleId);
  await updateDoc(scheduleRef, {
    [`users.${user_id}`]: {user_name, user_email}
  })

  return { id: user_id, name: user_name, email: user_email };
};

export async function updateUserAvailability({ scheduleId, user, availability, existing_availability, existing_users }) {
  let { id: user_id, name: user_name, email: user_email } = user;

  if (!existing_users[user_id]) {
    await updateDoc(scheduleRef, {
      [`users.${user.id}`]: {user_name, user_email}
    })
  }

  let newAvailability =  { ...existing_availability };

  for (let time of availability) {
    if (!newAvailability[time]) {
      newAvailability[time] = [];
    }
    const userSet = new Set([...newAvailability[time], user_id]);
    newAvailability[time] = Array.from(userSet);
  }

  const scheduleRef = doc(db, "schedule", scheduleId);
  await updateDoc(scheduleRef, {
    availability: newAvailability
  });
};
