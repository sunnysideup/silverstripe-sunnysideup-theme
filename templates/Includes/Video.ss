<% if $VimeoVideoID %>
<div id="BackgroundVideo" class="media leftAlone">
    <iframe
        src="https://player.vimeo.com/video/$VimeoVideoID?background=1"
        frameborder="0"
        loading="lazy"
        webkitallowfullscreen
        mozallowfullscreen
        allowfullscreen />
    </iframe>
</div>
<% end_if %>
