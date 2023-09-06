import { stringToUniqueNumber } from "../../utils/strings";
import { db } from "../config";
import { collection, doc, setDoc, updateDoc, onSnapshot, arrayUnion } from "firebase/firestore"; 

// DISCLAIMER: Params that start with 'existing' will be fetched from state and passed to the API call

const scheduleInit = {
  name: '',
  start_time: '',
  end_time: '',
  user_names: [],
  user_ids: [],
  availability: {}
}

export async function createSchedule({ name, start_time, end_time }) {
  const newSchedule = { ...scheduleInit, name, start_time, end_time }
  const newScheduleRef = doc(collection(db, "schedule"));

  await setDoc(newScheduleRef, newSchedule)
    .then({
      // Response is undefined.
      // Trigger success
    })
    .catch((error) => {
      // Need to add error handling feature:
      console.log(error);
    });
}

export async function getScheduleById({ scheduleId, setSchedule }) {
  onSnapshot(doc(db, "schedule", scheduleId), 
    (snapshot) => {
      setSchedule(snapshot.data());
    },
    (error) => {
      // Need to add error handling feature:
      console.log(error);
    });
}

export async function addScheduleUser({ scheduleId, user_name, existing_user_ids }) {
  const user_id = stringToUniqueNumber(user_name);
  
  if (!existing_user_ids.includes(user_id)) {
    const scheduleRef = doc(db, "schedule", scheduleId);
    await updateDoc(scheduleRef, {
      user_ids: arrayUnion(user_id),
      user_names: arrayUnion(user_name)
    })
    .then({
      // Response is undefined.
      // Trigger success
    })
    .catch((error) => {
      // Need to add error handling feature:
      console.log(error);
    });
  } else {
    // Need to add error handling feature:
    console.log("User already exists!");
  }
}

export async function updateUserAvailability({ scheduleId, user_id, availability, existing_availability, existing_user_ids }) {
  for (let time of availability) {
    if (!existing_availability[time]) {
      existing_availability[time] = [];
    }
    existing_availability[time].push(user_id);
  }
  
  if (existing_user_ids.includes(user_id)) {
    const scheduleRef = doc(db, "schedule", scheduleId);
    await updateDoc(scheduleRef, {
      availability: existing_availability
    })
    .then({
      // Response is undefined.
      // Trigger success
    })
    .catch((error) => {
      // Need to add error handling feature:
      console.log(error);
    })
  } else {
    // Need to add error handling feature:
    console.log("User doesn't exist!");
  }
}
