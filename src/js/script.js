const input = document.querySelector('.form__search')
const err = document.querySelector('.form__err')
const form = document.querySelector('.form')
const list = document.querySelector('.list')

const createRepo = (data) => {
    const repo = document.createElement('a')
    repo.setAttribute('href', data.svn_url)
    repo.setAttribute('target', '_blank')
    repo.classList.add('repo')

    const desc = data.description === null ? 'Описание отсутствует' : data.description

    repo.innerHTML = `
        <div class='repo__autor'>
            <div class='repo__avatar'>
                <img src=${data.owner.avatar_url} alt=${data.owner.login} />
            </div>
            <div class="repo__name">${data.owner.login}</div>
        </div>
        
        <div class="repo__text">
        <p>${desc}</p>
        <div class='repo__row'>
        <div>
        <span>★</span> ${data.stargazers_count}
        </div>
            <span class='repo__title' >${data.name}</span> 
            <span >${data.created_at}</span>
        </div>
        </div>
    `
    return repo
}

const handleSubmit = async e => {
    e.preventDefault()
    list.innerHTML = ''
    const formValue = input.value

    if (formValue.length < 3) {
        input.classList.add('red')
        err.classList.add('show')
    } else {
        input.classList.remove('red')
        err.classList.remove('show')
    }

    const res = await fetch(`https://api.github.com/search/repositories?q=${formValue}`)

    if (res.ok) {
        const data = await res.json()

        if (data.items.length) {
            data.items.slice(0, 10).map(repo => list.appendChild(createRepo(repo)));
        } else {
            const notFound = document.createElement('div')
            notFound.classList.add('not-found')
            notFound.textContent = 'Ничего не найдено'
            list.appendChild(notFound)
        }

    }
    input.value = ''
}

form.addEventListener('submit', handleSubmit)