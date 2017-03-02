<?php

class Courses extends CI_Controller {

    public function __construct() {
        parent::__construct();
        header('content-type: application/json; charset=UTF-8');
        if (@!$_SESSION['logged_in']) {
            http_response_code(401);
            echo json_encode(['success' => false, 'text' => 'not logged in'], JSON_PRETTY_PRINT);
            die();
        }
        $this->load->model('courses_model');
    }

    //get all courses
    public function show($c_id = 0) {
        if (!$c_id) {
            $data = $this->courses_model->getAllCourses();
        } else {
            $data = $this->courses_model->getSpecificCourse($c_id);
        }
        echo json_encode($data, JSON_PRETTY_PRINT);
    }

    //add a course
    public function post() {
        if (@$_SESSION['userObj']->u_role === 'sales') {
            http_response_code(401);
            echo json_encode(['success' => false, 'text' => 'not authorized'], JSON_PRETTY_PRINT);
            die();
        }
        $jsonStr = file_get_contents('php://input');
        $crsObj = json_decode($jsonStr);
        $data = $this->courses_model->addCourse($crsObj);
        echo json_encode($data, JSON_PRETTY_PRINT);
    }

    //edit a course
    public function put($c_id = 0) {
        if (@$_SESSION['userObj']->u_role === 'sales') {
            http_response_code(401);
            echo json_encode(['success' => false, 'text' => 'not authorized'], JSON_PRETTY_PRINT);
            die();
        }
        $jsonStr = file_get_contents('php://input');
        $crsObj = json_decode($jsonStr);
        $data = $this->courses_model->updateCourse($c_id, $crsObj);
        echo json_encode($data, JSON_PRETTY_PRINT);
    }

    public function delete($c_id = 0) {
        if (@$_SESSION['userObj']->u_role === 'sales') {
            http_response_code(401);
            echo json_encode(['success' => false, 'text' => 'not authorized'], JSON_PRETTY_PRINT);
            die();
        }
        $data = $this->courses_model->deleteCourse($c_id);
        echo json_encode($data, JSON_PRETTY_PRINT);
    }

}
