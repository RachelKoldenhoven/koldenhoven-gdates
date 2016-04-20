/**
 * Created by rachelkoldenhoven on 4/19/16.
 */
app.service('memberDataService', ['$rootScope', 'crudService', function($rootScope, crudService) {

  return {
    getMembers: function() {
      return crudService.getAll('https://galvanize-student-apis.herokuapp.com/gdating/members?limit=10')
        .then(function(members) {
          return members;
        });
    },
    getMember: function(memberId) {
      return crudService.getOne('https://galvanize-student-apis.herokuapp.com/gdating/members/' + memberId)
        .then(function(member) {
          return member;
        });
    },
    addStudent: function(payload) {
      crudService.addOne('students', payload)
        .then(function(student) {
          return student;
        });
    },
    editStudent: function(student) {
      crudService.editOne('students', student)
        .then(function(student) {
          return student;
        });
    },
    removeStudent: function(studentID) {
      crudService.removeOne('students', studentID)
        .then(function(student) {
          return student;
        });
    }
  };

}]);