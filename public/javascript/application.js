$(function () {

  $('#new_contact').on('submit', function (event) {
    event.preventDefault();

    var form = $(this);

    $.ajax({
      method: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize(),
      success: function (data) {
        var contactList = $('.table').find($('tbody'));
        $('<tr>')
          .append($('<td>')
            .text(data.name)
          )
          .append($('<td>')
            .append($('<a>').attr("href", "mailto:"+data.email)
            .text(data.email))
          )
          .append($('<td>')
            .append($('<button>').addClass('edit').text('Edit'))
          )
          .append($('<td>')
            .append($('<button>').attr("name", "<%=id%>").  addClass('delete').text('Delete'))
          ).appendTo(contactList);
      }
    });

  });

  $('#delete_contact').on('submit', function (event) {
    event.preventDefault();

    var form = $(this);

    $.ajax({
      method: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize(),
      success: function (data) {
        var contact = form.closest('.contact-row');
        contact.remove();
      }
    });

  });

  $('.edit').on('click', function (event) {
    event.preventDefault();

    var form = $(this);

    $.ajax({
      method: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize(),
      success: function (data) {
        var contact = form.closest('.contact-row');
        var name = contact.find('.name');
        var nameText = name.text();
        name.replaceWith('<input type="text" name="name" class="name" value="'+nameText+'">');
        var email = contact.find('.email');
        var emailText = email.text();
        email.replaceWith('<input type="text" name="name" class="email" value="'+emailText+'">');
        var editButton = $('.edit').addClass('save').text('Save')

      }
    });

  });

  // $('.edit.save').on('click', function(){
  //   var contact = form.closest('.contact-row');
  //   debugger;
  //   var name = contact.find('.name');
  //   var nameText = name.text();
  //   name.replaceWith('<td>'+nameText+'</td>');
  //       })



  var button = $('#load-more-posts');
  button.on('click', function () {
    $.ajax({
      url: 'more-posts.html',
      method: 'GET',
      success: function (morePostsHtml) {
        button.replaceWith(morePostsHtml);
      }
    });
  });



});

