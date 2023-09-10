const $form = document.getElementById('searchForm')

if ($form instanceof HTMLFormElement){
  function formHandler(e : Event) {
    e.preventDefault()
    // Obtener los valores de los campos del formulario
    const $values = new FormData($form as HTMLFormElement)
    // Obtener el valor de búsqueda
    const query = $values.get('searchValue') as string
    const queryRegexp = new RegExp(query.trim(),'i')
    // Si no hay búsqueda, mostrar todos los usuarios
    if (!query) {
      const $hiddenUsers = document.querySelectorAll('hide_user')
      $hiddenUsers.forEach($card => $card.classList.remove('hide_user'))
    }
    // Obtener todos las tarjetas de usuario
    const $$allUsers = document.querySelectorAll('jl-opencard')
    // Esconder los usuarios que no cumplan con la búsqeda y mostrar los que sí
    $$allUsers.forEach($card => {
        const userName = $card.getAttribute('data-name') as string
        if (!queryRegexp.test(userName)) $card.classList.add('hide_user')
        else $card.classList.remove('hide_user')
    })
  }
  $form.addEventListener('submit',formHandler)
}