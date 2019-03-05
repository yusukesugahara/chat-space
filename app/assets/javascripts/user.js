$(function(){

  var search_list = $('#user-search-result');

  function displayUserHTML(user){
     html =  `
          <div class="user-search-result-candidate
            test">${user.name}

            <div class="user-search-result-candidate-add", id="${user.id}" >追加
            </div>
          </div>
    `
    search_list.append(html)
  }

  function displayUserNoHTML(message){
     html =  `
          <div class="user-search-result-candidate
            test">${message}
            </div>`
  }


  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val()
    $.ajax({
      url: '/users',
      type: 'GET',
      data: { keyword: input },
      dataType: 'json',

    })
    .done(function(users){
      search_list.empty();
      if(users.length !== 0){
        users.forEach(function(user){
          displayUserHTML(user);
        });
    }else{
      displayUserNoHTML("一致するユーザーはいません。")
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })

  })
})
