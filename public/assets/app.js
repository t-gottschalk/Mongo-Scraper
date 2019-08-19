(()=>{ // IIFE (Immediately Invoked Function Expression)
    $(document).ready(()=>{
        // event trigger to scrape articles from Reuters
        $(document).on("click", ".scrape-new", function(event) {
            event.preventDefault()
            $.get("/api/articles/scrape").then(data => {
                if (data.title) {
                    $("#alert-content").text("New Articles Added");
                    location.reload(); 
                } else $("#alert-content").html(`No New Articles<br>Please Try Again Tomorrow`)
            });
        });

        // event trigger to add an article to favorites
        $(document).on("click", ".save", function(event) {
            event.preventDefault()
            let id = $(this).attr("data-id");
            $.ajax({
                method: "GET",
                url: `/api/articles/addsaved/${id}`
            });
        });

        // event trigger to remove an article from favorites
        $(document).on("click", ".delete", function(event) {
            event.preventDefault()
            let id = $(this).attr("data-id");
            $.ajax({
                method: "GET",
                url: `/api/articles/removesaved/${id}`
            });
            location.reload();
        });

        // event trigger to save new note to an article
        $(document).on("click", ".new-comment", function(event) {
            let id = $(this).attr("data-id");
            let author = $("#author-" + id).val().trim();
            let comment = $("textarea#comment-" + id).val();
            $.ajax({
                method: "GET",
                url: `/api/articles/addnote/${id}/${author}/${comment}`
            });
            location.reload();
        });

    });

})();