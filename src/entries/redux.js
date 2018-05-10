const $form = document.getElementById('form')
$form.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
  e.preventDefault()
  const data = new FormData($form)
  const title = data.get('title')
  console.log(title)
}