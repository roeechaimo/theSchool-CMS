<?php

class Enrollments_model extends CI_Model {

    public function getAllEnrollments() {
        $qry = "SELECT * FROM enrollments";
        $dbResult = $this->db->query($qry);
        return $dbResult->result();
    }

    public function getAllEnrollmentsForStudent($s_id) {
        $dbResult = $this->db->get_where('enrollments', ['s_id' => $s_id]);
        return $dbResult->result();
    }

    public function showAllEnrollmentsForCourse($c_id) {      
        $dbResult = $this->db->get_where('enrollments', ['c_id' => $c_id]);        
        return $dbResult->result();
    }

    public function countEnrollmentsForCourse($c_id) {                
        $dbResult = $this->db->get_where('enrollments', ['c_id' => $c_id]);        
        return $dbResult->num_rows();
    }

    public function addEnrollment($data) {
        return $this->db->insert('enrollments', $data);
    }

    public function deleteEnrollment($e_id) {
        return $this->db->delete('enrollments', ['e_id' => $e_id]);
    }

    public function deleteAllEnrollmentsForStudent($s_id) {
        return $this->db->delete('enrollments', ['s_id' => $s_id]);
    }

}
