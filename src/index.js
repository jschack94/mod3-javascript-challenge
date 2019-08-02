document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2810 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/2810`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const body = document.body

  const getImage = () => {
    fetch(imageURL)
      .then(response => response.json())
      .then(result => buildPage(result))
      .catch(error => console.error(error.message))
  }

  getImage()

  function buildPage(result) {
    // append image source
    let img = document.getElementById('image')
    img.src = result.url

    // set image title as page title
    let name = document.getElementById('name')
    name.innerText = result.name

    // display likes on frontend from backend
    const likeButton = document.getElementById('like_button')
    let likes = document.getElementById('likes')
    likes.innerText = result.like_count

    // add like, append front end and post to backend
    likeButton.addEventListener('click', function () {
      currentLikes = parseInt(likes.innerText)
      likes.innerText = currentLikes + 1
      //  backend post like to API
      var data = {
        image_id: imageId,
        image_likes: likes
      }
      fetch(likeURL, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
    })

    // display comments from backend on webpage
    const commentForm = document.getElementById('comment_form')
    if (result.comments.length >= 1) {
      result.comments.forEach(function (text) {
        docCommentList = document.getElementById("comments")
        docCommentLi = document.createElement('li')
        docCommentLi.innerText = text.content
        docCommentList.append(docCommentLi)
      })
    }

    // create a new comment append it to body and post it to backend
    commentForm.addEventListener('submit', function (e) {
      e.preventDefault()
      commentInput = document.querySelector("input")
      commentList = document.getElementById("comments")
      commentLi = document.createElement('li')
      text = commentInput.value
      commentLi.innerText = text
      commentList.append(commentLi)
      // backend post comment to API
      var data = {
        image_id: imageId,
        content: text
      }
      fetch(commentsURL, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
    })

  }
})
