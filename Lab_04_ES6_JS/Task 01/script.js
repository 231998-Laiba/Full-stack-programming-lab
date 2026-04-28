$(document).ready(function () {

    const images = [
        {
            src: "https://picsum.photos/id/1015/600/400",
            caption: "Beautiful Mountain View"
        },
        {
            src: "https://picsum.photos/id/1025/600/400",
            caption: "Adorable Dog"
        },
        {
            src: "https://picsum.photos/id/1035/600/400",
            caption: "Peaceful River Scene"
        },
        {
            src: "https://picsum.photos/id/1043/600/400",
            caption: "City Skyline at Sunset"
        }
    ];

    let currentIndex = 0;

    function showImage(index) {
        $("#galleryImage")
            .fadeOut(400)
            .attr("src", images[index].src)
            .fadeIn(400);

        $("#caption")
            .fadeOut(400)
            .text(images[index].caption)
            .fadeIn(400);
    }

    $("#nextBtn").click(function () {
        currentIndex++;
        if (currentIndex >= images.length) {
            currentIndex = 0;
        }
        showImage(currentIndex);
    });

    $("#prevBtn").click(function () {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }
        showImage(currentIndex);
    });

});