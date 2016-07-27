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
        $('<tr class="contact-row">')
          .append($('<td class="name">')
            .text(data.name)
          )
          .append($('<td class="email">').data("email", data.email)
            .append($('<a>').attr("href", "mailto:"+data.email)
            .text(data.email))
          )
          .append($('<td>')
            .append($('<button>').addClass('edit').addClass('btn btn-primary').text('Edit'))
          )
          .append($('<td>')
            .append($('<input>').attr("type", "submit").attr("value", "Delete").addClass('btn btn-primary'))
          ).appendTo(contactList);
      }
    });

  });

  $('.delete_contact').on('submit', function (event) {
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

  $(document).on('click', '.edit', function (event) {
    event.preventDefault();
    var contact = $(this).closest('.contact-row');
    var name = contact.find('.name');

    var nameText = name.text();
    name.replaceWith('<td><input type="text" name="name" class="name" value="'+nameText+'"></td>');
    var email = contact.find('.email');
    var emailText = email.text();
    email.replaceWith('<td><input type="text" name="name" class="email" data-email="'+emailText+'" value="'+emailText+'"></td>');
    // TODO perhaps chain this HTML better
    var editButton = contact.find('.edit').addClass('save').removeClass('edit').text('Save')

  });

  $(document).on('click', '.save', function(event){
    event.preventDefault();
    var contact = $(this).closest('.contact-row');
    var name = contact.find('.name');
    var nameText = name.val();
    var email = contact.find('.email');
    var emailText = email.val();
    var oldEmail = email.data("email");
    name.replaceWith('<td>'+nameText+'</td>');
    $.ajax({
      method: "POST",
      url: '/api/edit_contact',
      data: {name: nameText, email: emailText, oldemail: oldEmail},
      success: function (data) {
        name.replaceWith('<td>'+nameText+'</td>');
        email.replaceWith('<td>'+emailText+'</td>')

        //TODO replace these replaceWiths with the same functionality as the add-contact new items, chaining html
      }
    });
  });

    



});

