$(function () {

  $('#new_contact').on('submit', function (event) {
    event.preventDefault();

    var form = $(this);

    $.ajax({
      method: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize(),
      success: function (data) {
        // find the nut list
        var contactList = $('.table').find($('tbody'));
        // add a new list item to it
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
            .append($('<button>').attr("name", "<%=id%>").addClass('delete').text('Delete'))
          ).appendTo(contactList);
      }
    });

  });



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

