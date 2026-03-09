import {
  calculateGPA,
  mockAttendance,
  mockGrades,
  mockSchedule,
  mockStudent,
} from "../constants/data";

export const useStudentData = () => {
  const gpa = calculateGPA(mockGrades);

  return {
    student: mockStudent,
    schedule: mockSchedule,
    grades: mockGrades,
    attendance: mockAttendance,
    gpa,
  };
};

