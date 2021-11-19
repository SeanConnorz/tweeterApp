const renderTweets = (object) => {
  let HTML = '';
  for (let item of object) {
    HTML = createTweetElement(item);
  }
  $('#tweets-container').prepend(HTML);
}

const createTweetElement = (object) => {
  let $tweet =  `
  <article class="old-tweet">
    <header class="old-tweet-header">
      <i class="far fa-meh fa-3x"></i>
      <h5 class="header-person">${object.user.name}</h5>
      <h3>${object.user.handle}</h3>
    </header>
      <div name="text" class="old-tweet-text">${escape(object.content.text)}</div>
    <footer class="old-tweet-footer">
      <h5>${timeago.format(object.created_at)}</h5>
      <ul>
        <i class="old fas fa-flag"></i>
        <i class="old fas fa-share"></i>  
        <i class="old fas fa-heart"></i>
      </ul>
    </footer>
  </article>
  `;
  return $tweet;
};

$("#tweet-btn").on("submit", function(event) {
  event.preventDefault();
  $('.error').css('display', 'none');
  if (num >= 0 && num !== 140) {
    const data = $(this).serialize();
    $.post('/tweets', data, () => loadTweets());
  } else if (num === 140) {
    $(".tweet-form").append(`<label class="tweet-form error">Field cannot be left blank!</label>`);
  } else {
    $(".tweet-form").append(`<label class="tweet-form error">Field has too many characters!</label>`);
  }
});

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' })
  .then(function(JSON) {
    renderTweets(JSON);
  });
};

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$('.compose').on('click', () => {
    $('.new-tweet').css('display', 'flex');
})

$('.error').css('display', 'none');


