import {
  createSchedule as createScheduleAPI,
  getUserByName as getUserByNameAPI,
  addScheduleUser as addScheduleUserAPI,
  updateUserAvailability as updateUserAvailabilityAPI,
} from './firebase/schedule/services';

export async function createSchedule({ name, start_time, end_time, dates, timezone }) {
  try {
    const newSchedule = await createScheduleAPI({ name, start_time, end_time, dates, timezone });
    return { success: true, data: newSchedule };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export async function getUserByName({ user_name, existing_users }) {
  try {
    const data = await getUserByNameAPI({ user_name, existing_users });
    return { success: true, data: { user: data?.user, message: data?.message } };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export async function addScheduleUser(scheduleId, user_name, user_email, existing_users) {
  try {
    const user = await addScheduleUserAPI({ scheduleId, user_name, user_email, existing_users });
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export async function updateUserAvailability(scheduleId, user, availability, existing_availability, existing_users, deletedTimes) {
  try {
    await updateUserAvailabilityAPI({ scheduleId, user, availability, existing_availability, existing_users, deletedTimes });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
