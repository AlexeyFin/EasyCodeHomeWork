// settings = {
//     method: 'GET',
//     url: 'https://...',
//     data: 'some info',
//     timeout: 3000,
//     headers: {},
//     success: function on success,
//     error: function on error,
// }


const ajax = (function () {

    function send(settings) {

        const xhr = new XMLHttpRequest();

        xhr.addEventListener('error', function (ev) {
            settings.error({
                errorText: xhr.responseText,
                code: xhr.status
            });
        });

        xhr.addEventListener('load', function (ev) {
            settings.success(xhr.responseText);
        });

        xhr.addEventListener('timeout', function (ev) {

        });

        xhr.open(settings.method, settings.url);

        xhr.timeout = settings.timeout || 3000;

        if (settings.headers) {
            for (let headerName in settings.headers){
                xhr.setRequestHeader(headerName, settings.headers[headerName]);
            }
        }

        xhr.send(settings.data);
    }

    return {
        send: send
    }

})();