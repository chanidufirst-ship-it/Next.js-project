package com.smartcampus.studentmgmt.service;

import com.smartcampus.studentmgmt.dto.DashboardStatsDTO;
import com.smartcampus.studentmgmt.dto.StudentDTO;
import com.smartcampus.studentmgmt.model.Student;
import com.smartcampus.studentmgmt.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents(String query) {
        if (query != null && !query.trim().isEmpty()) {
            return studentRepository.findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(query.trim(), query.trim());
        }
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(String id) {
        return studentRepository.findById(id);
    }

    public Optional<Student> getStudentByStudentId(String studentId) {
        return studentRepository.findByStudentId(studentId);
    }

    public Student createStudent(StudentDTO dto) {
        if (studentRepository.existsByStudentId(dto.getStudentId())) {
            throw new IllegalArgumentException("Student ID '" + dto.getStudentId() + "' already exists.");
        }
        if (studentRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email address '" + dto.getEmail() + "' already in use.");
        }

        Student student = new Student();
        student.setStudentId(dto.getStudentId());
        student.setFullName(dto.getFullName());
        student.setEmail(dto.getEmail());
        student.setPhone(dto.getPhone());
        student.setCourse(dto.getCourse());
        student.setAge(dto.getAge());
        student.setGender(dto.getGender());
        student.setAddress(dto.getAddress());
        student.setRegistrationDate(dto.getRegistrationDate() != null ? dto.getRegistrationDate() : LocalDate.now());

        return studentRepository.save(student);
    }

    public Student updateStudent(String id, StudentDTO dto) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));

        // Check unique studentId if changed
        if (!student.getStudentId().equals(dto.getStudentId()) && studentRepository.existsByStudentId(dto.getStudentId())) {
            throw new IllegalArgumentException("Student ID '" + dto.getStudentId() + "' already exists.");
        }
        // Check unique email if changed
        if (!student.getEmail().equalsIgnoreCase(dto.getEmail()) && studentRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email address '" + dto.getEmail() + "' already in use.");
        }

        student.setStudentId(dto.getStudentId());
        student.setFullName(dto.getFullName());
        student.setEmail(dto.getEmail());
        student.setPhone(dto.getPhone());
        student.setCourse(dto.getCourse());
        student.setAge(dto.getAge());
        student.setGender(dto.getGender());
        student.setAddress(dto.getAddress());
        if (dto.getRegistrationDate() != null) {
            student.setRegistrationDate(dto.getRegistrationDate());
        }

        return studentRepository.save(student);
    }

    public void deleteStudent(String id) {
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found with ID: " + id);
        }
        studentRepository.deleteById(id);
    }

    public DashboardStatsDTO getDashboardStats() {
        List<Student> allStudents = studentRepository.findAll();
        long totalStudents = allStudents.size();

        Map<String, Long> studentsByCourse = allStudents.stream()
                .filter(s -> s.getCourse() != null)
                .collect(Collectors.groupingBy(Student::getCourse, Collectors.counting()));

        Map<String, Long> studentsByGender = allStudents.stream()
                .filter(s -> s.getGender() != null)
                .collect(Collectors.groupingBy(Student::getGender, Collectors.counting()));

        long totalCourses = studentsByCourse.keySet().size();

        List<Student> recentStudents = studentRepository.findTop5ByOrderByRegistrationDateDesc();

        return new DashboardStatsDTO(totalStudents, totalCourses, studentsByCourse, studentsByGender, recentStudents);
    }
}
