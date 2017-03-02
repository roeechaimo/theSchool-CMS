<?php

class Enrollments extends CI_Controller {

    public function __construct() {
        parent::__construct();
        header('content-type: application/json; charset=UTF-8');
        if (@!$_SESSION['logged_in']) {
            http_response_code(401);
            echo json_encode(['success' => false, 'text' => 'not logged in'], JSON_PRETTY_PRINT);
            die();
        }
        $this->load->model('enrollments_model');
    }

    //get all enrollments or all enrollments for a specific student
    public function show($s_id = 0) {
        if (!$s_id) {
            $data = $this->enrollments_model->getAllEnrollments();
        } else {
            $data = $this->enrollments_model->getAllEnrollmentsForStudent($s_id);
        }
        echo json_encode($data, JSON_PRETTY_PRINT);
    }

    //shows all enrollments for a specific course
    public function eShow($c_id = 0) {
        $data = $this->enrollments_model->showAllEnrollmentsForCourse($c_id);
        echo json_encode($data, JSON_PRETTY_PRINT);
    }

    //get the amount of enrollments for a specific course
    public function count($c_id = 0) {
        $data = $this->enrollments_model->countEnrollmentsForCourse($c_id);
        echo json_encode($data, JSON_PRETTY_PRINT);
    }

    //add an enrollment
    public function post() {
        $jsonStr = file_get_contents('php://input');
        $enrtsObj = json_decode($jsonStr);
        $coursesArr = $enrtsObj->c_id;
        $successAraay = [];
        if (count($coursesArr) < 1) {
            return;
        }
        $isDeleted = $this->enrollments_model->deleteAllEnrollmentsForStudent($enrtsObj->s_id);        
        array_push($successAraay, $isDeleted);
        foreach ($coursesArr as $course) {
            $enrObj['s_id'] = $enrtsObj->s_id;
            $enrObj['c_id'] = $course;
            $data = $this->enrollments_model->addEnrollment($enrObj);
            array_push($successAraay, $data);
        }
        echo json_encode($successAraay, JSON_PRETTY_PRINT);
    }

    public function delete($e_id = 0) {
        $data = $this->enrollments_model->deleteEnrollment($e_id);
        echo json_encode($data, JSON_PRETTY_PRINT);
    }

}
