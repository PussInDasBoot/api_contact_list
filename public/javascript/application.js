$(function () {

  var Templates = {}

  function init(){
    // Contains the template as a string
  var contactTemplateHTML = $('#contact-template').html();
  // The template function for producing HTML
  Templates.contact = Handlebars.compile(contactTemplateHTML);
  }

  init();


  var contactList = $('#contact-list').find('tbody');

  function getContacts(){
    $.ajax({
      url: '/api/contacts',
      method: 'GET',
      success: function(data){
        // console.log(data);
        data.forEach(function(contact) {
          var contactHTML = Templates.contact({contact: contact});
          contactList.append(contactHTML)
        });
      }
    });
  }

  getContacts();

  $('#new_contact').on('submit', function (event) {
    event.preventDefault();

    var form = $(this);

    $.ajax({
      method: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize(),
      success: function (data) {
        var contactHTML = Templates.contact({contact: data});
        contactList.append(contactHTML);
        form.trigger("reset");

          // TODO maybe empty fields?

      }
    });

  });

  $(document).on('click', '.delete', function (event) {
    event.preventDefault();
    var form = $(this).closest('.delete_contact');
    console.log(form);
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

