$(function(){
  function buildSendMessageHTML(message){
   var image_box = !message.image ? '' : `<img class="lower-message__image" src=${message.image} alt="Is">`
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
    .done(function(jsondata){
      var html = buildSendMessageHTML(data);
      $('.main-midle').append(html)
      $('#new_message')[0].reset()
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
