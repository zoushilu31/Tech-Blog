async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  const notFound = document.querySelector('#not-found');

  // Loop Through Usernames and if one does not match notify user
  if (username && password) {
      const response = await fetch('/api/users/login', {
          method: 'post',
          body: JSON.stringify({
              username,
              password
          }),
          headers: { 'Content-Type': 'application/json' }
      });
      if(response.ok) {
          document.location.replace('/dashboard');
      } else {
          const getUsers = await fetch('/api/users').then(
              function(response) {
                  response.json().then(function(data) {
                      for (let i = 0; i < data.length; i++) {
                          if(username != data[i].username) {
                              notFound.classList.remove('hide');
                              return;
                          } else {
                              console.log('you are now logged in!')
                          }
                      }
                  })
              }
          );
      }
  }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);