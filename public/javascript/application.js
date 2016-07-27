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

  $(document).on('click', '.name, .email', function (event) {
    $(this).closest('.contact-row').find('.save').css('visibility', 'visible');
  });

  $(document).on('click', '.save', function(event){
    event.preventDefault();
    var contact = $(this).closest('.contact-row');
    contactId = contact.data("id");
    var name = contact.find('.name');
    var nameText = name.text();
    var email = contact.find('.email');
    var emailText = email.text();
    $.ajax({
      method: "POST",
      url: '/api/edit_contact',
      data: {name: nameText, email: emailText, contactid: contactId},
      success: function (data) {
        var contactHTML = Templates.contact({contact: data});
        contact.replaceWith(contactHTML);
        contact.find('.save').css('visibility', 'hidden');

        //TODO replace these replaceWiths with the same functionality as the add-contact new items, chaining html
      }
    });
  });



});

