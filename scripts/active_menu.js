try {
    const pathname = document.location.pathname
    const navItem = document.querySelector(`[data-nav="${pathname}"]`)
    navItem.classList.add("act")
}
catch (e) {}
