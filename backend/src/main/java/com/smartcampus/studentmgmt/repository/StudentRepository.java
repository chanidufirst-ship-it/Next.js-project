package com.smartcampus.studentmgmt.repository;

import com.smartcampus.studentmgmt.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    Optional<Student> findByStudentId(String studentId);
    Boolean existsByStudentId(String studentId);
    Boolean existsByEmail(String email);

    List<Student> findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String name, String email);
    List<Student> findTop5ByOrderByRegistrationDateDesc();
}
