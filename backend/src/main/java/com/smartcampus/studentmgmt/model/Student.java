package com.smartcampus.studentmgmt.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "students")
public class Student {

    @Id
    private String id;

    @Indexed(unique = true)
    private String studentId;

    private String fullName;

    @Indexed(unique = true)
    private String email;

    private String phone;

    private String course;

    private Integer age;

    private String gender;

    private String address;

    private LocalDate registrationDate;
}
