/* Hover effects */
$(".switchTab").hover(
  /* hover in */
  function () {
    $(this).css({ "background-color": "#7b9cad" });
  },
  /* hover out */
  function () {
    $(this).css("background-color", "#3b444b");
  }
);

/* Active Tabs */
$(".switchTab").click(function () {
  $(this).toggleClass("active");

  /* get id to activate specific Screen */
  var getIdAndConcatenate = $(this).attr("id") + "Screen";
  /* display hide sections */
  $("#" + getIdAndConcatenate).toggleClass("hidden");

  /* On each click, we need to re-adjust the screen's width */

  var activeScreenNumber = 4 - $(".hidden").length;

  $(".screen").width($(window).width() / activeScreenNumber - 2);
});

/* Modify text area's dimensions */
$(".screen").height($(window).height() - $("#navBar").height());

/* DISPLAY OUTPUTS */

function updateContent() {
  $("iframe")
    .contents()
    .find("html")
    .html(
      "<html><head><style type='text/css'>" +
        editor_css.getValue() +
        "</style></head><body>" +
        editor.getValue() +
        "</body></html>"
    );

  document
    .getElementById("outputScreen")
    .contentWindow.eval(editor_js.getValue());
}

$(".screen").on("change keyup paste", function () {
  updateContent();
});

/*--------------------- Ace Editor methods: --------------------*/
function ready() {
  setUpEditor();
  update();
  updateContent();
}

function setUpEditor() {
  /* set editor as a global  */

  /*------------------------------------------------------FOR  HTML---------------------------------------------------- */
  window.editor = ace.edit("htmlScreen");
  /* change themes here: */
  editor.setTheme("ace/theme/tomorrow_night");
  editor.getSession().setMode("ace/mode/html");
  editor.setValue(
    `<!DOCTYPE html>
<html>
<head>
</head>

<body>
   <h1> Welcome to Live WebDev Editor! </h1>
</body>

</html>`,
    1
  );

  editor.getSession().on("change", function () {
    update();
  });

  /* focus cursor on a position */
  editor.focus();

  editor.setOptions({
    fontSize: "16pt",
    showGutter: false,
    vScrollBarAlwaysVisible: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: false,
    autoScrollEditorIntoView: true,
    vScrollBarAlwaysVisible: false,
    enableLiveAutocompletion: true,
    enableSnippets: true,
  });

  editor.setShowPrintMargin(false);
  editor.setBehavioursEnabled(false);

  /*------------------------------------------------------- CSS------------------------------------------------- */
  window.editor_css = ace.edit("cssScreen");
  /* change themes here: */
  editor_css.setTheme("ace/theme/tomorrow_night");
  editor_css.getSession().setMode("ace/mode/css");

  editor_css.getSession().on("change", function () {
    update();
  });

  editor_css.setValue(
    `*{
     background-color: red;
    }`,
    1
  );

  editor_css.setOptions({
    fontSize: "16pt",
    showLineNumbers: false,
    showGutter: false,
    vScrollBarAlwaysVisible: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: false,
    autoScrollEditorIntoView: true,
    vScrollBarAlwaysVisible: false,
    enableLiveAutocompletion: true,
    enableSnippets: true,
  });

  /* ---------------------------------------------JavaScript----------------------------------------------- */
  window.editor_js = ace.edit("jsScreen");
  /* change themes here: */
  editor_js.setTheme("ace/theme/tomorrow_night");
  editor_js.getSession().setMode("ace/mode/javascript");

  editor_js.getSession().on("change", function () {
    update();
  });

  editor_js.setOptions({
    fontSize: "10.5pt",
    showLineNumbers: false,
    showGutter: false,
    vScrollBarAlwaysVisible: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: false,
    autoScrollEditorIntoView: true,
    vScrollBarAlwaysVisible: false,
    enableLiveAutocompletion: true,
    enableSnippets: true,
  });
}

function update() {
  var obj = document.getElementById("outputScreen").contentWindow.document;
}
