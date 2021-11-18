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
      <h5 class="header-person"><i class="far fa-meh fa-3x"></i>${object.user.name}</h5>
      <h3>${object.user.handle}</h3>
    </header>
      <div name="text" class="old-tweet-text">${object.content.text}</div>
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
  if (num >= 0 && num !== 140) {
    let data = $(this).serialize();
    $.post('/tweets', data).then(loadTweets())
  } else if (num === 140) {
    alert('Field cannot be left blank.');
  } else {
    alert('Field has too many characters.');
  }
});

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' })
  .then(function(JSON) {
    renderTweets(JSON);
  });
};



