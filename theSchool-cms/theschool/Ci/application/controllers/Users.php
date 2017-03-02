<?php

class Users extends CI_Controller {

    public function __construct() {
        parent::__construct();
        header('content-type: application/json; charset=UTF-8');
        if (@!$_SESSION['logged_in']) {
            http_response_code(401);
            echo json_encode(['success' => false, 'text' => 'not logged in'], JSON_PRETTY_PRINT);
            die();
        }
        if (@$_SESSION['userObj']->u_role === 'sales') {
            http_response_code(401);
            echo json_encode(['success' => false, 'text' => 'not authorized'], JSON_PRETTY_PRINT);
            die();
        }
        $this->load->model('users_model');
    }

    //get all users if theres no id and a specific one if there is
    public function show($u_id = 0) {
        if (!$u_id) {
            if (@$_SESSION['userObj']->u_role === 'manager') {
                $data = $this->users_model->getAllUsersButOwner('owner');
            } else {
                $data = $this->users_model->getAllUsers();
            }
        } else {
            $data = $this->users_model->getSpecificUser($u_id);
        }
        echo json_encode($data, JSON_PRETTY_PRINT);
    }
    
    //update user details
    public function put($u_id = 0) {
        $jsonStr = file_get_contents('php://input');
        $userObj = json_decode($jsonStr);
        $userCurrentDetails = $this->users_model->getSpecificUser($u_id);
        //echo json_encode($userCurrentDetails[0], JSON_PRETTY_PRINT);
        if ((@$_SESSION['userObj']->u_role !== 'owner' && @$userObj->u_role !== @$userCurrentDetails[0]->u_role)
                || (@$_SESSION['userObj']->u_id === @$userObj->u_id && @$userObj->u_role !== @$_SESSION['userObj']->u_role)
                        || @$userObj->u_role === 'owner' && @$_SESSION['userObj']->u_id !== @$userObj->u_id) {
            http_response_code(401);            
            echo json_encode(['success' => false, 'text' => 'not authorized'], JSON_PRETTY_PRINT);
            die();
        }
        $data = $this->users_model->updateUser($u_id, $userObj);
        echo json_encode($data, JSON_PRETTY_PRINT);
    }

    public function delete($u_id = 0) {
        if (@$_SESSION['userObj']->u_id === $u_id) {
            http_response_code(401);
            echo json_encode(['success' => false, 'text' => 'not authorized'], JSON_PRETTY_PRINT);
            die();
        }
        $data = $this->users_model->deleteUser($u_id);
        echo json_encode($data, JSON_PRETTY_PRINT);
    }

}
