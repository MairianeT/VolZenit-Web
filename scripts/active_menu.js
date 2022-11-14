try {
    const pathname = document.location.pathname
    var res = pathname.split('/').pop();
    const navItem = document.querySelector(`[href="${res}"]`)
    navItem.classList.add("act")
}
catch (e) {}
