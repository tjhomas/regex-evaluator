$(document).ready(function () {
  $("#examplesButton").click(function () {
    $("#textPattern").val("^.*(m | [tn]|b).*$");
    $("#textInput").val(
      "------- ST Movies -------\nThe Motion Picture\nThe Wrath of Khan\nThe Search For Spock\nThe Voyage Home\nThe Final Frontier\nThe Undiscovered Country \nGenerations\nFirst Contact\nInsurrection\nNemesis \nInto Darkness\n------- SW Movies -------\nThe Phantom Menace\nAttack of the Clones\nRevenge of the Sith\nA New Hope\nThe Empire Strikes Back\nReturn of the Jedi"
    );
    runRegEx();
  });

  $("#hintsButton").click(function () {
    $("#hints").slideToggle(250);
  });

  $(".button").on("mouseover mouseout", function () {
    $(this).toggleClass("activeButton");
  });

  $("#textInput")
    .focus()
    .keyup(function () {
      if ($(this).val()) runRegEx();
      else $(".itemright").hide();
    });

  $("#textPattern").keyup(function () {
    $(this).removeClass("warning");
    if ($("#textInput").val()) runRegEx();
  });

  $(".checkboxes")
    .prop("checked", true)
    .click(function () {
      runRegEx();
    });
  if ($("#textInput").val()) runRegEx();
  else $(".itemright").hide();

  $("#container").hide().fadeIn(200);
});
function getOptions() {
  var options = $("#checkGlobal").is(":checked") == true ? "g" : "";
  return $("#checkIC").is(":checked") == true ? options + "i" : options;
}
function getInputArray(text) {
  return text.replace(/<\/?span.*?>/g, "*removed content*").split("\n");
}
function runRegEx() {
  if (!$("#textPattern").val()) {
    buildTable();
  }
  try {
    var options = getOptions();
    var global = options.match(/g/) ? true : false;
    var limitReached = false;
    var inputText = getInputArray($("#textInput").val());
    var pattern = new RegExp($("#textPattern").val(), options);
    var results = [];
    for (i = 0; i < inputText.length; i++)
      if (inputText[i])
        results[i] = inputText[i]
          .replace(pattern, function (s) {
            if (s != "") {
              if (!limitReached) s = "<span class='highlight'>" + s + "</span>";
              if (!global) limitReached = true;
            }
            return s;
          })
          .replace(/<(?!\/?span)/g, "&lt;");
    buildTable(results);
  } catch (err) {
    $("#textPattern").addClass("warning");
  }
}
function buildTable(r) {
  var table = "<table>";
  if (typeof r != "undefined" && r != null && r.length > 0) t = r;
  else t = getInputArray($("#textInput").val().replace(/</g, "&lt;"));
  for (i = 0; i < t.length; i++) {
    if (!t[i]) t[i] = ""; //allow empty lines
    table += "<tr><td class='lineCount'>" + i + "</td><td>" + t[i] + "</td></tr>";
  }
  $("#regExResults").html((table += "</table>"));
  $(".itemright").show();
}
