const form = document.querySelector('#comment-form');
const message = document.querySelector('#your-message');
const author = document.querySelector('#your-name');
const button = document.querySelector('#refresh');


form.addEventListener('submit', (event) => {
  event.preventDefault();
  fetch("https://wagon-chat.herokuapp.com/549/messages", {
    method: "POST",
    body: JSON.stringify({
      author: author.value,
      content: message.value
    })
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    });
});

button.addEventListener('click', (event) => {
  window.location.reload();
});


fetch(`https://wagon-chat.herokuapp.com/549/messages`)
  .then(respose => respose.json())
  .then((data) => {
    // console.log(data.messages[2].author);
    data.messages.forEach((element) => {
      const createdAt = new Date(element.updated_at);
      const currentTime = new Date();
      const minutesAgo = (Math.round((currentTime - createdAt) / 60000));
      const messagePost = document.querySelector('.list-unstyled');
      messagePost.insertAdjacentHTML('beforeend', `<li>${element.content} <br>(posted <span class="date">${minutesAgo} minutes ago</span>) by ${element.author}</li>`);
    });
  });