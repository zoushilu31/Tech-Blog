function navCreatePost(event) {
  event.preventDefault();

  document.location.replace('/dashboard/createPost')
}

document.querySelector('.create-post').addEventListener('click', navCreatePost);