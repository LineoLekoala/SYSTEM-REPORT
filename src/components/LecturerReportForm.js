import React, { useState } from 'react';
import axios from 'axios';

function LecturerReportForm() {
    const [report, setReport] = useState({
        faculty_name: '',
        class_name: '',
        week_number: '',
        lecture_date: '',
        course_name: '',
        course_code: '',
        lecturer_name: '',
        students_present: '',
        total_students: '',
        venue: '',
        scheduled_time: '',
        topic_taught: '',
        learning_outcomes: '',
        recommendations: ''
    });

    const handleChange = e => {
        setReport({...report, [e.target.name]: e.target.value});
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/reports/submit', report);
            alert(res.data.message);
        } catch(err) {
            alert('Error submitting report: ' + err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="faculty_name" placeholder="Faculty Name" onChange={handleChange} required />
            <input name="class_name" placeholder="Class Name" onChange={handleChange} required />
            <input name="week_number" type="number" placeholder="Week Number" onChange={handleChange} required />
            <input name="lecture_date" type="date" onChange={handleChange} required />
            <input name="course_name" placeholder="Course Name" onChange={handleChange} required />
            <input name="course_code" placeholder="Course Code" onChange={handleChange} required />
            <input name="lecturer_name" placeholder="Lecturer Name" onChange={handleChange} required />
            <input name="students_present" type="number" placeholder="Students Present" onChange={handleChange} required />
            <input name="total_students" type="number" placeholder="Total Students" onChange={handleChange} required />
            <input name="venue" placeholder="Venue" onChange={handleChange} required />
            <input name="scheduled_time" type="time" onChange={handleChange} required />
            <input name="topic_taught" placeholder="Topic Taught" onChange={handleChange} required />
            <textarea name="learning_outcomes" placeholder="Learning Outcomes" onChange={handleChange} required></textarea>
            <textarea name="recommendations" placeholder="Recommendations" onChange={handleChange}></textarea>
            <button type="submit">Submit Lecture Report</button>
        </form>
    );
}

export default LecturerReportForm;
