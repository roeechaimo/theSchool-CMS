<!--confirmation of delete view-->
<div class="dm" ng-controller="mainCtrl" ng-show="showDModal">
    <h3>Delete?</h3>
    <div>
        <p>Are you sure?</p>
    </div>
    <div class="dmButtons">
        <ul class="dmListButtons">
            <li class="optionsButtons">
                <button type="button" class="btn btn-info" ng-click="proceedDelete()">Yes</button>
            </li>
            <li class="optionsButtons">
                <button type="button" class="btn btn-info" ng-click="dontProceedDelete()">No</button>
            </li>
        </ul>
    </div>
</div>

