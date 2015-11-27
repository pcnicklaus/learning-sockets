$(document).ready(function() {

  var socket = io.connect('localhost:1223');
  $('#chat').hide();
  $('#name').focus();
  $('#form').submit(function (event) {
    event.preventDefault();
  });

  $('#join').click(function () {
    var name = $('#name').val();
    if (name != '') {
      socket.emit('join', name);
      $('#login').detach();
      $('#chat').show();
      $('#msg').focus();
      ready = true;
    }
  });

  $('#name').keypress(function (event) {
    if (event.which == 13) {
      var name = $('#name').val();
      if (name != '') {
        socket.emit('join', name) ;
        ready = true;
        $('#login').detach();
        $('#chat').show();
        $('#msg').focus();
      }
    }
  });

  socket.on('update', function (show) {
    if (ready) {
      $('$msgs').append(' ' + msg + ' ');
    }
  });

  socket.on('update-people', function (people) {
    if (ready) {
      $('#people').empty();
      $.each(people, function (clientid, name) {
        $('#people').append(' ' + name + ' ');
      });
    }
  });

  socket.on('disconnect', function () {
    $('#msgs').append('The server is not available');
    $('#msg').attr('disabled', 'disabled');
    $('#send').attr('disabled', 'disabled');
  });

  socket.on("chat", function(who, msg){
    $("#msgs").append("<li><strong><span class='text-success'>" + who + "</span></strong> says: " + msg + "</li>");
  });

  $('#send').click(function () {
      var msg = $('#msg').val();
      socket.emit('send', msg);
      $('#msg').val('');
    });

  $('#msg').keypress(function (event) {
    if (event.which == 13) {
      var msg = $('#msg').val();
      socket.emit('send', msg);
      $('#msg').val('');
    }
  });


});
