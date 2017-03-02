<?php

class Courses_model extends CI_Model {

    public function getAllCourses() {
        $qry = "SELECT * FROM courses";
        //query the DB
        $dbResult = $this->db->query($qry);
        return $dbResult->result();
    }

    public function getSpecificCourse($c_id) {
        $dbResult = $this->db->get_where('courses', ['c_id' => $c_id]);
        return $dbResult->result();
    }

    public function addCourse($data) {
        return $this->db->insert('courses', $data);
    }

    public function updateCourse($c_id, $data) {
        return $this->db->update('courses', $data, ['c_id' => $c_id]);
    }

    public function deleteCourse($c_id) {
        return $this->db->delete('courses', ['c_id' => $c_id]);
    }

}
