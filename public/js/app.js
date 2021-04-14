console.log("Client Side javascript loading");

//data is object we reseved from the link

const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messagetwo = document.querySelector("#message-2");

const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", (e) => {
  const location = search.value;
  e.preventDefault();
  messageOne.textContent = "LOADING...";
  messagetwo.textContent = " ";
  console.log("User Entered " + location);
  console.log("submited");
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          messageOne.textContent = data.error;
          messageTwo.textContent = " ";
        } else {
          console.log(data.location);
          console.log(data.forecast);
          messageOne.textContent = data.location;
          messagetwo.textContent = data.forecast;
        }
      });
    }
  );
});
