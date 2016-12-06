app.controller('PageBuilderController', PageBuilderController);
function PageBuilderController($scope, toastr) {
    var vm = $scope;
    vm.items = [];
    vm.name = 'The page builder ';
    vm.components = {
        headers: [
            {title: 'Header 1', locked: true, type: 'header'},
            {title: 'Header 2', locked: true, type: 'header'}
        ],
        layouts: [
            {title: '1 Column', text: "1 x 100%", type: 'layout', composants: []},
            {title: '2 Columns', text: "2 x 50%", type: 'layout', left: [], right: []}
        ],
        models: [
            {title: 'Groupement de santé', text: "Groupement de santé", type: 'model', fields: [], data: [{name: "Icone groupement", ticked: true}, {name: "Nom établissement", ticked: true}, {name: "Adresse établissement", ticked: true}]},
            {title: 'Etablissement de santé', text: "Groupement de santé", type: 'model', fields: [], data: [{name: "Icone groupement", ticked: true}, {name: "Nom groupement", ticked: true}, {name: "Adresse groupement", ticked: true}]}
        ]
    }
    ;
    vm.orig_components = angular.copy(vm.components);
    vm.model = [];
    $scope.sortableOptions = {
        update: function (e, ui) {
            console.log(vm.items);
            if (!ui.item.sortable.received && ui.item.sortable.droptargetModel[ui.item.sortable.dropindex] && ui.item.sortable.droptargetModel[ui.item.sortable.dropindex].type === "layout" && ui.item.sortable.sourceModel[ui.item.sortable.index].type === "layout") {
                toastr.success("Layout within layout are not allowed", 'error');
                ui.item.sortable.cancel();
            }
            vm.reset();
        },
        receive: function (e, ui) {

        },
        over: function (e, ui) {
        },
        handle: ".fa.fa-arrows",
        placeholder: "placeholder-over",
        connectWith: ".apps-container",
        revert: true
    };
    vm.getView = function (item) {
        /*
         you can return a different url
         to load a different template dynamically
         based on the provided item
         */
        if (item) {
            if (item.type === "header") {
                return 'nestable_item_1.html';
            } else if (item.type === "layout") {
                return 'layout.html';
            } else if (item.type === "model") {
                return 'model_item.html';
            }
        }
        return null;
    };
    vm.remove = function (index) {
        $scope.items.splice(index, 1);
    };
    vm.getName = function () {
        return vm.name;
    };
    vm.setName = function (name) {
        vm.name = name;
    };
    vm.reset = function () {
        vm.components = angular.copy(vm.orig_components);
    }
}