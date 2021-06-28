"use strict";

$("#modal-1").fireModal({ body: "Modal body text goes here." });
$("#modal-2").fireModal({ body: "Modal body text goes here.", center: true });

let modal_3_body =
  '<p>Object to create a button on the modal.</p><pre class="language-javascript"><code>';
modal_3_body += "[\n";
modal_3_body += " {\n";
modal_3_body += "   text: 'Login',\n";
modal_3_body += "   submit: true,\n";
modal_3_body += "   class: 'btn btn-primary btn-shadow',\n";
modal_3_body += "   handler: function(modal) {\n";
modal_3_body += "     alert('Hello, you clicked me!');\n";
modal_3_body += "   }\n";
modal_3_body += " }\n";
modal_3_body += "]";
modal_3_body += "</code></pre>";
$("#modal-3").fireModal({
  title: "Modal with Buttons",
  body: modal_3_body,
  buttons: [
    {
      text: "Click, me!",
      class: "btn btn-primary btn-shadow",
      handler: function (modal) {
        alert("Hello, you clicked me!");
      },
    },
  ],
});

$("#modal-4").fireModal({
  footerClass: "bg-whitesmoke",
  body: "Add the <code>bg-whitesmoke</code> class to the <code>footerClass</code> option.",
  buttons: [
    {
      text: "No Action!",
      class: "btn btn-primary btn-shadow",
      handler: function (modal) {},
    },
  ],
});

$("#modal-5").fireModal({
  title: "Send Whastapp",
  body: $("#modal-send-wa"),
  footerClass: "bg-whitesmoke",
  autoFocus: false,
  onFormSubmit: function (modal, e, form) {
    var datastring = $(e.target).serialize();
    $.ajax({
      type: "POST",
      url: "/send-message",
      data: datastring,
      dataType: "json",
      success: function (data) {
        form.stopProgress();
        modal.find(".modal-body").prepend(
          `<div class="alert alert-success alert-dismissible show fade">
            <div class="alert-body">
              <button class="close" data-dismiss="alert">
                <span>&times;</span>
              </button>
              Berhasil mengirim whtasapp.
            </div>
          </div>`
        );
      },
      error: function () {
        form.stopProgress();
        modal.find(".modal-body").prepend(
          `<div class="alert alert-danger alert-dismissible show fade">
            <div class="alert-body">
              <button class="close" data-dismiss="alert">
                <span>&times;</span>
              </button>
              Gagal mengirim whtasapp.
            </div>
          </div>`
        );
      },
    });
    e.preventDefault();
  },
  shown: function (modal, form) {
    console.log(form);
  },
  buttons: [
    {
      text: "Kirim",
      submit: true,
      class: "btn btn-primary btn-shadow",
      handler: function (modal) {},
    },
  ],
});

$("#modal-6").fireModal({
  body: "<p>Now you can see something on the left side of the footer.</p>",
  created: function (modal) {
    modal
      .find(".modal-footer")
      .prepend('<div class="mr-auto"><a href="#">I\'m a hyperlink!</a></div>');
  },
  buttons: [
    {
      text: "No Action",
      submit: true,
      class: "btn btn-primary btn-shadow",
      handler: function (modal) {},
    },
  ],
});

$(".oh-my-modal").fireModal({
  title: "My Modal",
  body: "This is cool plugin!",
});
