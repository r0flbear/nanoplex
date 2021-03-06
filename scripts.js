(function () {
    "use strict";

    function getView(view, callback) {
        var xhr = document.createElement("core-request");

        xhr.send({
            url: "/views/" + view + ".html"
        });

        xhr.completes.then(function(response) {
            if (response.match("<head>\s*\n\s*<title>Error response</title>") !== null) {
                getView("missing", function (res){
                    callback(res);
                });
            } else 
                callback(response);
        });
    };

    function changeView(hash) {
        var view = hash.replace(/^#\//, ""),
            views = document.querySelector("#views").querySelectorAll("article"),
            loading = views[0],
            page = views[1];

        page.setAttribute("hidden", "");
        loading.removeAttribute("hidden");

        document.querySelector("title").innerHTML = "nanoplex - " + view.replace(/-/g," ");

        getView(view, function (response) {
            page.removeAttribute("hidden");
            loading.setAttribute("hidden", "");

            page.innerHTML = response;
        });
    };

    window.onhashchange = function(event) { 
        changeView(window.location.hash); 
    };
    
    if (!window.location.hash) 
        window.location.href = "#/portfolio";
    else 
        changeView(window.location.hash);

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-47730446-1', 'auto');
    ga('send', 'pageview');

})();