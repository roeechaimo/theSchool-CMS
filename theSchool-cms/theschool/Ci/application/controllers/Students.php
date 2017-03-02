<?php

class Students extends CI_Controller {

    public function __construct() {
        parent::__construct();
        header('content-type: application/json; charset=UTF-8');
        if (@!$_SESSION['logged_in']) {
            http_response_code(401);
            echo json_encode(['success' => false, 'text' => 'not logged in'], JSON_PRETTY_PRINT);
            die();
        }
        $this->load->model('students_model');
    }

    //get all students
    public function show($s_id = 0) {
        if (!$s_id) {
            $data = $this->students_model->getAllStudents();
        } else {
            $data = $this->students_model->getSpecificStudent($s_id);
        }
        echo json_encode($data, JSON_PRETTY_PRINT);
    }

    //add a student
    public function post() {
        $jsonStr = file_get_contents('php://input');
        $stdObj = json_decode($jsonStr);
        $datafromDb = $this->students_model->addStudent($stdObj);
        $lastStudentId = $this->students_model->getLastIsertedStudentId();
        echo json_encode(['dbAnswer'=>$datafromDb, 'lastStudentId'=>$lastStudentId]);
        return $lastStudentId;
    }

    //update student details
    public function put($s_id = 0) {
        $jsonStr = file_get_contents('php://input');
        $stdObj = json_decode($jsonStr);
        $data = $this->students_model->updateStudent($s_id, $stdObj);
        echo json_encode($data, JSON_PRETTY_PRINT);
    }

    public function delete($s_id = 0) {
        $data = $this->students_model->deleteStudent($s_id);
        echo json_encode($data, JSON_PRETTY_PRINT);
    }

}
