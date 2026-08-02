package com.smartcampus.studentmgmt.config;

import com.smartcampus.studentmgmt.model.ERole;
import com.smartcampus.studentmgmt.model.Student;
import com.smartcampus.studentmgmt.model.User;
import com.smartcampus.studentmgmt.repository.StudentRepository;
import com.smartcampus.studentmgmt.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed Admin User
        String adminEmail = "chanindufirst@gmail.com";
        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = new User();
            admin.setEmail(adminEmail);
            admin.setPassword(encoder.encode("admin123"));
            admin.setFullName("Admin User");
            admin.setRoles(new HashSet<>(Arrays.asList(ERole.ROLE_ADMIN)));
            userRepository.save(admin);
            logger.info("Default Admin User created: email = {}, password = admin123", adminEmail);
        } else {
            logger.info("Admin User already exists.");
        }

        // 2. Seed Sample Students if database is empty
        if (studentRepository.count() == 0) {
            List<Student> sampleStudents = Arrays.asList(
                new Student(null, "STU-1001", "Chanindu Jayasundara", "chanindu.j@campus.edu", "+94 77 123 4567", "Computer Science", 22, "Male", "No. 45, University Road, Colombo", LocalDate.now().minusDays(30)),
                new Student(null, "STU-1002", "Sophia Anderson", "sophia.a@campus.edu", "+1 415 889 0123", "Software Engineering", 21, "Female", "742 Evergreen Terrace, Springfield", LocalDate.now().minusDays(20)),
                new Student(null, "STU-1003", "Liam Roberts", "liam.r@campus.edu", "+44 20 7946 0912", "Data Science", 23, "Male", "12 Baker Street, London", LocalDate.now().minusDays(15)),
                new Student(null, "STU-1004", "Emma Watson", "emma.w@campus.edu", "+1 212 555 0198", "Cyber Security", 20, "Female", "5th Avenue, New York, NY", LocalDate.now().minusDays(10)),
                new Student(null, "STU-1005", "Alex Johnson", "alex.j@campus.edu", "+61 2 9385 1000", "Information Technology", 22, "Other", "100 Ocean Drive, Sydney", LocalDate.now().minusDays(5))
            );
            studentRepository.saveAll(sampleStudents);
            logger.info("Sample students initialized in database.");
        }
    }
}
