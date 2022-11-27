(() => {
    const startTime = performance.timing;

    window.addEventListener('load', () => {
        const loadTime = document.getElementById('timestamp')
        loadTime.innerHTML += `Время загрузки - ${(startTime.loadEventStart - startTime.navigationStart) / 1000} с`;
    });
})();