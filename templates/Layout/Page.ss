
<% if $Quote %>
<blockquote class="main-quote">
    <p>
        <% if $IsHomePage %>
        We are here to make your website
        <a href="#" data-add-class="theme-sun" data-remove-class="theme-moon, theme-rocket" class="set-theme current">shine</a>
        &ndash; even in
        <a href="#" data-add-class="theme-moon" data-remove-class="theme-sun, theme-rocket" class="set-theme">dark mode</a><% else %>$Quote<% end_if %>
        <a href="#quote-end" class="blinker">▂</a>
    </p>
</blockquote>
<div  id="quote-end"></div>
<% end_if %>
<div  id="content-below-quote">$Content</div>

$Form

<% include SiblingsAndChildren %>

<% include Video %>

<% if $LastEdited %>
<p class="last-updated">
This page was last updated {$LastEdited.Ago}.
</p>
<% end_if %>
