var appNames = [];
var selectedAppNames = [];

$(document).ready(function () {
  readStreamingApp();
  getSelectedCheckbox();
  resetFields();

  $("#search").on("keyup", function (e) {
    suggestionStreamingApp(e.target.value);
  });

  $("#searchButton").on("click", function (e) {
    searchStreamingApp($("#search").val());
  });
  $("#modalClose").on("click", function (e) {
    appModalHide();
    resetFields();
  });

  $("#clearButton").on("click", function (e) {
    $("#search").val("");
    readStreamingApp();
    $("#suggestion").html("");
  });

  $("#create").on("click", function () {
    getAppNames();
    $("#appName").prop({readOnly: false});
    resetFields();
    changeModalState("Add");
    validate();
  });

  $("#modalButton").on("click", function (e) {
    e.preventDefault();
    $("#modalButton").prop("disabled", true);
    createEditStreamingApps();
  });

  $("#otherContent").on("keyup", function (e) {
    $("#others").val($("#otherContent").val());
    getTypeOfContent();
  });

$("#zoomInImage").click(function() {
  $("#zoomableImage").animate({
    height: "+=200px",
    width: "+=200px"
  }, 300);
});

$("#zoomOutImage").click(function() {
  $("#zoomableImage").animate({
    height: "-=200px",
    width: "-=200px"
  }, 300);
});

$("#closeImage").on("click", function(e) {
  zoomState = "zoom-out";
  $(".imageModal").fadeOut(300);
  $("#modalBackdrop").css("display", "none");
  $("body").css("overflow", "auto");
  $("#zoomableImage").animate({
    height: "500px",
    width: "500px"
  }, 300);
});

var zoomState = "zoom-out";
$("#zoomableImage").on("dblclick", function(e) {
  if(zoomState == "zoom-out") {
    $("#zoomableImage").animate({
      height: "1000px",
      width: "1000px"
    }, 300);
    zoomState = "zoom-in";
  } else if(zoomState == "zoom-in") {
    $("#zoomableImage").animate({
      height: "500px",
      width: "500px"
    }, 300);
    zoomState = "zoom-out";
  }
});
  
$("#backToTop").click(function () {
  $("html, body").animate({scrollTop: 0}, 1000);
});

  $(window).scroll(function() {
    var scroll = $(this).scrollTop();
    if (scroll < 300) {
      $("#backToTop").css({
        visibility: "hidden",
        opacity: "0"
      });
    } else {
      $("#backToTop").css({
        visibility: "visible",
        opacity: "1"
      });
    }
  });
 
});

function readStreamingApp() {
  document.getElementById("clearButton").style.display = "none";
  $("#suggestion").slideUp(300);

  http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      document.getElementById("streamingAppList").innerHTML = http.responseText;
      $("#streamingAppList").sortable();
   
      var animation = document.querySelectorAll(".anim");
      var animationIntersection = new IntersectionObserver(function(i){
      i.forEach(function(j){
          if(j.intersectionRatio >0) {
             $(j.target).hide().fadeIn(600);
             animationIntersection.unobserve(j.target);
          } else {
              j.target.style.animation = `none `; 
          }
      });
      });
      animation.forEach (function(animations){
          animationIntersection.observe(animations);
      });
    } else {
      document.getElementById("streamingAppList").innerHTML =
        "<i class='fas fa-spinner fa-spin fa-2xl' ></i>";
    }
  };
  http.open("GET", `process/readProcess.php`, true);
  http.send();
}

function createEditStreamingApps() {
  var formData = new FormData(document.getElementById("modalForm"));
  http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      document.getElementById("message").innerHTML = http.responseText;
      createToast(http.responseText, "success");
      resetFields();
      readStreamingApp();
      appModalHide();
    } else {
      document.getElementById("message").innerHTML = http.responseText;
    }
  };

  if (document.getElementById("modalButton").value == "Add") {
    http.open("POST", "process/createProcess.php", true);
  } else {
    http.open("POST", "process/updateProcess.php", true);
  }
  http.send(formData);
}

function resetFields() {
  $("#message").html("");
  $("#appName").val("");
  $("#basePlan").val("");
  $("#launchDate").val("");
  $("#platforms").val("");
  $("#typeOfContents").val("");
  $("#picture").val("");
  $("#otherContent").val("");
  $("#editPicture").val("");

  $("#appNameMessage").html("").fadeOut(300);
  $("#basePlanMessage").html("").fadeOut(300);
  $("#launchDateMessage").html("").fadeOut(300);
  $("#pictureMessage").html("").fadeOut(300);
  $("#platformsMessage").html("").fadeOut(300);
  $("#typeOfContentsMessage").html("").fadeOut(300);
  $(
    `#appName, #basePlan, #launchDate, #platforms, #typeOfContents, #picture, #image_container`
  ).animate({borderColor: "black"},300);

  $("#pictureDisplay").attr("src", "img/white.jpg");
  $("#pictureText").css("opacity", "1");
  $("#otherContent").css("opacity", "0");
  $("#appName").prop({readOnly: false});
  $("#appName").css({pointerEvents: "auto"});
  $(".modal").scrollTop(0);

  $('input[type="checkbox"]').prop("checked", false);
}

function deleteStreamingApp(toDelete) {
  if (confirm(`Do you really want to delete ${toDelete}?`)) {
    http = new XMLHttpRequest();
    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        createToast(http.responseText, "success");
        readStreamingApp();
      }
    };
    http.open("GET", `process/deleteProcess.php?d=${toDelete}`, true);
    http.send();
  }
}

/* function deleteSelectedStreamingApp(toDelete) {
  if (confirm(`Do you really want to delete all the selected items?`)) {
    http = new XMLHttpRequest();
    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        createToast(http.responseText, "success");
        readStreamingApp();
      }
    };
    http.open("GET", `process/deleteSelectedProcess.php?d=${toDelete}`, true);
    http.send();
  }
} */

function searchStreamingApp(toSearch) {
  const suggestionBox = document.getElementById("suggestion");
  if (toSearch.length == 0) {
    document.getElementById("suggestion").innerHTML = "";
    createToast("Please provide the name of a streaming app", "error");
  } else {
    $("#suggestion").slideUp(300);
    http = new XMLHttpRequest();
    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        document.getElementById("suggestion").innerHTML = "";
        document.getElementById("streamingAppList").innerHTML =
          http.responseText;
      } else {
        document.getElementById("streamingAppList").innerHTML =
          "<i class='fas fa-spinner fa-spin'></i>";
      }
    };
    http.open("GET", `process/searchProcess.php?q=${toSearch}`, true);
    http.send();
  }
}

function suggestionStreamingApp(toSearch) {
  if (toSearch.length == 0) {
    $("#suggestion").slideUp(300);
    document.getElementById("suggestion").innerHTML = "";
    readStreamingApp();
  } else {
    document.getElementById("clearButton").style.display = "block";
http = new XMLHttpRequest();
http.onreadystatechange = function () {
  if (http.readyState == 4 && http.status == 200) {
    document.getElementById("suggestion").innerHTML = http.responseText;
    $("#suggestion").slideDown(300);
      } else {
        document.getElementById("suggestion").innerHTML =
          "<i class='fas fa-spinner fa-spin' style ='top:15px; left:15px; position:relative'></i>";
      }
    };
    http.open("GET", "process/suggestionProcess.php?q=" + toSearch, true);
    http.send();
  }
}

function getToEditStreamingApp(toGet) {
  {
    http = new XMLHttpRequest();
    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        var otherTypeOfContent = [];
        var listedTypeOfContent = [];
        xmlDocument = http.responseXML;
        streamingApps = xmlDocument.getElementsByTagName("streamingApp");
        for (streamingApp of streamingApps) {
          var appName = streamingApp.childNodes[1].childNodes[0].nodeValue;
          if (appName.toLowerCase() == toGet.toLowerCase()) {
            resetFields();
            appModalShow();
            document.getElementById("appName").value = appName;
            document.getElementById("basePlan").value =
              streamingApp.childNodes[3].childNodes[0].nodeValue;
            document.getElementById("launchDate").value =
              streamingApp.childNodes[5].childNodes[0].nodeValue;
            document.getElementById("editPicture").value =
              streamingApp.childNodes[11].childNodes[0].nodeValue;
            document.getElementById(
              "pictureDisplay"
            ).src = `data:image;base64,${streamingApp.childNodes[11].childNodes[0].nodeValue}`;
            document.getElementById("pictureText").style.opacity = "0";
            var platforms = streamingApp.childNodes[7].childNodes[0].nodeValue;
            var typeOfContents =
              streamingApp.childNodes[9].childNodes[0].nodeValue;
            document.getElementById("platforms").value = platforms;
            var platformsArray = platforms.split(", ");
            var typeOfContentsArray = typeOfContents.split(", ");

            for (platform of platformsArray) {
              document.getElementById(
                `${_.camelCase(platform)}`
              ).checked = true;
            }

            for (typeOfContent of typeOfContentsArray) {
        
              if (document.getElementById(`${_.camelCase(typeOfContent)}`)) {
                document.getElementById(
                  `${_.camelCase(typeOfContent)}`
                ).checked = true;
                listedTypeOfContent.push(typeOfContent);
              } else {
                otherTypeOfContent.push(typeOfContent);
              }
            }

            if (otherTypeOfContent != "") {
              document.getElementById("otherContent").style.opacity = "1";
              document.getElementById("otherContent").value =
                otherTypeOfContent.join(", ");
              document.getElementById("others").checked = true;
              document.getElementById("otherContent").readOnly = false;
              document.getElementById("otherContent").style.pointerEvents =
                "auto";
            }
            document.getElementById(
              "typeOfContents"
            ).value = `${listedTypeOfContent.join(", ")}, ${
              document.getElementById("otherContent").value
            }`;

            document.getElementById("appName").readOnly = true;
            document.getElementById("appName").style.pointerEvents = "none";
            changeModalState("Edit");
            validate();
            break;
          } else {
          }
        }
      }
    };
    http.open("GET", "streamingApps.xml", true);
    http.send();
  }
}

function validate() {
  $("#appName").on("keyup blur", function () {
    validateInput(
      "appName",
      "appNameMessage",
      "This field is required",
      "unique"
    );
  });
  $("#basePlan").on("keyup blur", function () {
    validateInput(
      "basePlan",
      "basePlanMessage",
      "This field is required",
      "number"
    );
  });
  $("#launchDate").on("change blur", function () {
    validateInput(
      "launchDate",
      "launchDateMessage",
      "This field is required",
      "text"
    );
  });
  if ($("#editPicture").val().length == 0) {
    $("#picture").on("blur", function () {
      validateInput(
        "picture",
        "pictureMessage",
        "This field is required",
        "picture"
      );
    });
  }
  $("#picture").on("change", function (e) {
    $("#pictureDisplay").attr("src", URL.createObjectURL(e.target.files[0]));
    $("#pictureText").css("opacity", "0");
    validateInput(
      "picture",
      "pictureMessage",
      "This field is required",
      "picture"
    );
  });
}

function validateInput(input, element, message, type) {
  if ($(`#${input}`).val().length === 0) {

    $(`#${input}`).animate({borderColor: "red"},300);
      $(`#${element}`).html(message).fadeIn(300);
      if (type === "picture") {
        $(`#image_container`).animate({borderColor: "red"},300);
      }
  } else {
    $(`#${element}`).hide(300);
    $(`#${input}`).animate({borderColor: "black"},300);
    if (type === "number") {
      if (isNaN($(`#${input}`).val())) {
        $(`#${input}`).animate({borderColor: "red"},300);
        $(`#${element}`).html("Base plan must be a number").fadeIn(300);
      } 
    } else {
      $(`#${element}`).hide(300);
    }

    if (type === "picture") {
      var picture = $(`#${input}`).val();
      var dotIndex = picture.lastIndexOf(".") + 1;
      var fileType = picture.substr(dotIndex, picture.length).toLowerCase();

      if (fileType !== "jpg" && fileType !== "jpeg" && fileType !== "png") {
        $(`#${input}`).animate({borderColor: "red"},300);
        $(`#${element}`).html("Picture should be in .jpg, .jpeg, .png format").fadeIn(300);;
        $(`#${input}`).val("");
        $("#pictureDisplay").attr("src", "img/white.jpg");
        $("#pictureText").css("opacity", "1");
        $(`#image_container`).animate({borderColor: "red"},300);
      } else {

      $(`#${element}`).hide(300);
        var fileSize = $(`#${input}`)[0].files[0].size / 1024 / 1024;
        if (fileSize > 5) {
          $(`#${input}`).animate({borderColor: "red"},300);
          $(`#${element}`).html("Picture size should be less than 5MB.").fadeIn(300);;
          $(`#${input}`).val("");
          $("#pictureDisplay").attr("src", "img/white.jpg");
          $("#pictureText").css("opacity", "1");
          $(`#image_container`).animate({borderColor: "red"},300);
        } else {
            $(`#${element}`).hide(300);
        }
      }
    }

    if (type === "unique") {
      var inputAppName = $(`#${input}`).val();
      for (appName of appNames) {
        if (appName.toLowerCase() === inputAppName.toLowerCase()) {
          $(`#${input}`).animate({borderColor: "red"},300);
          $(`#${element}`).html(`${appName} already exists`).fadeIn(300);;
          break;
        } else {
            $(`#${element}`).hide(300);
        }
      }
    }
  }

  if (
    $("#appNameMessage").html().length !== 0 ||
    $("#appName").val().length === 0 ||
    $("#basePlan").val().length === 0 ||
    $("#launchDate").val().length === 0 ||
    $("#platforms").val().length === 0 ||
    ($("#typeOfContents").val().length === 0 &&
      $("#otherContent").val().length === 0) ||
    ($("#picture").val().length === 0 &&
      $("#editPicture").val().length === 0) ||
    isNaN($("#basePlan").val())
  ) {
    $("#modalButton").prop("disabled", true);
  } else {
    $("#modalButton").prop("disabled", false);
  }
}

function getAppNames() {
  http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      xmlDocument = http.responseXML;
      streamingApps = xmlDocument.getElementsByTagName("streamingApp");
      for (streamingApp of streamingApps) {
        var appName = streamingApp.childNodes[1].childNodes[0].nodeValue;
        appNames.push(appName);
      }
    }
  };
  http.open("GET", "streamingApps.xml", true);
  http.send();
}


function getSelectedCheckbox() {
  $("#others").on("change", function () {
    if ($("#otherContent").css("opacity") == 0) {
      $("#otherContent")
        .animate({
          opacity: 1,
        }).css({
          pointerEvents: "auto",
        })
        .prop({readOnly: false});
    } else {
      $("#otherContent")
        .animate({
          opacity: 0,
        }).css({
          pointerEvents: "none",
        })
        .prop({readOnly: true});
    }

    if (!$("#others").prop("checked")) {
      $("#otherContent").val("");
    }
  });

  $(".platform").on("change", function () {
    var selectedPlatform = [];
    $(".platform:checked").each(function () {
      selectedPlatform.push($(this).val());
    });

    $("#platforms").val(selectedPlatform.join(", "));

    validateInput(
      "platforms",
      "platformsMessage",
      "Select at least one checkbox",
      "text"
    );
  });

  $(".typeOfContent").on("change", function () {
    getTypeOfContent();
  });
}

function getTypeOfContent() {
  var selectedTypeOfContent = [];
  $(".typeOfContent:checked").each(function () {
    selectedTypeOfContent.push($(this).val());
  });

  $("#typeOfContents").val(selectedTypeOfContent.join(", "));

  validateInput(
    "typeOfContents",
    "typeOfContentsMessage",
    "Select at least one checkbox",
    "checkbox"
  );
}

function openImage(image) {
  console.log("Dsdas");
  var zoomableImage = $("#zoomableImage");
  zoomableImage.attr("src", image.src);
  $("#modalBackdrop").css("display", "flex");
  $("body").css("overflow", "hidden");
  $(".imageModal").fadeIn(300).css({
    display: "flex"
  });
}

function createToast(message, type) {
  var createToastDialog = document.createElement("div");
  var id = Math.random().toString(36).substr(2, 10);
  createToastDialog.setAttribute("id", id);
  createToastDialog.classList.add("toastDialog", type);
  createToastDialog.innerText = message;
  document.getElementById("toastList").appendChild(createToastDialog);

  var toastDialog = document
    .querySelector(".toastList")
    .getElementsByClassName("toastDialog");
    var toastClose = document.createElement("div");
  toastClose.classList.add("toastClose");
  toastClose.innerHTML = '<i class="fas fa-times"></i>';
  createToastDialog.appendChild(toastClose);

  toastClose.onclick = function (e) {
    createToastDialog.remove();
  };

  setTimeout(function () {
    for (var i = 0; i < toastDialog.length; i++) {
      if (toastDialog[i].getAttribute("id") == id) {
        $(`#${id}`).hide("slide", { direction: "left" }, 300, function () {
           $(toastDialog[i]).remove();
         });
        break;
      }
    }
  }, 5000);
}

function changeModalState(text) {
  document.getElementById("modalButton").value = text;
  appModalShow();
}

function closeModal() {
  resetFields();
}

function appModalShow() {
  $("#streamingAppModal").slideDown(300);
  $("#modalBackdrop").css("display", "flex");
		$("body").css("overflow", "hidden");
}

function appModalHide() {
  $("#streamingAppModal").slideUp(300);
  $("#modalBackdrop").css("display", "none");
		$("body").css("overflow", "auto");
}