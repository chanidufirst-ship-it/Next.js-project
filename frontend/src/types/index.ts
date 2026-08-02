export interface User {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
}

export interface Student {
  id: string;
  studentId: string;
  fullName: string;
  email: string;
  phone: string;
  course: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  registrationDate: string;
}

export interface StudentFormData {
  studentId: string;
  fullName: string;
  email: string;
  phone: string;
  course: string;
  age: number | '';
  gender: string;
  address: string;
  registrationDate?: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  studentsByCourse: Record<string, number>;
  studentsByGender: Record<string, number>;
  recentStudents: Student[];
}
