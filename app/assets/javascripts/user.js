$(document).on('turbolinks:load', function() {
  var chat_member = [];

  var search_list = $('#user-search-result');

  function displayUserHTML(user){
    html =  `
          <div class="user-search-result-candidate
            test" value="${user.name}" >${user.name}
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
    search_list.append(html)
  }

  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val()

    var ids = [];
    $('.chat-group-user__btn--remove').each(function(){
      ids.push($(this).attr("value"));
    });
    $.ajax({
      url: '/users',
      type: 'GET',
      data: { keyword: input, users: ids },
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

// ページが表示された時の処理

  $(window).ready(function(){
    $(".chat-group-user").each(function(){

      var user_name = ($(this).attr("value"));
      var user_id = ($(this).children('.chat-group-user__btn--remove').attr("value"));
      var hash = {id: user_id,name: user_name}
      console.log(hash)
      return chat_member.push(hash)
    });
  });

  var add_url = '.user-search-result-candidate-add'

  function displayedUserHTML(user_name,user_id){
    var html_remove =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8' value='${user_name}'>
      <input name='group[user_ids][]' type='hidden' value='${user_id}'>
      <p class='chat-group-user__name'>${user_name}</p>
      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' value='${user_id}'>削除</a>
    </div>`
    $('#user-group-add-list').append(html_remove)
  }

// 追加ボタンが押された時の処理
  $(document).on('click',add_url,function(){
    var user_name = $(this).parent().attr('value')
    var user_id = $(this).attr('id')
    hash = {id: user_id,name: user_name}
    chat_member.push(hash)
    $(this).parent().remove()

    $('.chat-group-user').remove()

// チャットグループの表示
    chat_member.forEach(function(value){
      user_id = value.id
      user_name = value.name
      displayedUserHTML(user_name,user_id)
    })
  })

  function RedisplayUserHTML(user_name,user_id){
   html =  `
        <div class="user-search-result-candidate
          test" value="${user_name}" >${user_name}
          <div class="user-search-result-candidate-add", id="${user_id}" >追加
          </div>
        </div>
  `
  search_list.append(html)
  }

// 削除ボタンが押された時の処理
  $(document).on('click','.chat-group-user__btn--remove',function(){
    var user_name = $(this).parent().attr('value')
    var user_id = $(this).attr('value')
    $('.chat-group-user').remove()


// サーチ結果に表示
    RedisplayUserHTML(user_name,user_id)

// 配列から削除
    num = 0
    chat_member.forEach(function(value){
      if (user_id === value.id){
        chat_member.splice(num, 1)
      }
    num += 1
    });

// 配列からチャットグループの表示
    chat_member.forEach(function(value){
      user_id = value.id
      user_name = value.name
      displayedUserHTML(user_name,user_id)
    });
  });
});
