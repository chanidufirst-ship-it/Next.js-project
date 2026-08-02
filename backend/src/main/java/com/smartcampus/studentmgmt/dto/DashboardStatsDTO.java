package com.smartcampus.studentmgmt.dto;

import com.smartcampus.studentmgmt.model.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    private long totalStudents;
    private long totalCourses;
    private Map<String, Long> studentsByCourse;
    private Map<String, Long> studentsByGender;
    private List<Student> recentStudents;
}
