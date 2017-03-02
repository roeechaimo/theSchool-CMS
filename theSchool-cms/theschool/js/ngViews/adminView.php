<!--the users list on side container-->
<div ng-controller="sideCtrl">
    <ul class="sideCulumns">
        <li class="courseSideBar grandLiSide">
            <div>
                <div><span class="ulHeader">Administrators</span> <span class="glyphicon glyphicon-plus-sign"></span></div>
                <div>
                    <ul class="sideUl" ng-repeat="user in users">
                        <li class="sideLi course">
                            <div>
                                <span>Name: {{user.u_name}}</span><br/>
                                <span>Phone: {{user.u_phone}}</span><br/>
                                <span>Email: {{user.u_email}}</span><br/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    </ul>
</div>

