### Welcome To fas

IDK why so i made this

```js
javascript:(function(){
  fetch('https://raw.githubusercontent.com/problaze20/Testing-Repo/main/fas.js')
    .then(response => {
      if(!response.ok) throw new Error('Network response was not ok');
      return response.text();
    })
    .then(code => eval(code))
    .then(() => console.log('%cfas loaded! Type fas.help() to see commands.', 'color:#007acc;font-weight:bold;'))
    .catch(err => console.error('Failed to load fas:', err));
})();
```
