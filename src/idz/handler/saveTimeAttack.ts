import { SaveTimeAttackRequest } from "../request/saveTimeAttack";
import { SaveTimeAttackResponse } from "../response/saveTimeAttack";
import { World } from "../world";

export async function saveTimeAttack(
  w: World,
  req: SaveTimeAttackRequest
): Promise<SaveTimeAttackResponse> {
  const state = await w.timeAttack().load(req.profileId);
  const existing = state.courses.find(
    course => course.courseId === req.payload.courseId
  );

  if (existing === undefined || existing.totalMsec > req.payload.totalMsec) {
    const newCourses = state.courses.filter(
      course => course.courseId !== req.payload.courseId
    );

    newCourses.push(req.payload);

    const newState = { courses: newCourses };

    await w.timeAttack().save(req.profileId, newState);
  }

  return {
    type: "save_time_attack_res",
  };
}
