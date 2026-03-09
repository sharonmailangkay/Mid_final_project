export type Student = {
  id: string;
  name: string;
  major: string;
  semester: number;
  email: string;
  status: "Active" | "Warning" | "Probation";
  totalCredits: number;
};

export type CourseSchedule = {
  id: string;
  name: string;
  lecturer: string;
  day: string;
  time: string;
  classroom: string;
};

export type CourseGrade = {
  id: string;
  name: string;
  grade: string;
  credits: number;
};

export type CourseAttendanceStatus = "Present" | "Absent" | "Excused";

export type CourseAttendance = {
  id: string;
  name: string;
  totalMeetings: number;
  attended: number;
  status: CourseAttendanceStatus;
};

export const mockStudent: Student = {
  id: "221234567",
  name: "John Doe",
  major: "Computer Science",
  semester: 5,
  email: "john.doe@student.university.ac.id",
  status: "Active",
  totalCredits: 84,
};

export const mockSchedule: CourseSchedule[] = [
  {
    id: "cs101",
    name: "Introduction to Programming",
    lecturer: "Dr. Sarah Johnson",
    day: "Monday",
    time: "09:00 - 11:00",
    classroom: "Room A-203",
  },
  {
    id: "cs202",
    name: "Data Structures & Algorithms",
    lecturer: "Prof. Michael Lee",
    day: "Tuesday",
    time: "13:00 - 15:00",
    classroom: "Room B-105",
  },
  {
    id: "cs303",
    name: "Database Systems",
    lecturer: "Dr. Emily Brown",
    day: "Wednesday",
    time: "10:00 - 12:00",
    classroom: "Room C-301",
  },
  {
    id: "cs404",
    name: "Mobile Application Development",
    lecturer: "Mr. Kevin Tan",
    day: "Thursday",
    time: "14:00 - 16:00",
    classroom: "Lab D-102",
  },
];

export const mockGrades: CourseGrade[] = [
  {
    id: "cs101",
    name: "Introduction to Programming",
    grade: "A",
    credits: 3,
  },
  {
    id: "cs202",
    name: "Data Structures & Algorithms",
    grade: "B+",
    credits: 3,
  },
  {
    id: "cs303",
    name: "Database Systems",
    grade: "A-",
    credits: 3,
  },
  {
    id: "cs404",
    name: "Mobile Application Development",
    grade: "B",
    credits: 3,
  },
];

export const mockAttendance: CourseAttendance[] = [
  {
    id: "cs101",
    name: "Introduction to Programming",
    totalMeetings: 14,
    attended: 13,
    status: "Present",
  },
  {
    id: "cs202",
    name: "Data Structures & Algorithms",
    totalMeetings: 14,
    attended: 11,
    status: "Present",
  },
  {
    id: "cs303",
    name: "Database Systems",
    totalMeetings: 14,
    attended: 9,
    status: "Excused",
  },
  {
    id: "cs404",
    name: "Mobile Application Development",
    totalMeetings: 14,
    attended: 8,
    status: "Absent",
  },
];

export const gradeToPoint = (grade: string): number => {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.3;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.3;
    case "C":
      return 2.0;
    case "D":
      return 1.0;
    default:
      return 0;
  }
};

export const calculateGPA = (grades: CourseGrade[]): number => {
  const { totalPoints, totalCredits } = grades.reduce(
    (acc, course) => {
      const points = gradeToPoint(course.grade) * course.credits;
      return {
        totalPoints: acc.totalPoints + points,
        totalCredits: acc.totalCredits + course.credits,
      };
    },
    { totalPoints: 0, totalCredits: 0 }
  );

  if (!totalCredits) {
    return 0;
  }

  const gpa = totalPoints / totalCredits;
  return parseFloat(gpa.toFixed(2));
};

export const mockAvailableCourses = [
  { id: "se301", name: "Software Engineering", lecturer: "Dr. Alan Turing", credits: 3 },
  { id: "ai401", name: "Artificial Intelligence", lecturer: "Prof. John McCarthy", credits: 4 },
  { id: "nw201", name: "Computer Networks", lecturer: "Dr. Vint Cerf", credits: 3 },
  { id: "cy501", name: "Cybersecurity Basics", lecturer: "Mr. Kevin Mitnick", credits: 3 },
  { id: "ui302", name: "UI/UX Design", lecturer: "Ms. Don Norman", credits: 2 },
];

export type ConsultationStatus = 'Pending' | 'Responded' | 'Completed';

export type Consultation = {
  id: string;
  topic: string;
  staffName: string;
  staffRole: "Dean (Dekan)" | "Head of Study Program (Kaprodi)" | "Lecturer (Dosen)";
  message: string;
  status: ConsultationStatus;
  date: string;
  response?: string;
};

export const mockConsultations: Consultation[] = [
  {
    id: "c-001",
    topic: "Internship (Magang)",
    staffName: "Dr. Jane Smith",
    staffRole: "Head of Study Program (Kaprodi)",
    message: "Bapak, saya ingin bertanya terkait prosedur pendaftaran magang di semester 6 ini.",
    status: "Responded",
    date: "2026-03-05",
    response: "Baik, silakan unduh form panduan magang di portal akademik dan serahkan ke TU sebelum 15 Maret ya."
  },
  {
    id: "c-002",
    topic: "Course Selection",
    staffName: "Prof. Michael Lee",
    staffRole: "Lecturer (Dosen)",
    message: "Prof, apakah saya bisa mengambil matkul Data Structure jika belum lulus Programming 1?",
    status: "Completed",
    date: "2026-02-28",
    response: "Tidak bisa. Programming 1 adalah prasyarat untuk mengambil Data Structure. Selesaikan dulu di semester ganjil depan."
  },
  {
    id: "c-003",
    topic: "Thesis / Final Project (Skripsi)",
    staffName: "Dr. Alan Turing",
    staffRole: "Dean (Dekan)",
    message: "Permohonan perpanjangan masa studi terkait penyelesaian Skripsi.",
    status: "Pending",
    date: "2026-03-08",
  }
];
