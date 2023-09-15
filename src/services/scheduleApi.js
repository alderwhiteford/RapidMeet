import {
  createSchedule as createScheduleAPI,
  addScheduleUser as addScheduleUserAPI,
  updateUserAvailability as updateUserAvailabilityAPI,
} from '../firebase/schedule/services';

export async function createSchedule({ name, start_time, end_time }) {
  try {
    const newSchedule = await createScheduleAPI({ name, start_time, end_time });
    return { success: true, data: newSchedule };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function addScheduleUser(scheduleId, user_name, user_email, existing_users) {
  try {
    await addScheduleUserAPI({ scheduleId, user_name, user_email, existing_users });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateUserAvailability(scheduleId, user_id, availability, existing_availability, existing_users) {
  try {
    await updateUserAvailabilityAPI({ scheduleId, user_id, availability, existing_availability, existing_users });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
