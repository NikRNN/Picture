const drop = () => {
  const fileInputs = document.querySelectorAll('[name="upload"]');

  ["dragenter", "draleave", "dragover", "drop"].forEach((eventName) => {
    fileInputs.forEach((item) => {
      item.addEventListener(eventName, preventDefaults, false);
    });
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function highlight(input) {
    input.closest(".file_upload").style.border = "3px solid lightgrey";
    input.closest(".file_upload").style.backgroundColor = "darkgrey";
  }

  function highlightOff(input) {
    input.closest(".file_upload").style.border = "none";

    if (input.closest(".calc_form")) {
      input.closest(".file_upload").style.backgroundColor = "#fff";
    } else {
      input.closest(".file_upload").style.backgroundColor = "#ededed";
    }
  }

  ["dragenter", "dragover"].forEach((eventName) => {
    fileInputs.forEach((item) => {
      item.addEventListener(
        eventName,
        () => {
          highlight(item);
        },
        false
      );
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    fileInputs.forEach((item) => {
      item.addEventListener(
        eventName,
        () => {
          highlightOff(item);
        },
        false
      );
    });
  });

  fileInputs.forEach((item) => {
    item.addEventListener("drop", (e) => {
      item.files = e.dataTransfer.files;

      let dots;

      const arr = item.files[0].name.split(".");

      arr[0].length > 6 ? (dots = "...") : (dors = ".");

      const name = arr[0].substring(1, 6) + dots + arr[1];

      item.previousElementSibling.textContent = name;
    });
  });
};

export default drop;
