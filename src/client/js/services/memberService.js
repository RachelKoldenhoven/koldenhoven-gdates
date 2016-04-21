/**
 * Created by rachelkoldenhoven on 4/19/16.
 */
app.service('memberDataService', ['$rootScope', 'crudService', function($rootScope, crudService) {
  var allMembers = [];
  var gettingMembers = crudService.getAll('https://galvanize-student-apis.herokuapp.com/gdating/members?limit=10000')
    .then(function(members) {
      members.data.data.forEach(function(member) {
        allMembers.push(member);
      });
    });

  return {
    getMembers: function(pageNumber, filterCriteria) {
      var start = (pageNumber -1) * 10;
      var end = start + 9;
      return gettingMembers
        .then(function() {
          var results =  allMembers.slice();
          if(filterCriteria === 'popular') {
            results.sort(function(left, right) {
              if(left._matches.length < right._matches.length) {
                return 1;
              } else if(left._matches.length > right._matches.length) {
                return -1;
              } else  {
                return 0;
              }
            })
          }
          results = results.slice(start, end);
          return results;
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
          console.log('crudservice res:', member);
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