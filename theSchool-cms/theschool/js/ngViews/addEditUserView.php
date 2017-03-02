<!--add/update user view-->
<div class="addEditUser" ng-controller="mainCtrl" ng-show="addEditUserView">
    <button type="button" class="btn btn-info" ng-click="saveUser()">Save</button>
    <button type="button" class="btn btn-info" ng-hide="toRegister" ng-click="deleteUser()">Delete</button>
    <div class="addEdit">
        <div class="input-group mainInput">
            <input type="text" class="form-control uInput" placeholder="User Name" aria-describedby="basic-addon1" ng-model="specUser[0].u_name" required>
        </div> 
        <div class="input-group mainInput">
            <input type="text" class="form-control uInput" placeholder="Phone: 05x-xxxxxxx" aria-describedby="basic-addon1" ng-model="specUser[0].u_phone" required>
        </div> 
        <div class="input-group mainInput">
            <input type="email" class="form-control uInput" placeholder="User Email" aria-describedby="basic-addon1" ng-model="specUser[0].u_email" required>
        </div>
    </div>   
    <div class="form-group selectRoles">
        <label for="disabledSelect">Select Role</label>
        <select id="disabledSelect" class="form-control uInput"  ng-model="specUser[0].u_role" required>
            <option ng-repeat="role in roles" ng-if="rolePermit || specUser[0].u_role === role.role">{{role.role}}</option>
        </select>
    </div>
    <div class="input-group">
        <input type="password" class="form-control uInput" placeholder="User Password" aria-describedby="basic-addon1" ng-model="specUser[0].u_pass" ng-if="toRegister" required>
    </div>     
</div>




