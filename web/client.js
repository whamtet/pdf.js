const $ = x => document.querySelector(x);
const $$ = x => document.querySelectorAll(x);
const $id = x => document.getElementById(x);

const f = async () => {
  const [_, question_id] = location.href.split('=');
  const response = await fetch(`http://localhost:3000/api/question/${question_id}`);

  const {question} = await response.json();
  $id('question-title').innerHTML = question;
}

f();
