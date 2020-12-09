
<% if $Quote %>
<blockquote>
    <p>
        <% if $IsHomePage %>
        We are here to make your website
        <a href="#" data-add-class="theme-sun" data-remove-class="theme-moon, theme-rocket" class="set-theme current">shine</a>
        &ndash; even in
        <a href="#" data-add-class="theme-moon" data-remove-class="theme-sun, theme-rocket" class="set-theme">dark mode</a><% else %>$Quote<% end_if %>
        <a href="#" data-add-class="theme-rocket" data-remove-class="theme-sun, theme-moon" class="set-theme blinker-holder">
            <span class="blinker">&nbsp;</span>
        </a>

    </p>
</blockquote>
<% end_if %>

$Content

$Form

<% include SiblingsAndChildren %>

<% include Video %>

<% if $LastEdited %>
<p>
This page was last updated {$LastEdited.Ago}.
</p>
<% end_if %>
