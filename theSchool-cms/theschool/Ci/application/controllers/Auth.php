<?php

class Auth extends CI_Controller {

    //encrypt the password
    const SALT = "This is a password salt !@#$%^^123423ASDASDAS";

    private $_data;

    public function __construct() {
        parent::__construct();
        header('Content-type: application/json; charset=UTF-8');
        $this->load->model('users_model');
        $jsonStr = file_get_contents('php://input');
        $this->_data = json_decode($jsonStr);
    }

    public function login() {
        $userObj = $this->_data;
        $userObj->u_pass = sha1($userObj->u_pass . self::SALT);
        $dbAnswer = $this->users_model->getUserByCredentials($userObj);
        if ($dbAnswer) {
            $_SESSION['logged_in'] = true;
            $_SESSION['userObj'] = $dbAnswer;
            echo json_encode([
                'success' => true,
                'u_id' => $_SESSION['userObj']->u_id,
                'u_name' => $_SESSION['userObj']->u_name,
                'u_role' => $_SESSION['userObj']->u_role,
                    ], JSON_PRETTY_PRINT);
        } else {
            http_response_code(401 /* unauthorized */);
            echo json_encode([
                'success' => false
                    ], JSON_PRETTY_PRINT);
        }
    }

    public function logout() {
        echo json_encode([
            'success' => true
                ], JSON_PRETTY_PRINT);
        $this->session->sess_destroy();
    }

    //add a user
    public function register() {
        if (@$_SESSION['userObj']->u_role === 'sales') {
            http_response_code(401);
            echo json_encode(['success' => false, 'text' => 'not authorized'], JSON_PRETTY_PRINT);
            die();
        }
        $userObj = $this->_data;
        $userObj->u_pass = sha1($userObj->u_pass . self::SALT);
        $dbAnswer = $this->users_model->addUser($userObj);
        echo json_encode([
            'success' => $dbAnswer
                ], JSON_PRETTY_PRINT);
    }

    //check if user is logged in
    public function isLoggedIn() {
        if (@$_SESSION['userObj']) {
            echo json_encode([
                'isLoggedIn' => true,
                'u_id' => $_SESSION['userObj']->u_id,
                'u_name' => $_SESSION['userObj']->u_name,
                'u_role' => $_SESSION['userObj']->u_role,
                    ], JSON_PRETTY_PRINT);
        } else {
            echo json_encode([
                'isLoggedIn' => false
                    ], JSON_PRETTY_PRINT);
        }
    }

}
