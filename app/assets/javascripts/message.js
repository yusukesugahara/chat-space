$(function(){
  function buildHTML(message){
    if ( !message.image ) {
      var image_box = ` `
    } else {
      var image_box = `<img class="lower-message__image" src="${message.image}" alt="Is">`
    }
    var html = `<div class="main-midle--upper-inner" >
                  <div class="main-midle--upper-inner__name">
                    ${message.user_name}
                  </div>
                  <div class="main-midle--upper-inner__time">
                    ${message.created_time}
                  </div>
                </div>
                <div class="main-midle--lower-inner">
                    <p class="main-midle--lower-inner__comment">
                    ${message.text}
                    </p>
                    ${image_box}
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-midle').append(html)
      $('#message_content').val('')
      $('#message_image').val('')
    })
    .fail(function(){
      alert('error');
    })
    .always(() => {
    $(".form__submit").removeAttr("disabled");
     $('#midle').animate({scrollTop: $('#midle')[0].scrollHeight}, 'fast');
    });

  })
})
