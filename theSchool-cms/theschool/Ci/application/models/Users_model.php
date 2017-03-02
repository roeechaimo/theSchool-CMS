<?php

class Users_model extends CI_Model {

    public function getAllUsers() {
        $qry = "SELECT * FROM users";        
        $dbResult = $this->db->query($qry);        
        return $dbResult->result();
    }

    public function getAllUsersButOwner($u_role) {
        $this->db->select('*');
        $this->db->from('users');
        $this->db->where('u_role !=', $u_role);
        $dbResult = $this->db->get();
        return $dbResult->result();
    }

    public function getSpecificUser($u_id) {                
        $dbResult = $this->db->get_where('users', ['u_id' => $u_id]);        
        return $dbResult->result();
    }

    public function getUserByCredentials($userObj) {
        $dbResult = $this->db->get_where('users', [
            'u_email' => @$userObj->u_email,
            'u_pass' => @$userObj->u_pass
        ]);        
        return $dbResult->num_rows() == 1 ? $dbResult->first_row() : false;
    }

    public function addUser($data) {
        return $this->db->insert('users', $data);
    }

    public function updateUser($u_id, $data) {
        return $this->db->update('users', $data, ['u_id' => $u_id]);
    }

    public function deleteUser($u_id) {
        return $this->db->delete('users', ['u_id' => $u_id]);
    }

}
