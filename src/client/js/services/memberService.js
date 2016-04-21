/**
 * Created by rachelkoldenhoven on 4/19/16.
 */
app.service('memberDataService', ['$rootScope', 'crudService', function($rootScope, crudService) {
  var allMembers = [];
  var gettingMembers = crudService.getAll('https://galvanize-student-apis.herokuapp.com/gdating/members?limit=10000')
    .then(function(members) {
      console.log(members);
      members.data.data.forEach(function(member) {
        allMembers.push(member);
      });
    });

  return {
    getMembers: function(pageNumber) {
      var start = (pageNumber -1) * 10;
      var end = start + 9;
      return gettingMembers
        .then(function() {
          return allMembers.slice(start, end);
        })
    },
    getMember: function(memberId) {
      return crudService.getOne('https://galvanize-student-apis.herokuapp.com/gdating/members/' + memberId)
        .then(function(member) {
          return member;
        });
    },
    editMember: function(member) {
      crudService.editOne('https://galvanize-student-apis.herokuapp.com/gdating/members/' + member._id, member)
        .then(function(member) {
          return member;
        });
    },
    deleteMember: function(member) {
      crudService.removeOne('https://galvanize-student-apis.herokuapp.com/gdating/members/' + member._id)
        .then(function(member) {
          return member;
        });
    }
  };

}]);