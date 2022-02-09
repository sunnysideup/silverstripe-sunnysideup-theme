


<% if $Quote %>
<blockquote class="main-quote">
    <p id="my-quote" class="<% if $TypeModeForQuote %>has-typing-mode<% else %>no-typing-mode<% end_if %>">
        <% if $IsHomePage %>
        We make your website Shine
        <a href="#" data-add-class="theme-sun" data-remove-class="theme-moon, theme-rocket" class="set-theme current">shine</a>
        <a href="#content-below-quote" class="blinker">▂</a>
    </p>
</blockquote>
<% end_if %>
<div  id="content-below-quote">
    $Content
    $Form

    <% include SiblingsAndChildren %>

    <% include Video %>

    <% if $LastEdited %>
        <p class="last-updated">
        { This page was last updated {$LastEdited.Ago}. <% if $SiteConfig.CopyrightNotice %>Copyright $SiteConfig.CopyrightNotice<% end_if %> }
        </p>
    <% end_if %>
</div>
