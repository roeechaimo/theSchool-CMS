<?php

class Students_model extends CI_Model {

    public function getAllStudents() {
        $qry = "SELECT * FROM students";
        $dbResult = $this->db->query($qry);
        return $dbResult->result();
    }

    public function getSpecificStudent($s_id) {
        $dbResult = $this->db->get_where('students', ['s_id' => $s_id]);
        return $dbResult->result();
    }

    public function getLastIsertedStudentId() {
        $dbResult = $this->db->insert_id();
        return $dbResult;
    }

    public function addStudent($data) {
        return $this->db->insert('students', $data);
    }

    public function updateStudent($s_id, $data) {
        return $this->db->update('students', $data, ['s_id' => $s_id]);
    }

    public function deleteStudent($s_id) {
        return $this->db->delete('students', ['s_id' => $s_id]);
    }

}
