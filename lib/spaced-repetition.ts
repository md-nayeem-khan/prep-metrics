// Single source of truth for the spaced-repetition schedule.
//
// Previously this array was duplicated with DIFFERENT values: submissions POST used [1,3,7,14]
// (4 levels) while the revision routes used [1,3,7,14,30,60] (6 levels). That meant the same
// revision chain advanced differently depending on which path completed it — and a revision
// already at level 4/5 (created via /revisions/[id]/complete) that was re-solved as a "Revision"
// submission would REGRESS to level 3 (14 days) because of the shorter array. Keep one constant.
export const REVISION_INTERVALS = [1, 3, 7, 14, 30, 60] as const

export const MAX_REVISION_LEVEL = REVISION_INTERVALS.length - 1
